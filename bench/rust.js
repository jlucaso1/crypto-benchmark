import { bench, group } from "mitata";
import * as rust from "../pkg/rust/crypto_benchmark_rust.js";
import { webcrypto } from "crypto";

const message = new Uint8Array(32).fill(1);

// Setup for sign and verify benchmarks
const seed = webcrypto.getRandomValues(new Uint8Array(32));
const keypair = new Uint8Array(64);
rust.rust_xed25519_create_keypair(seed, keypair);
const privateKey = keypair.slice(0, 32);
const publicKey = keypair.slice(32, 64);

const noise = webcrypto.getRandomValues(new Uint8Array(64));
// Generate a signature once for the verify benchmark to use
const signature = new Uint8Array(64);
rust.rust_xed25519_sign(privateKey, message, noise, signature);

group("Rust (WASM with XEd25519 - Optimized)", () => {
  bench("createKeypair", () => {
    const seedForBench = webcrypto.getRandomValues(new Uint8Array(32));
    const keypairOut = new Uint8Array(64);
    rust.rust_xed25519_create_keypair(seedForBench, keypairOut);
  });

  bench("sign", () => {
    const noiseForBench = webcrypto.getRandomValues(new Uint8Array(64));
    const signatureOut = new Uint8Array(64);
    rust.rust_xed25519_sign(privateKey, message, noiseForBench, signatureOut);
  });

  bench("verify", () => {
    rust.rust_xed25519_verify(publicKey, message, signature);
  });
});
