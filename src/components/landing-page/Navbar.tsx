import { ChevronDown, Menu, X } from "lucide-react";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { useState } from "react";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 pt-3 z-50  backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex h-14 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-white">
              <span className="text-xs font-semibold tracking-tight">BZ</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-slate-900">
              Breeze
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-slate-900">
                Use cases
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-700 transition hover:text-slate-900">
                Resources
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              Pricing
            </a>
            <a
              href="#careers"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              Careers
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
            >
              Contact sales
            </a>
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#login"
              className="rounded-2xl bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
            >
              Log in
            </a>
            <InteractiveHoverButton className="text-sm font-medium py-1.5">
              Sign Up
            </InteractiveHoverButton>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-md p-1.5 text-slate-700 ring-1 ring-slate-300 transition hover:text-slate-900 hover:ring-slate-400"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white py-4">
            <nav className="flex flex-col gap-4">
              <button className="flex items-center justify-between text-xs font-medium text-slate-700 transition hover:text-slate-900">
                Use cases
                <ChevronDown className="h-3 w-3" />
              </button>
              <button className="flex items-center justify-between text-xs font-medium text-slate-700 transition hover:text-slate-900">
                Resources
                <ChevronDown className="h-3 w-3" />
              </button>
              <a
                href="#pricing"
                className="text-xs font-medium text-slate-700 transition hover:text-slate-900"
              >
                Pricing
              </a>
              <a
                href="#careers"
                className="text-xs font-medium text-slate-700 transition hover:text-slate-900"
              >
                Careers
              </a>
              <a
                href="#contact"
                className="text-xs font-medium text-slate-700 transition hover:text-slate-900"
              >
                Contact sales
              </a>
              <hr className="border-slate-200" />
              <a
                href="#login"
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900"
              >
                Log in
              </a>
              <a
                href="#demo"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Get Breeze free
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
