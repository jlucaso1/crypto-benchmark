import { bench, group } from "mitata";
import { readFileSync } from "fs";
import { webcrypto } from "crypto";

async function loadWasm() {
  const wasmBuffer = readFileSync("./pkg/zig/benchmark.wasm");
  const importObject = {
    env: {
      panic: (messagePtr, messageLen) => {
        throw new Error(
          `WebAssembly module panicked! (message ptr: ${messagePtr}, len: ${messageLen})`
        );
      },
    },
  };
  const wasmModule = await WebAssembly.instantiate(wasmBuffer, importObject);
  const exports = wasmModule.instance.exports;
  const memory = new Uint8Array(exports.memory.buffer);
  const bufferPtr = exports.get_buffer_ptr();

  return { exports, memory, bufferPtr };
}

const { exports, memory, bufferPtr } = await loadWasm();

const SEED_PTR = bufferPtr;
const KEYPAIR_PTR = bufferPtr;
const PRIVATE_KEY_PTR = bufferPtr;
const PUBLIC_KEY_PTR = bufferPtr + 32;
const MESSAGE_PTR = bufferPtr + 64;
const NOISE_PTR = bufferPtr + 96;
const SIGNATURE_PTR = bufferPtr + 160;

const message = new Uint8Array(32).fill(1);
const noise = webcrypto.getRandomValues(new Uint8Array(64));
memory.set(message, MESSAGE_PTR);
memory.set(noise, NOISE_PTR);

const seed = webcrypto.getRandomValues(new Uint8Array(32));
memory.set(seed, SEED_PTR);
exports.zig_xed25519_create_keypair_ptr(SEED_PTR, KEYPAIR_PTR);
const privateKey = memory.slice(PRIVATE_KEY_PTR, PRIVATE_KEY_PTR + 32);
const publicKey = memory.slice(PUBLIC_KEY_PTR, PUBLIC_KEY_PTR + 32);

exports.zig_xed25519_sign_ptr(
  PRIVATE_KEY_PTR,
  MESSAGE_PTR,
  NOISE_PTR,
  SIGNATURE_PTR
);
const signature = memory.slice(SIGNATURE_PTR, SIGNATURE_PTR + 64);

group("Zig (WASM with XEd25519 - Optimized)", () => {
  const randomSeed = webcrypto.getRandomValues(new Uint8Array(32));
  bench("createKeypair", () => {
    memory.set(randomSeed, SEED_PTR);
    exports.zig_xed25519_create_keypair_ptr(SEED_PTR, KEYPAIR_PTR);
  });

  bench("sign", () => {
    exports.zig_xed25519_sign_ptr(
      PRIVATE_KEY_PTR,
      MESSAGE_PTR,
      NOISE_PTR,
      SIGNATURE_PTR
    );
  });

  bench("verify", () => {
    const isValid = exports.zig_xed25519_verify_ptr(
      PUBLIC_KEY_PTR,
      MESSAGE_PTR,
      SIGNATURE_PTR
    );
  });
});
