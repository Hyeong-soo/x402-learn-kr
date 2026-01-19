# x402-oss-worker

A Cloudflare Worker that acts as an x402 gateway, enabling HTTP 402 Payment Required flows for protected resources.

## Overview

This worker fetches `.x402.yml` configuration files from target domains and returns appropriate 402 responses with payment challenges for protected endpoints.

## Features

- Fetches and caches `.x402.yml` configs from target domains
- Generates EIP-712 typed payment challenges
- Supports USDC payments on Base Sepolia testnet
- KV-based caching for configuration files

## Setup

### Prerequisites

- Node.js 18+
- Cloudflare account with Workers enabled
- Wrangler CLI (`npm install -g wrangler`)

### Installation

```bash
npm install
```

### Configuration

1. Create a KV namespace for caching:
   ```bash
   npx wrangler kv:namespace create CONFIG_CACHE
   ```

2. Update `wrangler.toml` with your KV namespace IDs:
   ```toml
   [[kv_namespaces]]
   binding = "CONFIG_CACHE"
   id = "your-kv-namespace-id"
   preview_id = "your-kv-preview-id"
   ```

### Development

```bash
npm run dev
```

The worker will start on `http://localhost:8787`.

### Deployment

```bash
npm run deploy
```

## API Endpoints

### GET /

Health check endpoint.

### GET /fetch?url={targetUrl}

Proxies requests to the target URL and handles x402 payment flows:

- Fetches `.x402.yml` from the target domain
- Checks if the requested path is protected
- Returns 402 with payment challenge if protection is required
- Proxies the request if no payment is required

**Query Parameters:**
- `url` (required): The target URL to fetch

**Response:**
- `200`: Successful proxy response
- `402`: Payment required with challenge details
- `400`: Missing or invalid URL parameter
- `500`: Server error

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `FACILITATOR_URL` | x402 facilitator endpoint | `https://x402.org/facilitator` |
| `DEFAULT_NETWORK` | Default blockchain network | `eip155:84532` (Base Sepolia) |
| `USDC_ADDRESS` | USDC contract address | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |

## License

MIT
