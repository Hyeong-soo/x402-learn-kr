export default function CustomPricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm text-yellow-600 font-medium bg-yellow-50 px-2 py-1 rounded">
            🤖 AI: $0.01
          </span>
          <span className="text-sm text-green-600 font-medium">👤 Humans: Free</span>
        </div>
        <h1 className="text-4xl font-bold mt-2 mb-4">Custom Pricing Strategies</h1>
        <p className="text-gray-600 text-lg">
          Implement dynamic pricing based on content type, complexity, and usage patterns.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-blue-800">
          <strong>Note:</strong> If you're reading this as a human in a browser,
          you're seeing it for free! AI agents accessing this page programmatically
          are charged $0.01 USDC.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>Dynamic Pricing</h2>
        <p>
          Instead of fixed prices, you can implement dynamic pricing based on
          various factors:
        </p>

        <h3>Content-based pricing</h3>
        <pre>
          <code>{`// x402.config.ts
export const x402Config = {
  wallet: "0x...",

  // Dynamic pricing function
  getPricing: (path: string, metadata: any) => {
    // Price based on content length
    const wordCount = metadata.wordCount || 0;

    if (wordCount > 5000) return 0.05;  // Long content
    if (wordCount > 1000) return 0.02;  // Medium content
    return 0.01;                         // Short content
  },
};`}</code>
        </pre>

        <h3>Time-based pricing</h3>
        <pre>
          <code>{`// Peak hours pricing
getPricing: (path: string) => {
  const hour = new Date().getUTCHours();
  const isPeakHour = hour >= 14 && hour <= 22; // US business hours

  return isPeakHour ? 0.02 : 0.01;
};`}</code>
        </pre>

        <h3>Usage-based pricing</h3>
        <pre>
          <code>{`// Volume discounts
getPricing: async (path: string, context: RequestContext) => {
  const { aiAgentId } = context;
  const monthlyUsage = await getUsage(aiAgentId);

  // Discount for high-volume users
  if (monthlyUsage > 10000) return 0.005;
  if (monthlyUsage > 1000) return 0.008;
  return 0.01;
};`}</code>
        </pre>

        <h2>Content Categories</h2>
        <p>
          Categorize your content and price accordingly:
        </p>

        <table className="w-full">
          <thead>
            <tr>
              <th>Category</th>
              <th>Example</th>
              <th>Suggested Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Getting Started</td>
              <td>Installation, Quick Start</td>
              <td>Free or $0.005</td>
            </tr>
            <tr>
              <td>API Reference</td>
              <td>Method documentation</td>
              <td>$0.01</td>
            </tr>
            <tr>
              <td>Tutorials</td>
              <td>Step-by-step guides</td>
              <td>$0.02</td>
            </tr>
            <tr>
              <td>Advanced Topics</td>
              <td>Architecture, Best Practices</td>
              <td>$0.03-0.05</td>
            </tr>
            <tr>
              <td>Enterprise</td>
              <td>Scaling, Security</td>
              <td>$0.05-0.10</td>
            </tr>
          </tbody>
        </table>

        <h2>Implementing Tiered Access</h2>
        <pre>
          <code>{`// middleware.ts
import { x402Middleware, TieredPricing } from "x402-middleware";

const pricing = new TieredPricing({
  tiers: {
    free: {
      paths: ["/docs/getting-started/**", "/docs/installation"],
      price: 0,
    },
    basic: {
      paths: ["/docs/api/**", "/docs/guides/**"],
      price: 0.01,
    },
    advanced: {
      paths: ["/docs/advanced/**"],
      price: 0.02,
    },
    enterprise: {
      paths: ["/docs/enterprise/**"],
      price: 0.05,
    },
  },
});

export const middleware = x402Middleware({ pricing });`}</code>
        </pre>

        <h2>Best Practices</h2>
        <ul>
          <li>
            <strong>Start low:</strong> Begin with $0.01 and adjust based on demand
          </li>
          <li>
            <strong>Keep getting started free:</strong> Lower barrier to entry
          </li>
          <li>
            <strong>Price by value:</strong> Enterprise content can be priced higher
          </li>
          <li>
            <strong>Monitor and adjust:</strong> Use analytics to optimize pricing
          </li>
        </ul>

        <div className="bg-gray-100 rounded-lg p-6 my-8">
          <h3>💡 Pro tip</h3>
          <p>
            Most successful projects price basic docs at $0.01 and reserve higher
            prices ($0.05+) for specialized enterprise content. This maximizes
            both accessibility and revenue.
          </p>
        </div>
      </div>
    </div>
  );
}
