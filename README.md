# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 02:16:50 GMT for commit [`ada35c6`](https://github.com/jlucaso1/crypto-benchmark/commit/ada35c6)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `233.19 µs` |
| `noble - sign` | `420.32 µs` |
| `noble - edwardsToMontgomery` | `151.67 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `54.28 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `123.57 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `178.87 µs` |
| `Node.js native crypto - createKeypair` | `47.92 µs` |
| `Node.js native crypto - sign` | `39.99 µs` |
| `Web Crypto API - createKeypair` | `103.00 µs` |
| `Web Crypto API - sign` | `77.50 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `456.74 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `1.09 ms` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `731.97 µs` |
| `libsodium-js - createKeypair` | `141.47 µs` |
| `libsodium-js - sign` | `52.18 µs` |


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
