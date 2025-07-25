# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 03:37:00 GMT for commit [`9bcd99a`](https://github.com/jlucaso1/crypto-benchmark/commit/9bcd99a)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `241.83 µs` |
| `noble - sign` | `441.91 µs` |
| `noble - edwardsToMontgomery` | `163.92 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `49.36 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `148.63 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `165.66 µs` |
| `Node.js native crypto - createKeypair` | `45.73 µs` |
| `Node.js native crypto - sign` | `40.12 µs` |
| `Web Crypto API - createKeypair` | `100.82 µs` |
| `Web Crypto API - sign` | `76.49 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `454.69 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `1.08 ms` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `721.44 µs` |
| `libsodium-js - createKeypair` | `140.07 µs` |
| `libsodium-js - verify` | `132.15 µs` |
| `libsodium-js - sign` | `117.18 µs` |


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
