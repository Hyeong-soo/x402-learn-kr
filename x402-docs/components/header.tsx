"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Github, Zap } from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/learn", label: "학습" },
    { href: "/demo", label: "데모" },
    { href: "/docs", label: "문서" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2 group">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
            <Zap className="h-5 w-5 text-emerald-400" />
          </div>
          <span className="font-bold text-lg">x402</span>
        </Link>
        <nav className="flex items-center space-x-1 text-sm font-medium">
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
        <div className="flex flex-1 items-center justify-end space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 bg-white/5 hover:bg-white/10 text-white"
            asChild
          >
            <Link href="https://github.com" target="_blank">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
