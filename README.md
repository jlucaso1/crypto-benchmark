# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 23:07:53 GMT for commit [`66c0c0d`](https://github.com/jlucaso1/crypto-benchmark/commit/66c0c0d)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `233.22 µs` |
| `noble - sign` | `421.23 µs` |
| `noble - edwardsToMontgomery` | `158.89 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `53.12 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `121.07 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `167.17 µs` |
| `Node.js native crypto - createKeypair` | `46.28 µs` |
| `Node.js native crypto - sign` | `41.55 µs` |
| `Rust (WASM with libsignal) - createKeypair` | `54.82 µs` |
| `Rust (WASM with libsignal) - sign` | `105.24 µs` |
| `Rust (WASM with libsignal) - verify` | `156.46 µs` |
| `Web Crypto API - createKeypair` | `117.47 µs` |
| `Web Crypto API - sign` | `88.44 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `316.62 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `718.83 µs` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `462.41 µs` |
| `libsodium-js - createKeypair` | `141.05 µs` |
| `libsodium-js - verify` | `132.34 µs` |
| `libsodium-js - sign` | `117.12 µs` |


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
