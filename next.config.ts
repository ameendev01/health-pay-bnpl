import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // HSTS: 1 year, include subdomains; preload optional (enable after verification)
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    // Disable powerful features by default; allow list as needed
    value: "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), clipboard-read=(), clipboard-write=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()",
  },
  {
    key: "Content-Security-Policy",
    // Note: Keep inline scripts disabled; allow inline styles for Tailwind runtime classes
    // Adjust connect-src/img-src/font-src as needed for Clerk/Supabase and other vendors
    value: [
      "default-src 'self'",
      // Next.js + Clerk may inject scripts from their domains; avoid 'unsafe-inline' scripts
      "script-src 'self'",
      // Allow inline styles for framework styling; consider CSP nonces in future
      "style-src 'self' 'unsafe-inline'",
      // Images from self, data URIs, and https sources
      "img-src 'self' data: https:",
      // Fonts from self and data URIs
      "font-src 'self' data:",
      // Connections to Supabase, Clerk and same-origin APIs
      "connect-src 'self' https://*.supabase.co https://*.clerk.accounts.dev https://api.clerk.com https://clerk.com",
      // Frame ancestors restriction (also via X-Frame-Options)
      "frame-ancestors 'none'",
      // Disallow object/embed
      "object-src 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // allow any path on that host
      },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
