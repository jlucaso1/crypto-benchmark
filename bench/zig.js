// bench/zig.js
import { bench, group } from "mitata";
import { readFileSync } from "fs";
import { webcrypto } from "crypto";

// Helper to load raw WASM
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

  const write = (data, offset = 0) => memory.set(data, bufferPtr + offset);
  const read = (len, offset = 0) =>
    memory.slice(bufferPtr + offset, bufferPtr + offset + len);

  return { exports, write, read };
}

const { exports, write, read } = await loadWasm();
const message = new Uint8Array(32).fill(1);
const noise = webcrypto.getRandomValues(new Uint8Array(64)); // Noise for signing

// --- Pre-generate a keypair and signature for benchmarks ---
const seed = webcrypto.getRandomValues(new Uint8Array(32));
write(seed, 0);
exports.zig_xed25519_create_keypair();
const privateKey = read(32, 0);
const publicKey = read(32, 32);

write(privateKey, 0);
write(message, 32);
write(noise, 64); // Provide the noise for signing
exports.zig_xed25519_sign();
const signature = read(64, 0);
// --- End pre-generation ---

group("Zig (WASM with XEd25519)", () => {
  const randomSeed = webcrypto.getRandomValues(new Uint8Array(32));
  bench("createKeypair", () => {
    write(randomSeed, 0);
    exports.zig_xed25519_create_keypair();
  });

  bench("sign", () => {
    write(privateKey, 0);
    write(message, 32);
    write(noise, 64); // Pass the same noise for consistent benchmarks
    exports.zig_xed25519_sign();
  });

  bench("verify", () => {
    write(publicKey, 0);
    write(message, 32);
    write(signature, 64);
    exports.zig_xed25519_verify();
    // console.assert(read(1, 0)[0] === 1, "Zig verification failed");
  });
});
