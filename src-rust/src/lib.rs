#![no_std]
extern crate alloc;
use alloc::vec::Vec;
use wasm_bindgen::prelude::*;
use x25519_dalek::{PublicKey, StaticSecret};

mod xed25519 {
    // SPDX-FileCopyrightText: 2023 Dominik George <nik@naturalnet.de>
    // SPDX-FileCopyrightText: 2024 Tulir Asokan
    //
    // SPDX-License-Identifier: Apache-2.0
    //
    // This file is a consolidated and simplified version of the `xeddsa` crate,
    // vendored for use within this project to provide XEd25519 signing and verification.

    use curve25519_dalek::edwards::EdwardsPoint;
    use curve25519_dalek::montgomery::MontgomeryPoint;
    use curve25519_dalek::scalar::Scalar;
    use ed25519_dalek::{Signature, Verifier, VerifyingKey};
    use sha2::{Digest, Sha512};

    #[inline(always)]
    fn calculate_key_pair(private_key_bytes: &[u8; 32], sign: u8) -> ([u8; 32], [u8; 32]) {
        let mut clamped = *private_key_bytes;
        clamped[0] &= 248;
        clamped[31] &= 127;
        clamped[31] |= 64;

        let scalar_private_key = Scalar::from_bytes_mod_order(clamped);
        let point_public_key = EdwardsPoint::mul_base(&scalar_private_key);

        if (point_public_key.compress().to_bytes()[31] & 0x80) >> 7 == sign {
            (clamped, point_public_key.compress().to_bytes())
        } else {
            let negated_scalar = Scalar::ZERO - scalar_private_key;
            let negated_point = EdwardsPoint::mul_base(&negated_scalar);
            (
                negated_scalar.to_bytes(),
                negated_point.compress().to_bytes(),
            )
        }
    }

    #[inline(always)]
    pub fn sign(private_key_bytes: &[u8; 32], message: &[u8], noise: &[u8; 64]) -> [u8; 64] {
        let (ed25519_private, ed25519_public) = calculate_key_pair(private_key_bytes, 0);

        // Precomputed padding for i=1, S=32
        let padding: [u8; 32] = [
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xfe, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff,
        ];

        let mut hasher = Sha512::new();
        hasher.update(padding);
        hasher.update(ed25519_private);
        hasher.update(message);
        hasher.update(noise);
        let res: [u8; 64] = hasher.finalize().into();

        let res_scalar = Scalar::from_bytes_mod_order_wide(&res);
        let r_point = EdwardsPoint::mul_base(&res_scalar);

        let mut hasher = Sha512::new();
        hasher.update(r_point.compress().to_bytes());
        hasher.update(ed25519_public);
        hasher.update(message);
        let hash: [u8; 64] = hasher.finalize().into();

        let hash_scalar = Scalar::from_bytes_mod_order_wide(&hash);
        let private_scalar = Scalar::from_bytes_mod_order(ed25519_private);
        let s_scalar = res_scalar + (hash_scalar * private_scalar);

        let mut signature = [0u8; 64];
        signature[0..32].copy_from_slice(&r_point.compress().to_bytes());
        signature[32..64].copy_from_slice(&s_scalar.to_bytes());

        signature
    }

    #[inline(always)]
    pub fn verify(public_key: &[u8; 32], message: &[u8], signature: &[u8; 64]) -> bool {
        let sign_bit = (signature[63] & 0x80) >> 7;
        let edwards_point = match MontgomeryPoint(*public_key).to_edwards(sign_bit) {
            Some(p) => p,
            None => return false,
        };
        let ed25519_public_key_bytes = edwards_point.compress().to_bytes();

        let verifying_key = match VerifyingKey::from_bytes(&ed25519_public_key_bytes) {
            Ok(vk) => vk,
            Err(_) => return false,
        };

        // Let ed25519-dalek handle the high bit of the signature internally
        let signature_dalek = match Signature::from_slice(signature) {
            Ok(s) => s,
            Err(_) => return false,
        };

        verifying_key.verify(message, &signature_dalek).is_ok()
    }
}

/// Generates a new X25519 key pair from a 32-byte seed.
#[wasm_bindgen]
pub fn rust_xed25519_create_keypair(seed: &[u8]) -> Vec<u8> {
    let p_bytes: [u8; 32] = seed.try_into().expect("Seed must be 32 bytes");
    let private_key = StaticSecret::from(p_bytes);
    let public_key = PublicKey::from(&private_key);
    let mut keypair = Vec::with_capacity(64);
    keypair.extend_from_slice(&private_key.to_bytes());
    keypair.extend_from_slice(public_key.as_bytes());
    keypair
}

/// Signs a message using the XEd25519 algorithm.
#[wasm_bindgen]
pub fn rust_xed25519_sign(private_key_bytes: &[u8], message: &[u8], noise: &[u8]) -> Vec<u8> {
    let signature = xed25519::sign(
        private_key_bytes.try_into().unwrap(),
        message,
        noise.try_into().unwrap(),
    );
    signature.to_vec()
}

/// Verifies an XEd25519 signature.
#[wasm_bindgen]
pub fn rust_xed25519_verify(
    public_key_bytes: &[u8],
    message: &[u8],
    signature_bytes: &[u8],
) -> bool {
    xed25519::verify(
        public_key_bytes.try_into().unwrap(),
        message,
        signature_bytes.try_into().unwrap(),
    )
}
