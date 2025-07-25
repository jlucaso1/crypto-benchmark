# Crypto Benchmark

A comprehensive benchmark suite for comparing cryptographic operations across multiple libraries and languages (Node.js, Rust, Zig, WebCrypto, etc).

## 📊 Performance Benchmarks

<!-- BENCHMARK_START -->

*Last updated: Fri, 25 Jul 2025 16:23:38 GMT for commit [`cd259d0`](https://github.com/jlucaso1/crypto-benchmark/commit/cd259d0)*

| Benchmark | Avg. Time per Iteration |
|-----------|-------------------------|
| `noble - createKeypair` | `232.33 µs` |
| `noble - sign` | `429.85 µs` |
| `noble - edwardsToMontgomery` | `152.03 µs` |
| `Rust (WASM with XEd25519 - Optimized) - createKeypair` | `48.42 µs` |
| `Rust (WASM with XEd25519 - Optimized) - sign` | `147.68 µs` |
| `Rust (WASM with XEd25519 - Optimized) - verify` | `168.64 µs` |
| `Node.js native crypto - createKeypair` | `45.95 µs` |
| `Node.js native crypto - sign` | `39.90 µs` |
| `Web Crypto API - createKeypair` | `105.12 µs` |
| `Web Crypto API - sign` | `80.96 µs` |
| `Zig (WASM with XEd25519 - Optimized) - createKeypair` | `299.27 µs` |
| `Zig (WASM with XEd25519 - Optimized) - sign` | `745.35 µs` |
| `Zig (WASM with XEd25519 - Optimized) - verify` | `589.80 µs` |
| `libsodium-js - createKeypair` | `139.02 µs` |
| `libsodium-js - verify` | `131.69 µs` |
| `libsodium-js - sign` | `118.82 µs` |


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
