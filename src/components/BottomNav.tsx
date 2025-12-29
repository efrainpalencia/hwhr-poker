import React from "react";
import { Link, useLocation } from "react-router";
import { Home, BookOpen, Search, Share2 } from "lucide-react";

type Props = {
  onShare?: () => void; // opens QR modal later
};

export default function BottomNav({ onShare }: Props) {
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const baseItem =
    "flex flex-col items-center justify-center gap-1 py-2 text-xs";
  const activeCls = "text-slate-900";
  const inactiveCls = "text-slate-500";

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }} // iPhone safe area
    >
      <div className="mx-auto max-w-md">
        <div className="grid grid-cols-4">
          <Link
            to="/"
            className={`${baseItem} ${isActive("/") ? activeCls : inactiveCls}`}
            aria-label="Home"
          >
            <Home size={22} />
            <span>Home</span>
          </Link>

          <Link
            to="/rules"
            className={`${baseItem} ${
              isActive("/rules") ? activeCls : inactiveCls
            }`}
            aria-label="Rulebook"
          >
            <BookOpen size={22} />
            <span>Rulebook</span>
          </Link>

          <Link
            to="/search"
            className={`${baseItem} ${
              isActive("/search") ? activeCls : inactiveCls
            }`}
            aria-label="Search"
          >
            <Search size={22} />
            <span>Search</span>
          </Link>

          <button
            type="button"
            onClick={onShare}
            className={`${baseItem} ${inactiveCls}`}
            aria-label="Share"
          >
            <Share2 size={22} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
