"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Zap, Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/learn", label: "학습" },
    { href: "/demo", label: "데모" },
    { href: "/docs", label: "문서" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>
          <span className="font-bold text-lg">Learn402</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-4 py-2 rounded-lg transition-colors",
                pathname?.startsWith(item.href)
                  ? "text-white bg-white/10"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop GitHub Button */}
        <div className="hidden md:flex items-center">
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
            asChild
          >
            <Link href="https://github.com/Hyeong-soo/x402-learn-kr" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg transition-colors",
                  pathname?.startsWith(item.href)
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10">
              <Link
                href="https://github.com/Hyeong-soo/x402-learn-kr"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
