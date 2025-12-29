import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

type Props = {
  onShareApp?: () => void;
};

export default function HamburgerMenu({ onShareApp }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // Close when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-white/30 px-3 py-2 hover:bg-white/10"
        aria-label="Open menu"
        aria-expanded={open}
      >
        ☰
      </button>

      {open && (
        <div className="absolute left-0 mt-2 w-56 overflow-hidden rounded-xl bg-white text-slate-900 shadow-lg">
          <Link className="block px-4 py-3 hover:bg-slate-100" to="/rules">
            Entire Rulebook
          </Link>

          <Link className="block px-4 py-3 hover:bg-slate-100" to="/search">
            Search
          </Link>

          <div className="border-t" />

          <button
            type="button"
            className="w-full text-left px-4 py-3 hover:bg-slate-100"
            onClick={() => onShareApp?.()}
          >
            Share App
          </button>
        </div>
      )}
    </div>
  );
}
