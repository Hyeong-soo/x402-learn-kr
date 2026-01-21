const BASE_URL = "https://learn402.xyz";

const urls = [
  { loc: "", changefreq: "weekly", priority: "1.0" },
  { loc: "/learn", changefreq: "weekly", priority: "0.9" },
  { loc: "/learn/what-is-x402", changefreq: "monthly", priority: "0.8" },
  { loc: "/learn/how-it-works", changefreq: "monthly", priority: "0.8" },
  { loc: "/learn/components", changefreq: "monthly", priority: "0.7" },
  { loc: "/learn/eip712", changefreq: "monthly", priority: "0.7" },
  { loc: "/learn/usdc-transfer", changefreq: "monthly", priority: "0.7" },
  { loc: "/learn/ecosystem", changefreq: "monthly", priority: "0.7" },
  { loc: "/docs", changefreq: "weekly", priority: "0.9" },
  { loc: "/docs/getting-started", changefreq: "weekly", priority: "0.8" },
  { loc: "/docs/advanced/custom-pricing", changefreq: "monthly", priority: "0.6" },
  { loc: "/docs/advanced/analytics", changefreq: "monthly", priority: "0.6" },
  { loc: "/demo", changefreq: "weekly", priority: "0.8" },
  { loc: "/demo/visualizer", changefreq: "monthly", priority: "0.7" },
  { loc: "/demo/paywall", changefreq: "monthly", priority: "0.7" },
  { loc: "/demo/protected-content", changefreq: "monthly", priority: "0.6" },
];

export async function GET() {
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${BASE_URL}${url.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
