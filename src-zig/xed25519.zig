const std = @import("std");
const crypto = std.crypto;
const mem = std.mem;

const Sha512 = crypto.hash.sha2.Sha512;
const Ed25519 = crypto.sign.Ed25519;
const Curve25519 = crypto.dh.X25519.Curve;
const Edwards25519 = crypto.ecc.Edwards25519;
const Fe = Edwards25519.Fe;
const Scalar = Edwards25519.scalar;

const SignatureVerificationError = crypto.errors.SignatureVerificationError;
const IdentityElementError = crypto.errors.IdentityElementError;
const WeakPublicKeyError = crypto.errors.WeakPublicKeyError;
const NonCanonicalError = crypto.errors.NonCanonicalError;
const EncodingError = crypto.errors.EncodingError;

/// XEd25519 combines the X25519 key exchange protocol with the Ed25519 signature scheme.
/// This implementation is compatible with libsignal's XEd25519.
pub const XEd25519 = struct {
    pub const public_key_length = 32;
    pub const secret_key_length = 32;
    pub const signature_length = 64;
    pub const noise_length = 64;

    const diversifier = [32]u8{
        0xFE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
        0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF,
    };

    /// Verifies an Ed25519 signature using an X25519 public key.
    pub fn verify(
        public_key: [public_key_length]u8,
        msg: []const u8,
        signature: [signature_length]u8,
    ) (SignatureVerificationError || IdentityElementError || WeakPublicKeyError || NonCanonicalError || EncodingError)!void {
        // 1. Convert the X25519 (Montgomery) public key to an Ed25519 point.
        //    This follows the libsignal-go logic.
        var pk_mont = public_key;
        pk_mont[31] &= 0x7F;

        const u = Fe.fromBytes(pk_mont);
        const one = Fe.one;
        const y = u.sub(one).mul(u.add(one).invert());

        var ed_pk_bytes = y.toBytes();
        ed_pk_bytes[31] |= (signature[63] & 0x80);

        const A = try Edwards25519.fromBytes(ed_pk_bytes);
        try A.rejectIdentity();

        // 2. Parse the signature components.
        var R_bytes: [32]u8 = signature[0..32].*;
        var S_bytes: [32]u8 = signature[32..64].*;
        S_bytes[31] &= 0x7F; // Clear the sign bit from S

        try Scalar.rejectNonCanonical(S_bytes);

        // 3. Compute the challenge hash k = H(R || A || msg).
        var k_hasher = Sha512.init(.{});
        k_hasher.update(&R_bytes);
        k_hasher.update(&ed_pk_bytes);
        k_hasher.update(msg);
        var k_hash: [64]u8 = undefined;
        k_hasher.final(&k_hash);
        const k = Scalar.reduce64(k_hash);

        // 4. Manually perform the verification equation: [S]B = R + [k]A.
        //    This is rearranged to [S]B - [k]A = R.
        //    This avoids decoding R_bytes into a point, bypassing the strict check.
        const R_check = try Edwards25519.basePoint.mulDoubleBasePublic(S_bytes, A.neg(), k);

        // 5. Check if the resulting point matches R.
        if (!mem.eql(u8, &R_check.toBytes(), &R_bytes)) {
            return error.SignatureVerificationFailed;
        }
    }

    /// Creates an Ed25519 signature using an X25519 secret key.
    pub fn sign(
        secret_key: [secret_key_length]u8,
        msg: []const u8,
        noise: [noise_length]u8,
    ) ![signature_length]u8 {
        var a = secret_key;
        Scalar.clamp(&a);

        const A = try Edwards25519.basePoint.mul(a);
        const A_bytes = A.toBytes();

        var h_nonce = Sha512.init(.{});
        h_nonce.update(&diversifier);
        h_nonce.update(&secret_key);
        h_nonce.update(msg);
        // var random_bytes: [64]u8 = undefined;
        // crypto.random.bytes(&random_bytes);
        // h_nonce.update(&random_bytes);
        h_nonce.update(&noise);

        var nonce_hash: [64]u8 = undefined;
        h_nonce.final(&nonce_hash);
        const r = Scalar.reduce64(nonce_hash);

        const R = try Edwards25519.basePoint.mul(r);
        const R_bytes = R.toBytes();

        var h_challenge = Sha512.init(.{});
        h_challenge.update(&R_bytes);
        h_challenge.update(&A_bytes);
        h_challenge.update(msg);
        var k_hash: [64]u8 = undefined;
        h_challenge.final(&k_hash);
        const k = Scalar.reduce64(k_hash);

        const S = Scalar.mulAdd(k, a, r);

        var signature: [signature_length]u8 = undefined;
        signature[0..32].* = R_bytes;
        signature[32..64].* = S;

        if ((A.toBytes()[31] & 0x80) != 0) {
            signature[63] |= 0x80;
        }

        return signature;
    }
};
