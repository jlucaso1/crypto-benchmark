// bench/noble.js
import { bench, group } from "mitata";
import { ed25519 } from "@noble/curves/ed25519";
import { edwardsToMontgomeryPub } from "@noble/curves/ed25519";
import { randomBytes } from "@noble/hashes/utils";

const message = new Uint8Array(32).fill(1);

group("noble", () => {
  bench("createKeypair", () => {
    const privateKey = ed25519.utils.randomPrivateKey();
    const publicKey = ed25519.getPublicKey(privateKey);
  });

  const privateKey = ed25519.utils.randomPrivateKey();
  const publicKey = ed25519.getPublicKey(privateKey);

  bench("sign", () => {
    ed25519.sign(message, privateKey);
  });

  bench("edwardsToMontgomery", () => {
    edwardsToMontgomeryPub(publicKey);
  });
});
