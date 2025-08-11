"use client";

import React from "react";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  X,
  Heart,
  Users,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  ChevronUp,
} from "lucide-react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OnboardingTeaser from "@/components/onboarding/OnboardingTeaser";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

// tokens that mirror your brand
const RAIL_WIDTH = "w-[72px]";
const DRAWER_WIDTH = "w-72";
const BRAND_BG = "bg-[#fefcf5]/95";
const BRAND_BORDER = "border-[#e7e4db]/50";
const BRAND_TINT = "bg-[#e9f9fb]";
const BRAND_BLUE = "#1557f6";

const navigation = [
  {
    name: "Dashboard",
    id: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & insights",
  },
  {
    name: "Clinics",
    id: "clinics",
    href: "/clinics",
    icon: Building2,
    description: "Manage providers",
  },
  {
    name: "Payments",
    id: "payments",
    href: "/payments",
    icon: CreditCard,
    description: "Payment plans",
  },
  {
    name: "Analytics",
    id: "analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Reports & metrics",
  },
  {
    name: "Settings",
    id: "settings",
    href: "/settings",
    icon: Settings,
    description: "System configuration",
  },
];

const quickActions = [
  { name: "All Patients", icon: Users, count: "2,847" },
  { name: "Active Plans", icon: FileText, count: "1,234" },
  { name: "Notifications", icon: Bell, count: "12" },
];

export default function Sidebar({
  isOpen,
  setIsOpen,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const needsOnboarding =
    (user?.publicMetadata as any)?.onboardingComplete !== true;

  return (
    <>
      {/* mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* shell */}
      <aside
        className={[
          "z-50 lg:z-auto",
          BRAND_BG,
          "backdrop-blur-xl shadow-xl border",
          BRAND_BORDER,
          "rounded-2xl h-full flex flex-col min-h-0",
          "transform transition-all duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
          isCollapsed ? RAIL_WIDTH : DRAWER_WIDTH,
          "lg:w-full",
        ].join(" ")}
        aria-label="Primary"
      >
        {/* header */}
        <div
          className={[
            "flex items-center h-16 shrink-0 border-b",
            BRAND_BORDER,
            isCollapsed ? "justify-center px-3" : "justify-between px-4",
          ].join(" ")}
        >
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(false)}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center shadow-lg transition-colors group"
              title="Expand"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
            </button>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-[#1557f6] to-[#84cc16] rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="leading-tight">
                  <span className="text-lg font-bold text-gray-900">
                    HealthPay
                  </span>
                  <p className="text-[11px] text-gray-500 font-medium">
                    Healthcare Platform
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                  title="Collapse"
                  aria-label="Collapse sidebar"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                </button>
                <button
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* scrollable nav */}
        <nav
          className={[
            "flex-1 min-h-0 overflow-y-auto",
            isCollapsed ? "px-2 py-3" : "px-4 py-4",
          ].join(" ")}
        >
          {!isCollapsed && (
            <p className="px-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Main
            </p>
          )}

          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    title={
                      isCollapsed ? item.description || item.name : undefined
                    }
                    aria-current={active ? "page" : undefined}
                    className={[
                      "group relative flex items-center rounded-xl text-sm font-medium transition-all",
                      isCollapsed ? "justify-center px-2 py-3" : "px-3 py-2",
                      active
                        ? `${BRAND_TINT} text-[#1557f6] ring-1 ring-[#1557f6]/10`
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
                    ].join(" ")}
                  >
                    {/* subtle active rail */}
                    {active && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full"
                        style={{ backgroundColor: BRAND_BLUE }}
                        aria-hidden="true"
                      />
                    )}

                    <Icon
                      className={[
                        "w-5 h-5 flex-shrink-0",
                        isCollapsed ? "" : "mr-3",
                        active
                          ? "text-[#1557f6]"
                          : "text-gray-400 group-hover:text-gray-600",
                        "transition-colors",
                      ].join(" ")}
                    />

                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* quick actions (expanded only), spaced and quiet */}
          {!isCollapsed && (
            <div className="mt-6">
              <p className="px-2 text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Quick Actions
              </p>
              <div className="space-y-2">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center min-w-0">
                        <Icon className="w-4 h-4 mr-3 text-gray-400 group-hover:text-gray-600" />
                        <span className="font-medium truncate">
                          {action.name}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-gray-600 bg-gray-100 px-2 py-0 rounded-full">
                        {action.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* bottom stack: teaser (if needed) above profile */}
        <div
          className={[
            "shrink-0",
            isCollapsed ? "p-2 pt-0" : "px-4 pb-3 pt-0",
          ].join(" ")}
        >
          {needsOnboarding && (
            <div>
              {/* we’ll refine visual once you share the component; for now we keep prop */}
              <OnboardingTeaser isCollapsed={isCollapsed} />
            </div>
          )}

          <div
            className={[
              "border-t",
              BRAND_BORDER,
              isCollapsed ? "pt-2" : "pt-3",
            ].join(" ")}
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                aria-label={`Open account menu for ${user?.fullName || "User"}`}
              >
                <button
                  className={[
                    "w-full flex items-center rounded-xl transition-colors p-2",
                    "hover:bg-gray-100",
                    isCollapsed
                      ? "justify-center h-14"
                      : "p-2 gap-4 h-14",
                  ].join(" ")}
                  aria-haspopup="menu"
                  aria-expanded="false" // manage this state dynamically
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
                    <User className="w-6 h-6 text-gray-600" />
                  </div>
                  {!isCollapsed && (
                    <>
                      <div className="min-w-0 text-left">
                        <p className="text-sm font-medium text-gray-800 truncate">
                          {user?.fullName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.emailAddresses?.[0]?.emailAddress ||
                            "user@example.com"}
                        </p>
                      </div>
                      <ChevronUp className="w-4 h-4 text-gray-400 ml-auto" />
                    </>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56"
                align={isCollapsed ? "center" : "start"}
                side={isCollapsed ? "right" : "top"}
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.fullName || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.emailAddresses?.[0]?.emailAddress ||
                        "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/settings")}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut(() => router.push("/"))}
                  className="cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>
    </>
  );
}
