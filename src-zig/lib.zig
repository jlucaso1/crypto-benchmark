const std = @import("std");
const mem = std.mem;

const X25519 = std.crypto.dh.X25519;
const XEd25519 = @import("xed25519.zig").XEd25519;

var buffer: [256]u8 align(8) = undefined;

export fn get_buffer_ptr() [*]u8 {
    return &buffer;
}

export fn zig_xed25519_create_keypair_ptr(seed_ptr: [*]const u8, keypair_out_ptr: [*]u8) void {
    const seed: *const [32]u8 = @ptrCast(seed_ptr);

    const public_key = X25519.recoverPublicKey(seed.*) catch |err| {
        @panic(@errorName(err));
    };

    mem.copyForwards(u8, keypair_out_ptr[0..32], seed[0..]);
    mem.copyForwards(u8, keypair_out_ptr[32..64], &public_key);
}

export fn zig_xed25519_sign_ptr(private_key_ptr: [*]const u8, message_ptr: [*]const u8, noise_ptr: [*]const u8, signature_out_ptr: [*]u8) void {
    const private_key = private_key_ptr[0..32];
    const message = message_ptr[0..32];
    const noise = noise_ptr[0..64];

    const signature = XEd25519.sign(private_key, message, noise) catch |err| {
        @panic(@errorName(err));
    };

    mem.copyForwards(u8, signature_out_ptr[0..64], &signature);
}

export fn zig_xed25519_verify_ptr(public_key_ptr: [*]const u8, message_ptr: [*]const u8, signature_ptr: [*]const u8) u8 {
    const public_key = public_key_ptr[0..32];
    const message = message_ptr[0..32];
    const signature = signature_ptr[0..64];

    XEd25519.verify(public_key, message, signature) catch {
        return 0;
    };

    return 1;
}
