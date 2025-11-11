# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Tue, 11 Nov 2025 23:16:09 GMT for commit [`25d8862`](https://github.com/jlucaso1/crypto-benchmark/commit/25d8862)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `224.24 µs` |
| `noble - sign` | `422.67 µs` |
| `noble - edwardsToMontgomery` | `160.76 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `46.42 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `104.18 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `138.62 µs` |
| `Node.js native crypto - createKeypair` | `41.24 µs` |
| `Node.js native crypto - sign` | `40.58 µs` |
| `Rust (WASM with libsignal) - createKeypair` | `45.35 µs` |
| `Rust (WASM with libsignal) - sign` | `89.34 µs` |
| `Rust (WASM with libsignal) - verify` | `127.41 µs` |
| `Web Crypto API - createKeypair` | `98.58 µs` |
| `Web Crypto API - sign` | `77.08 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `261.87 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `651.64 µs` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `441.29 µs` |
| `libsodium-js - createKeypair` | `122.80 µs` |
| `libsodium-js - verify` | `119.41 µs` |
| `libsodium-js - sign` | `108.73 µs` |


[**➡️ View Full Benchmark History Chart**](https://jlucaso1.github.io/crypto-benchmark/)

<!-- BENCHMARK_END -->

## Overview

This project runs a set of cryptographic benchmarks using various libraries and implementations. The results are tracked over time and visualized automatically using GitHub Actions and GitHub Pages.

- **Automated Benchmarks:** Benchmarks are run on every push to the main branch.
- **Historical Tracking:** Results are appended to a history file and visualized as a chart.
- **README Summary:** The latest results are summarized in this README.
- **Interactive Chart:** Full history is available as an interactive chart on GitHub Pages.

## Usage

### Running Benchmarks Locally

```sh
npm install
npm run build
npm run bench
```

### Viewing Results

- The latest summary is always available above in this README.
- Full interactive history: [GitHub Pages Chart](https://jlucaso1.github.io/crypto-benchmark/)

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or new benchmarks.

## License

MIT
