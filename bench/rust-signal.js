import { bench, group } from "mitata";
import * as rust_signal from "../pkg/rust-signal/src_rust_signal.js";
import { webcrypto } from "crypto";

// A constant message to use for signing and verification
const message = new Uint8Array(32).fill(1);

// --- Setup ---
// Create a single 97-byte buffer for seed input (32) and keypair output (33+32)
const setup_buffer = new Uint8Array(97);
// Write a random seed to the first 32 bytes
setup_buffer.set(webcrypto.getRandomValues(new Uint8Array(32)), 0);

// Generate the keypair. The result is written back into setup_buffer.
rust_signal.generate_key_pair(setup_buffer);

// Extract the public and private keys from the buffer, starting after the seed
const publicKey = setup_buffer.slice(32, 32 + 33);
const privateKey = setup_buffer.slice(32 + 33, 32 + 33 + 32);

// Pre-generate a signature for the verification benchmark to use
const noise = webcrypto.getRandomValues(new Uint8Array(32));
const signature = new Uint8Array(64);
rust_signal.signal_sign(privateKey, message, noise, signature);

group("Rust (WASM with libsignal)", () => {
  bench("createKeypair", () => {
    // Prepare the buffer for this specific benchmark iteration
    const bench_buffer = new Uint8Array(97);
    bench_buffer.set(webcrypto.getRandomValues(new Uint8Array(32)), 0);
    // Run the function
    rust_signal.generate_key_pair(bench_buffer);
  });

  bench("sign", () => {
    const noiseForBench = webcrypto.getRandomValues(new Uint8Array(32));
    const signatureOut = new Uint8Array(64);
    rust_signal.signal_sign(privateKey, message, noiseForBench, signatureOut);
  });

  bench("verify", () => {
    rust_signal.verify(publicKey, message, signature);
  });
});
