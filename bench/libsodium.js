import { bench, group } from "mitata";
import _sodium from "libsodium-wrappers";

await _sodium.ready;
const sodium = _sodium;

const message = new Uint8Array(32).fill(1); // 32-byte message

group("libsodium-js", () => {
  bench("createKeypair", () => {
    sodium.crypto_sign_keypair();
  });

  // Pre-generate assets to use in the sign, verify, and conversion benchmarks
  const keypair = sodium.crypto_sign_keypair();
  const privateKey = keypair.privateKey;
  const publicKey = keypair.publicKey;
  const signature = sodium.crypto_sign_detached(message, privateKey);

  bench("verify", () => {
    sodium.crypto_sign_verify_detached(signature, message, publicKey);
  });

  bench("sign", () => {
    sodium.crypto_sign_ed25519_pk_to_curve25519(publicKey);
  });
});
