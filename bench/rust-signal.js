import { bench, group } from "mitata";
import * as rust_signal from "../pkg/rust-signal/src_rust_signal.js";
import { webcrypto } from "crypto";

// A constant message to use for signing and verification
const message = new Uint8Array(32).fill(1);

// --- Setup for stateless (legacy) API ---
const setup_buffer = new Uint8Array(97);
setup_buffer.set(webcrypto.getRandomValues(new Uint8Array(32)), 0);
rust_signal.generate_key_pair(setup_buffer);
const publicKey = setup_buffer.slice(32, 32 + 33);
const privateKey = setup_buffer.slice(32 + 33, 32 + 33 + 32);
const noise = webcrypto.getRandomValues(new Uint8Array(32));
const signature = new Uint8Array(64);
rust_signal.signal_sign(privateKey, message, noise, signature);

// --- Setup for stateful SignalKeyPair API ---
const statefulSeed = webcrypto.getRandomValues(new Uint8Array(32));
const keyPairObject = new rust_signal.SignalKeyPair(statefulSeed);
const signatureStateful = new Uint8Array(64);
const noiseForSetup = webcrypto.getRandomValues(new Uint8Array(32));
keyPairObject.sign_into(message, noiseForSetup, signatureStateful);

group("Rust (WASM with libsignal) - Stateless", () => {
  bench("createKeypair", () => {
    const bench_buffer = new Uint8Array(97);
    bench_buffer.set(webcrypto.getRandomValues(new Uint8Array(32)), 0);
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

// --- Optimized stateful API benchmarks ---
group("Rust (WASM with libsignal) - Stateful", () => {
  bench("createKeypair", () => {
    const benchSeed = webcrypto.getRandomValues(new Uint8Array(32));
    new rust_signal.SignalKeyPair(benchSeed);
  });

  bench("sign", () => {
    const noiseForBench = webcrypto.getRandomValues(new Uint8Array(32));
    const signatureOut = new Uint8Array(64);
    keyPairObject.sign_into(message, noiseForBench, signatureOut);
  });

  bench("verify", () => {
    keyPairObject.verify(message, signatureStateful);
  });
});
