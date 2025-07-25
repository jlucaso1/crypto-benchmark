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

    pub fn verify(
        public_key_slice: []const u8,
        msg: []const u8,
        signature_slice: []const u8,
    ) !void {
        const public_key = public_key_slice[0..public_key_length].*;
        const signature = signature_slice[0..signature_length].*;

        var pk_mont = public_key;
        pk_mont[31] &= 0x7F;

        const u = Fe.fromBytes(pk_mont);
        const one = Fe.one;
        const y = u.sub(one).mul(u.add(one).invert());

        var ed_pk_bytes = y.toBytes();
        ed_pk_bytes[31] |= (signature[63] & 0x80);

        const A = try Edwards25519.fromBytes(ed_pk_bytes);
        try A.rejectIdentity();

        var R_bytes: [32]u8 = signature[0..32].*;
        var S_bytes: [32]u8 = signature[32..64].*;
        S_bytes[31] &= 0x7F;

        try Scalar.rejectNonCanonical(S_bytes);

        var k_hasher = Sha512.init(.{});
        k_hasher.update(&R_bytes);
        k_hasher.update(&ed_pk_bytes);
        k_hasher.update(msg);
        var k_hash: [64]u8 = undefined;
        k_hasher.final(&k_hash);
        const k = Scalar.reduce64(k_hash);

        const R_check = try Edwards25519.basePoint.mulDoubleBasePublic(S_bytes, A.neg(), k);

        if (!mem.eql(u8, &R_check.toBytes(), &R_bytes)) {
            return error.SignatureVerificationFailed;
        }
    }

    pub fn sign(
        secret_key_slice: []const u8,
        msg: []const u8,
        noise_slice: []const u8,
    ) ![signature_length]u8 {
        const secret_key = secret_key_slice[0..secret_key_length].*;
        const noise = noise_slice[0..noise_length].*;

        var a = secret_key;
        Scalar.clamp(&a);

        const A = try Edwards25519.basePoint.mul(a);
        const A_bytes = A.toBytes();

        var h_nonce = Sha512.init(.{});
        h_nonce.update(&diversifier);
        h_nonce.update(&secret_key);
        h_nonce.update(msg);
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
