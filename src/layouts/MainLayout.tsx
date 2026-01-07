import React, { useState } from "react";
import { Outlet } from "react-router";
import logoSrc from "../assets/images/icon.svg";
import BottomNav from "../components/BottomNav";
import ShareInstallModal from "../components/ShareInstallModal";

export default function MainLayout() {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-gray-950 dark:text-white">
      {/* <header className="bg-red-700 text-white p-4">
        <div className="flex items-end gap-4">
          <img src={logoSrc} alt="logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-bold">Seminole Tribe of Florida</h1>
        </div>
      </header> */}

      <main className="grow container mx-auto p-4 pb-24">
        <Outlet />
      </main>

      <footer className="hidden bg-gray-200 text-center p-4 sm:block">
        <p className="text-sm text-gray-600">© 2024 HWHR Poker</p>
      </footer>

      <BottomNav onShare={() => setShareOpen(true)} shareActive={shareOpen} />

      <ShareInstallModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        qrImageSrc="/qr/poker-rules-qr.png"
        appUrl="https://hwhr-poker.vercel.app/"
        appName="Poker Rules"
      />
    </div>
  );
}
