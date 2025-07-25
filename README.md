# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 15:51:54 GMT for commit [`43e7241`](https://github.com/jlucaso1/crypto-benchmark/commit/43e7241)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `239.23 µs` |
| `noble - sign` | `443.48 µs` |
| `noble - edwardsToMontgomery` | `153.24 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `51.27 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `115.81 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `181.26 µs` |
| `Node.js native crypto - createKeypair` | `48.19 µs` |
| `Node.js native crypto - sign` | `40.09 µs` |
| `Web Crypto API - createKeypair` | `106.68 µs` |
| `Web Crypto API - sign` | `83.21 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `306.80 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `767.77 µs` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `537.40 µs` |
| `libsodium-js - createKeypair` | `142.30 µs` |
| `libsodium-js - verify` | `130.49 µs` |
| `libsodium-js - sign` | `117.44 µs` |


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
