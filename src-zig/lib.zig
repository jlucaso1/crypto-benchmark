const std = @import("std");
const mem = std.mem;

// Correctly import the X25519 functions for public key generation
const X25519 = std.crypto.dh.X25519;

// Import your working XEd25519 implementation
const XEd25519 = @import("xed25519.zig").XEd25519;

// A shared memory buffer for JavaScript to write arguments into and read results from.
var buffer: [256]u8 align(8) = undefined;

// Export the buffer's memory address so JS knows where to find it.
export fn get_buffer_ptr() [*]u8 {
    return &buffer;
}

/// Creates an X25519 keypair from a 32-byte seed provided by the host.
/// Expects the buffer to contain: [seed (32 bytes)]
/// Writes the result to the buffer: [private_key (seed, 32 bytes) | public_key (32 bytes)]
export fn zig_xed25519_create_keypair() void {
    var seed: [32]u8 = undefined;
    mem.copyForwards(u8, &seed, buffer[0..32]);

    // The private key for XEd25519 is the seed itself.
    // The public key is derived from the seed using standard X25519.
    const public_key = X25519.recoverPublicKey(seed) catch |err| {
        @panic(@errorName(err));
    };

    mem.copyForwards(u8, buffer[0..32], &seed);
    mem.copyForwards(u8, buffer[32..64], &public_key);
}

/// Signs a message using the XEd25519 implementation from xed25519.zig.
/// Expects the buffer to contain: [private_key/seed (32 bytes) | message (32 bytes)]
/// Writes the 64-byte signature back to the start of the buffer.
export fn zig_xed25519_sign() void {
    var private_key: [32]u8 = undefined;
    mem.copyForwards(u8, &private_key, buffer[0..32]);

    var message: [32]u8 = undefined;
    mem.copyForwards(u8, &message, buffer[32..64]);

    var noise: [XEd25519.noise_length]u8 = undefined;
    mem.copyForwards(u8, &noise, buffer[64..128]);

    // Call the sign function from your module
    const signature = XEd25519.sign(private_key, &message, noise) catch |err| {
        // On error, write a zeroed signature and stop
        @panic(@errorName(err));
        // mem.set(u8, buffer[0..64], 0);
        // return;
    };

    mem.copyForwards(u8, buffer[0..64], &signature);
}

/// Verifies an XEd25519 signature using the implementation from xed25519.zig.
/// Expects the buffer to contain: [public_key (32) | message (32) | signature (64)]
/// Writes the result (1 for true, 0 for false) to the first byte of the buffer.
export fn zig_xed25519_verify() void {
    var public_key: [32]u8 = undefined;
    mem.copyForwards(u8, &public_key, buffer[0..32]);

    var message: [32]u8 = undefined;
    mem.copyForwards(u8, &message, buffer[32..64]);

    var signature: [64]u8 = undefined;
    mem.copyForwards(u8, &signature, buffer[64..128]);

    // Call the verify function from your module. It returns an error on failure.
    XEd25519.verify(public_key, &message, signature) catch {
        // If verify returns an error, the signature is invalid.
        buffer[0] = 0;
        return;
    };

    // If no error was returned, the signature is valid.
    buffer[0] = 1;
}
