import React, { useState } from "react";
import { Outlet } from "react-router";
import logoSrc from "../assets/images/seminole-logo.jpg";
import BottomNav from "../components/BottomNav";

export default function MainLayout() {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-red-700 text-white p-4">
        <div className="flex items-end gap-4">
          <img src={logoSrc} alt="logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold">Seminole Tribe of Florida</h1>
        </div>
      </header>

      {/* Bottom padding for fixed nav */}
      <main className="grow container mx-auto p-4 pb-24">
        <Outlet />
      </main>

      {/* Optional: hide footer for more “native app” feel */}
      <footer className="hidden bg-gray-200 text-center p-4 sm:block">
        <p className="text-sm text-gray-600">© 2024 HWHR Poker</p>
      </footer>

      <BottomNav onShare={() => setShareOpen(true)} />

      {/* Share Modal placeholder */}
      {shareOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Share App</h2>
              <button
                className="rounded-lg border px-3 py-1"
                onClick={() => setShareOpen(false)}
              >
                Close
              </button>
            </div>

            <p className="mt-3 text-sm text-slate-700">
              Next step: show a QR code here pointing to your secret URL.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
