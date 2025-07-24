import { bench, group } from 'mitata';
import sodium from 'libsodium';

// Wait for the WASM module to be ready
await sodium.ready;

const message = new Uint8Array(32).fill(1); // 32-byte message

group('libsodium-js', () => {
  bench('createKeypair', () => {
    sodium.crypto_sign_keypair();
  });

  const keypair = sodium.crypto_sign_keypair();
  const privateKey = keypair.privateKey;

  bench('sign', () => {
    sodium.crypto_sign_detached(message, privateKey);
  });

  // Note: We cannot benchmark XEd25519 key conversion as the required
  // low-level functions are not exposed in libsodium-js.
});