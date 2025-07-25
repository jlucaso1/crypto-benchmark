use libsignal_core::curve::{KeyPair, PrivateKey, PublicKey};
use rand::{SeedableRng, rngs::StdRng};
use wasm_bindgen::{JsValue, prelude::wasm_bindgen};

fn to_js_error(e: impl std::fmt::Display) -> JsValue {
    JsValue::from_str(&e.to_string())
}

#[wasm_bindgen]
pub fn generate_key_pair(in_out_buffer: &mut [u8]) -> Result<(), JsValue> {
    const SEED_LENGTH: usize = 32;
    const PRIVATE_KEY_LENGTH: usize = 32;
    const PUBLIC_KEY_LENGTH: usize = 33;
    const KEYPAIR_LENGTH: usize = PUBLIC_KEY_LENGTH + PRIVATE_KEY_LENGTH;
    const TOTAL_LENGTH: usize = SEED_LENGTH + KEYPAIR_LENGTH;

    if in_out_buffer.len() != TOTAL_LENGTH {
        return Err(to_js_error(format!(
            "Buffer must be {} bytes, but got {}",
            TOTAL_LENGTH,
            in_out_buffer.len()
        )));
    }

    let (seed, out_keypair) = in_out_buffer.split_at_mut(SEED_LENGTH);

    let seed_array: [u8; SEED_LENGTH] = seed.try_into().unwrap();
    let mut rng = <StdRng as SeedableRng>::from_seed(seed_array);
    let key_pair = KeyPair::generate(&mut rng);

    let public_key_bytes = key_pair.public_key.serialize();
    let private_key_bytes = key_pair.private_key.serialize();

    if public_key_bytes.len() != PUBLIC_KEY_LENGTH {
        return Err(to_js_error(format!(
            "Public key serialization length mismatch: expected {}, got {}",
            PUBLIC_KEY_LENGTH,
            public_key_bytes.len()
        )));
    }
    if private_key_bytes.len() != PRIVATE_KEY_LENGTH {
        return Err(to_js_error(format!(
            "Private key serialization length mismatch: expected {}, got {}",
            PRIVATE_KEY_LENGTH,
            private_key_bytes.len()
        )));
    }

    out_keypair[..PUBLIC_KEY_LENGTH].copy_from_slice(&public_key_bytes);
    out_keypair[PUBLIC_KEY_LENGTH..].copy_from_slice(&private_key_bytes);
    Ok(())
}

#[wasm_bindgen]
pub fn signal_sign(
    private_key_bytes: &[u8],
    message: &[u8],
    noise_seed: &[u8],
    out_signature: &mut [u8],
) -> Result<(), JsValue> {
    if out_signature.len() != 64 {
        return Err(to_js_error("Output buffer must be 64 bytes"));
    }
    let seed: [u8; 32] = noise_seed
        .try_into()
        .map_err(|_| to_js_error("Noise seed must be 32 bytes"))?;

    let private_key = PrivateKey::deserialize(private_key_bytes).map_err(to_js_error)?;

    let mut rng = <StdRng as SeedableRng>::from_seed(seed);

    let signature = private_key
        .calculate_signature(message, &mut rng)
        .map_err(to_js_error)?;

    out_signature.copy_from_slice(&signature);
    Ok(())
}

#[wasm_bindgen]
pub fn verify(public_key_bytes: &[u8], message: &[u8], signature_bytes: &[u8]) -> bool {
    let public_key = match PublicKey::deserialize(public_key_bytes) {
        Ok(pk) => pk,
        Err(_) => return false,
    };
    public_key.verify_signature(message, signature_bytes)
}
