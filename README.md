# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 22:08:51 GMT for commit [`367b4ac`](https://github.com/jlucaso1/crypto-benchmark/commit/367b4ac)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `229.04 µs` |
| `noble - sign` | `416.15 µs` |
| `noble - edwardsToMontgomery` | `145.95 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `54.44 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `162.92 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `164.49 µs` |
| `Node.js native crypto - createKeypair` | `46.20 µs` |
| `Node.js native crypto - sign` | `42.27 µs` |
| `Rust (WASM with libsignal) - createKeypair` | `53.31 µs` |
| `Rust (WASM with libsignal) - sign` | `103.66 µs` |
| `Rust (WASM with libsignal) - verify` | `152.26 µs` |
| `Web Crypto API - createKeypair` | `102.46 µs` |
| `Web Crypto API - sign` | `80.49 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `320.85 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `729.89 µs` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `472.16 µs` |
| `libsodium-js - createKeypair` | `140.48 µs` |
| `libsodium-js - verify` | `129.30 µs` |
| `libsodium-js - sign` | `117.50 µs` |


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
