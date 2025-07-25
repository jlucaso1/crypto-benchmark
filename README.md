# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 22:31:52 GMT for commit [`fa524a3`](https://github.com/jlucaso1/crypto-benchmark/commit/fa524a3)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `241.04 µs` |
| `noble - sign` | `414.52 µs` |
| `noble - edwardsToMontgomery` | `153.75 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `54.05 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `163.22 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `162.32 µs` |
| `Node.js native crypto - createKeypair` | `45.53 µs` |
| `Node.js native crypto - sign` | `40.07 µs` |
| `Rust (WASM with libsignal) - createKeypair` | `53.43 µs` |
| `Rust (WASM with libsignal) - sign` | `103.99 µs` |
| `Rust (WASM with libsignal) - verify` | `152.66 µs` |
| `Web Crypto API - createKeypair` | `102.90 µs` |
| `Web Crypto API - sign` | `80.93 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `312.41 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `718.58 µs` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `456.88 µs` |
| `libsodium-js - createKeypair` | `142.47 µs` |
| `libsodium-js - verify` | `130.02 µs` |
| `libsodium-js - sign` | `117.76 µs` |


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
