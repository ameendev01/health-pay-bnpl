import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  // Next.js dev often needs 'unsafe-eval'; never ship it to prod
  `script-src 'self'${
    isDev ? " 'unsafe-eval'" : ""
  } https://clerk.com https://*.clerk.com https://clerkcdn.com https://*.clerk.accounts.dev https://api.clerk.com`,
  // Tailwind/Next inline styles + Clerk CDN styles
  "style-src 'self' 'unsafe-inline' https://clerkcdn.com",
  // Images: self, any https, data URLs
  "img-src 'self' data: https:",
  // Fonts: self + data URLs
  "font-src 'self' data:",
  // XHR/fetch/WebSocket targets
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://clerk.com https://*.clerk.com https://clerkcdn.com https://*.clerk.accounts.dev https://api.clerk.com",
  // Clerk embeds sign-in iframes; allow their hosts
  "frame-src https://clerk.com https://*.clerk.com https://clerkcdn.com https://*.clerk.accounts.dev",
  // Lock forms and base URL
  "form-action 'self'",
  "base-uri 'self'",
  // Next/Workers
  "worker-src 'self' blob:",
  // Clickjacking/XSS legacy sinks
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // HSTS: 1 year, include subdomains; preload optional (enable after verification)
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    // Disable powerful features by default; allow list as needed
    value:
      "accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), clipboard-read=(), clipboard-write=(), display-capture=(), document-domain=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()",
  },
  {
    key: "Content-Security-Policy",
    // Note: Keep inline scripts disabled; allow inline styles for Tailwind runtime classes
    // Adjust connect-src/img-src/font-src as needed for Clerk/Supabase and other vendors
    value: csp,
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "clerkcdn.com" }, // add if needed
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
