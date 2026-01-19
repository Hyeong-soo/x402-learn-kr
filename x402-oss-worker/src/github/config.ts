import { parse as parseYaml } from "yaml";
import type { Env, X402Config, ResolvedPricing } from "../x402/types";

// USDC has 6 decimals
const USDC_DECIMALS = 6;

// Default config when .x402.yml is not found
const DEFAULT_CONFIG: X402Config = {
  version: 1,
  wallet: "",
  pricing: { default: 0 },
};

// Cache TTL in seconds (5 minutes)
const CACHE_TTL = 300;

/**
 * Fetch and parse .x402.yml from a GitHub repository
 */
export async function getX402Config(
  env: Env,
  owner: string,
  repo: string
): Promise<X402Config> {
  const cacheKey = `config:${owner}/${repo}`;

  // Check KV cache first
  const cached = await env.CONFIG_CACHE.get(cacheKey);
  if (cached) {
    return JSON.parse(cached) as X402Config;
  }

  // Fetch from GitHub
  const config = await fetchConfigFromGitHub(owner, repo);

  // Cache the result
  await env.CONFIG_CACHE.put(cacheKey, JSON.stringify(config), {
    expirationTtl: CACHE_TTL,
  });

  return config;
}

/**
 * Fetch .x402.yml from GitHub raw content
 */
async function fetchConfigFromGitHub(
  owner: string,
  repo: string
): Promise<X402Config> {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/.x402.yml`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "x402-oss-gateway/0.1.0",
      },
    });

    if (!response.ok) {
      // No config file = all content is free
      return DEFAULT_CONFIG;
    }

    const yamlText = await response.text();
    const config = parseYaml(yamlText) as X402Config;

    // Validate required fields
    if (!config.wallet || !config.pricing) {
      console.warn(`Invalid .x402.yml in ${owner}/${repo}`);
      return DEFAULT_CONFIG;
    }

    return config;
  } catch (error) {
    console.error(`Failed to fetch .x402.yml: ${error}`);
    return DEFAULT_CONFIG;
  }
}

/**
 * Get pricing for a specific path based on config
 */
export function getPricingForPath(
  config: X402Config,
  path: string
): ResolvedPricing {
  let price = config.pricing.default;

  // Check path-specific pricing
  if (config.pricing.paths) {
    for (const [pattern, pathPrice] of Object.entries(config.pricing.paths)) {
      if (matchPath(pattern, path)) {
        price = pathPrice;
        break; // First match wins
      }
    }
  }

  return {
    price,
    priceInWei: usdcToWei(price),
    wallet: config.wallet,
    path,
  };
}

/**
 * Match a path against a glob-like pattern
 * Supports:
 * - "docs/file.md" (exact match)
 * - "docs/*.md" (single level wildcard)
 * - "docs/**" (multi-level wildcard)
 */
function matchPath(pattern: string, path: string): boolean {
  // Convert glob pattern to regex
  const regexPattern = pattern
    .replace(/\*\*/g, "{{GLOBSTAR}}")
    .replace(/\*/g, "[^/]*")
    .replace(/{{GLOBSTAR}}/g, ".*")
    .replace(/\//g, "\\/");

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(path);
}

/**
 * Convert USDC amount to wei (atomic units)
 * USDC has 6 decimals, so $1.00 = 1000000 wei
 */
function usdcToWei(usdcAmount: number): string {
  const wei = Math.floor(usdcAmount * 10 ** USDC_DECIMALS);
  return wei.toString();
}

/**
 * Fetch raw content from GitHub
 */
export async function fetchGitHubContent(
  owner: string,
  repo: string,
  path: string
): Promise<Response> {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "x402-oss-gateway/0.1.0",
    },
  });

  if (!response.ok) {
    return new Response(`Content not found: ${path}`, { status: 404 });
  }

  // Return content with appropriate headers
  const content = await response.text();
  const contentType = getContentType(path);

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "X-Source": `github:${owner}/${repo}`,
    },
  });
}

/**
 * Determine content type based on file extension
 */
function getContentType(path: string): string {
  const ext = path.split(".").pop()?.toLowerCase();

  const contentTypes: Record<string, string> = {
    md: "text/markdown",
    txt: "text/plain",
    json: "application/json",
    yaml: "text/yaml",
    yml: "text/yaml",
    ts: "text/typescript",
    js: "text/javascript",
    html: "text/html",
    css: "text/css",
  };

  return contentTypes[ext || ""] || "text/plain";
}
