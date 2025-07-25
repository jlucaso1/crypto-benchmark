# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 17:23:30 GMT for commit [`d724ce1`](https://github.com/jlucaso1/crypto-benchmark/commit/d724ce1)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `229.75 µs` |
| `noble - sign` | `432.71 µs` |
| `noble - edwardsToMontgomery` | `158.19 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `50.05 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `152.85 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `165.98 µs` |
| `Node.js native crypto - createKeypair` | `45.86 µs` |
| `Node.js native crypto - sign` | `40.70 µs` |
| `Web Crypto API - createKeypair` | `110.95 µs` |
| `Web Crypto API - sign` | `90.00 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `320.87 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `746.11 µs` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `493.17 µs` |
| `libsodium-js - createKeypair` | `142.94 µs` |
| `libsodium-js - verify` | `134.18 µs` |
| `libsodium-js - sign` | `119.34 µs` |


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
