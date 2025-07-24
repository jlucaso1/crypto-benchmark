// bench/rust.js
import { bench, group } from "mitata";
import * as rust from "../pkg/rust/crypto_benchmark_rust.js";

const message = new Uint8Array(32).fill(1);

// Pre-generate a keypair to use in the sign/verify benchmarks
const keypair = rust.rust_xed25519_create_keypair();
const privateKey = keypair.slice(0, 32);
const publicKey = keypair.slice(32, 64);
const signature = rust.rust_xed25519_sign(privateKey, message);

group("Rust (WASM with XEd25519)", () => {
  bench("createKeypair", () => {
    rust.rust_xed25519_create_keypair();
  });

  bench("sign", () => {
    rust.rust_xed25519_sign(privateKey, message);
  });

  bench("verify", () => {
    rust.rust_xed25519_verify(publicKey, message, signature);
  });
});
