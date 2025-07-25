import { bench, group } from "mitata";
import { webcrypto } from "crypto";

const subtle = webcrypto.subtle;
const message = new Uint8Array(32).fill(1);

// Pre-generate a key for the signing benchmark
const keypair = await subtle.generateKey(
  { name: "Ed25519" },
  true, // extractable
  ["sign", "verify"],
);

group("Web Crypto API", () => {
  bench("createKeypair", () => {
    return subtle.generateKey({ name: "Ed25519" }, true, ["sign", "verify"]);
  });

  bench("sign", () => {
    return subtle.sign({ name: "Ed25519" }, keypair.privateKey, message);
  });

  // Note: We cannot benchmark XEd25519 key conversion as the required
  // low-level functions are not exposed in the Web Crypto API.
});
