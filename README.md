# learn402

> Interactive learning platform for the x402 payment protocol

## Overview

learn402 is an educational platform designed to help developers understand and experiment with the [x402 payment protocol](https://www.x402.org/). Through hands-on demos and comprehensive guides, you can learn how HTTP 402-based micropayments work in practice.

**Live Demo**: https://laern402.xyz

## Project Structure

```
learn402/
├── x402-docs/           # Next.js educational site
└── x402-oss-worker/     # Cloudflare Worker (x402 gateway)
```

### x402-docs

Next.js application providing:
- Protocol learning content and documentation
- Interactive payment demos with wallet integration
- MCP server configuration guides

### x402-oss-worker

Cloudflare Worker serving as an x402 payment gateway:
- Handles HTTP 402 responses
- Processes payment verification
- Proxies requests to content providers

## Features

- **Interactive Demos**: Connect your wallet and test x402 payments in a sandbox environment
- **Protocol Documentation**: Learn how x402 extends HTTP with payment capabilities
- **MCP Integration Guide**: Set up x402-fetch-mcp for AI agent payments
- **Code Examples**: Reference implementations for common use cases

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/learn402.git
cd learn402
```

2. Start the documentation site:
```bash
cd x402-docs
npm install
npm run dev -- -p 3010
```

3. Start the worker (optional):
```bash
cd x402-oss-worker
npm install
npm run dev
```

4. Open http://localhost:3010 in your browser

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Web3**: wagmi, viem, RainbowKit
- **Worker**: Cloudflare Workers, Wrangler
- **Protocol**: x402 SDK (@x402/fetch, @x402/evm)

## Related Resources

- [x402 Protocol](https://github.com/coinbase/x402) - Official x402 specification by Coinbase
- [x402 Foundation](https://www.x402.org/) - Industry foundation for x402 standardization
- [x402-fetch-mcp](https://github.com/anthropics/x402-fetch-mcp) - MCP server for AI agent payments

## License

MIT License - See [LICENSE](LICENSE) for details.
