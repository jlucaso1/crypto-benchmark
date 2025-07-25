import { bench, group } from "mitata";
import * as rust from "../pkg/rust/crypto_benchmark_rust.js";
import { webcrypto } from "crypto";

const message = new Uint8Array(32).fill(1);

// Pre-generate a keypair to use in the sign/verify benchmarks
const seed = webcrypto.getRandomValues(new Uint8Array(32));
const keypair = rust.rust_xed25519_create_keypair(seed);
const privateKey = keypair.slice(0, 32);
const publicKey = keypair.slice(32, 64);

// Pre-generate noise and a signature
const noise = webcrypto.getRandomValues(new Uint8Array(64));
const signature = rust.rust_xed25519_sign(privateKey, message, noise);

group("Rust (WASM with XEd25519 - Optimized)", () => {
    bench("createKeypair", () => {
        const seedForBench = webcrypto.getRandomValues(new Uint8Array(32));
        rust.rust_xed25519_create_keypair(seedForBench);
    });

    bench("sign", () => {
        const noiseForBench = webcrypto.getRandomValues(new Uint8Array(64));
        rust.rust_xed25519_sign(privateKey, message, noiseForBench);
    });

    bench("verify", () => {
        rust.rust_xed25519_verify(publicKey, message, signature);
    });
});
