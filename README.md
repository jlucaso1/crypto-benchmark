# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 03:13:27 GMT for commit [`786d189`](https://github.com/jlucaso1/crypto-benchmark/commit/786d189)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `231.03 µs` |
| `noble - sign` | `412.01 µs` |
| `noble - edwardsToMontgomery` | `154.23 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `48.60 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `117.61 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `165.40 µs` |
| `Node.js native crypto - createKeypair` | `45.96 µs` |
| `Node.js native crypto - sign` | `40.03 µs` |
| `Web Crypto API - createKeypair` | `102.26 µs` |
| `Web Crypto API - sign` | `81.07 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `455.84 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `1.08 ms` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `715.50 µs` |
| `libsodium-js - createKeypair` | `139.65 µs` |
| `libsodium-js - sign` | `52.02 µs` |


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
