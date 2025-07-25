use libsignal_core::curve::{KeyPair, PrivateKey, PublicKey};
use rand::{SeedableRng, rngs::StdRng};
use wasm_bindgen::{JsValue, prelude::wasm_bindgen};

fn to_js_error(e: impl std::fmt::Display) -> JsValue {
    JsValue::from_str(&e.to_string())
}

// --- Stateful SignalKeyPair struct for optimal WASM benchmarking ---

#[wasm_bindgen]
pub struct SignalKeyPair {
    key_pair: KeyPair,
}

#[wasm_bindgen]
impl SignalKeyPair {
    /// Creates a new SignalKeyPair instance from a 32-byte seed.
    #[wasm_bindgen(constructor)]
    pub fn new(seed: &[u8]) -> Result<SignalKeyPair, JsValue> {
        let seed_array: [u8; 32] = seed
            .try_into()
            .map_err(|_| to_js_error("Seed must be 32 bytes"))?;
        let mut rng = <StdRng as SeedableRng>::from_seed(seed_array);
        let key_pair = KeyPair::generate(&mut rng);
        Ok(SignalKeyPair { key_pair })
    }

    /// Signs a message using the internal private key (zero-copy).
    pub fn sign_into(
        &self,
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
        let mut rng = <StdRng as SeedableRng>::from_seed(seed);

        self.key_pair
            .private_key
            .calculate_signature_into(message, &mut rng, out_signature)
            .map_err(to_js_error)?;
        Ok(())
    }

    /// Verifies a signature using the internal public key.
    pub fn verify(&self, message: &[u8], signature_bytes: &[u8]) -> bool {
        self.key_pair
            .public_key
            .verify_signature(message, signature_bytes)
    }
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
    let (out_public, out_private) = out_keypair.split_at_mut(PUBLIC_KEY_LENGTH);

    let seed_array: [u8; SEED_LENGTH] = seed.try_into().unwrap();
    let mut rng = <StdRng as SeedableRng>::from_seed(seed_array);
    let key_pair = KeyPair::generate(&mut rng);

    key_pair
        .public_key
        .serialize_into(out_public)
        .map_err(to_js_error)?;
    key_pair
        .private_key
        .serialize_into(out_private)
        .map_err(to_js_error)?;
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

    private_key
        .calculate_signature_into(message, &mut rng, out_signature)
        .map_err(to_js_error)?;

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
