# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 02:48:22 GMT for commit [`eb29435`](https://github.com/jlucaso1/crypto-benchmark/commit/eb29435)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `227.75 µs` |
| `noble - sign` | `415.77 µs` |
| `noble - edwardsToMontgomery` | `153.66 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `53.05 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `161.49 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `162.59 µs` |
| `Node.js native crypto - createKeypair` | `48.78 µs` |
| `Node.js native crypto - sign` | `40.42 µs` |
| `Web Crypto API - createKeypair` | `112.52 µs` |
| `Web Crypto API - sign` | `87.62 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `466.19 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `1.08 ms` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `729.19 µs` |
| `libsodium-js - createKeypair` | `141.62 µs` |
| `libsodium-js - sign` | `52.86 µs` |


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
