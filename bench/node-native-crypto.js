import { bench, group } from "mitata";
import { generateKeyPairSync, sign } from "crypto";

const message = Buffer.alloc(32, 1); // Node crypto often works best with Buffers

group("Node.js native crypto", () => {
  bench("createKeypair", () => {
    generateKeyPairSync("ed25519");
  });

  const { privateKey } = generateKeyPairSync("ed25519");

  bench("sign", () => {
    // The first argument is the hash algorithm, which is null for ed25519
    sign(null, message, privateKey);
  });

  // Note: We cannot benchmark XEd25519 key conversion as the required
  // low-level functions are not exposed in Node's native crypto module.
});
