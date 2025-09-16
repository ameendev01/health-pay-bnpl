// components/BreezeFooter.tsx
import { Twitter as X, Linkedin, Github, Youtube } from "lucide-react";
import Link from "next/link";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Get Breeze", href: "/signup" },
      { label: "Breeze Premium", href: "/premium" },
      { label: "Changelog", href: "/changelog" },
      { label: "Compare", href: "/compare" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource Center", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Events & Webinars", href: "/events" },
      { label: "Success Stories", href: "/customers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Partnerships", href: "/partners" },
      { label: "Careers", href: "/careers" },
      { label: "About Breeze", href: "/about" },
      { label: "Press Kit", href: "/press" },
      { label: "Security", href: "/security" },
    ],
  },
  {
    title: "Sales & Support",
    links: [
      { label: "Contact Sales", href: "/contact" },
      { label: "Request a Demo", href: "/demo" },
      { label: "Start a Pilot", href: "/pilot" },
      { label: "Help Center", href: "/help" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white text-neutral-800">
      {/* Top: logo + columns */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 py-16 sm:py-20 md:grid-cols-12">
          {/* Brand block (kept narrow like the ref) */}
          <div className="md:col-span-3 lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="Breeze home"
            >
              {/* minimal mark to match the “CI” feel in the screenshot */}
              <svg
                viewBox="0 0 32 20"
                className="h-5 w-auto"
                aria-hidden="true"
              >
                <rect
                  x="0"
                  y="2"
                  width="10"
                  height="10"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="14"
                  y="2"
                  width="6"
                  height="10"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
              <span className="sr-only">Breeze</span>
            </Link>
          </div>

          {/* Link columns */}
          <div className="md:col-span-9 lg:col-span-10">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {columns.map((col) => (
                <nav key={col.title} aria-label={col.title}>
                  <h3 className="text-sm font-medium text-neutral-600 tracking-tight">
                    {col.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="text-sm leading-6 text-neutral-700 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-sm"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Meta row: social • legal • copyright */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col items-center gap-6 border-t border-neutral-200/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Social icons (left-aligned on wide screens, tiny and low-contrast like ref) */}
          <div className="flex items-center gap-4 text-neutral-500">
            <a
              href="https://x.com/"
              aria-label="Breeze on X"
              className="transition hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-[4px] p-1"
            >
              <X className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/"
              aria-label="Breeze on LinkedIn"
              className="transition hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-[4px] p-1"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/"
              aria-label="Breeze on GitHub"
              className="transition hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-[4px] p-1"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com/"
              aria-label="Breeze on YouTube"
              className="transition hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-[4px] p-1"
            >
              <Youtube className="h-4 w-4" />
            </a>
          </div>

          {/* Legal links (center cluster on desktop like the reference) */}
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-500">
            <li>
              <a
                href="/terms"
                className="hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-sm"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="/privacy"
                className="hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-sm"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/licenses"
                className="hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-sm"
              >
                Licenses
              </a>
            </li>
            <li>
              <button
                type="button"
                className="hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 rounded-sm"
                onClick={() => {
                  // open your cookie manager here
                }}
              >
                Manage Cookies
              </button>
            </li>
          </ul>

          {/* Copyright */}
          <p className="text-xs text-neutral-500">
            2025 Breeze Technologies. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
