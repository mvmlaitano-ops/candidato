"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-5 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
            <span className="text-accent font-bold text-[10px]">C</span>
          </div>
          <span className="text-sm font-semibold text-text-1 tracking-tight hidden sm:inline">
            candidato
          </span>
        </Link>

        <div className="flex items-center gap-5">
          {!isHome && (
            <Link href="/" className="text-xs text-text-3 hover:text-text-1 transition-colors font-medium">
              Inicio
            </Link>
          )}
          <div className="flex items-center gap-2 bg-surface border border-border rounded-full px-3 py-1">
            <span className="live-dot" />
            <span className="text-[10px] text-text-2 font-medium">Demo</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
