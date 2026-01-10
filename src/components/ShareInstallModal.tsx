import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;

  appUrl?: string;

  qrImageSrc: string;

  appName?: string;
};

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export default function ShareInstallModal({
  open,
  onClose,
  appUrl,
  qrImageSrc,
  appName = "Poker Rules",
}: Props) {
  const url = useMemo(() => appUrl ?? window.location.origin + "/", [appUrl]);

  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"share" | "install">("share");
  const [installEvt, setInstallEvt] = useState<InstallPromptEvent | null>(null);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Capture the install prompt (Chrome/Edge Android/Desktop)
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    }
  }

  async function doInstall() {
    if (!installEvt) return;
    await installEvt.prompt();
    // You can read the outcome if you want:
    // const choice = await installEvt.userChoice;
    setInstallEvt(null);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Share and install"
      onMouseDown={(e) => {
        // click outside to close
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl text-slate-950 dark:text-white bg-white dark:bg-slate-950 shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <div className="text-lg font-semibold">{appName}</div>
            <div className="text-xs text-slate-500">Share & Install</div>
          </div>
          <button
            className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`flex-1 px-4 py-2 text-sm ${
              tab === "share"
                ? "font-semibold border-b-2 border-slate-900"
                : "text-slate-600"
            }`}
            onClick={() => setTab("share")}
          >
            Share
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm ${
              tab === "install"
                ? "font-semibold border-b-2 border-slate-900"
                : "text-slate-600"
            }`}
            onClick={() => setTab("install")}
          >
            Install
          </button>
        </div>

        {tab === "share" ? (
          <div className="p-4">
            <div className="flex flex-col items-center">
              <div className="rounded-xl border p-3 bg-white">
                <img
                  src={qrImageSrc}
                  alt="QR code to open the app"
                  className="h-56 w-56 object-contain"
                />
              </div>

              <div className="mt-4 w-full">
                <div className="text-xs text-slate-500">App link</div>
                <div className="mt-1 rounded-xl border p-3 font-mono text-xs break-all">
                  {url}
                </div>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={copyLink}
                    className="flex-1 rounded-xl text-sm bg-linear-to-r from-red-600 to-yellow-600 hover:from-yellow-500 hover:to-red-500"
                  >
                    {copied ? "Copied!" : "Copy link"}
                  </button>

                  <button
                    onClick={() => setTab("install")}
                    className="flex-1 rounded-xl border py-2 text-sm hover:bg-slate-50"
                  >
                    Install steps
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-600">
                  Tip: Scan this QR code with your phone camera to open the app
                  instantly.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {installEvt ? (
              <button
                onClick={doInstall}
                className="w-full rounded-xl bg-slate-900 text-white py-2 text-sm hover:bg-slate-800"
              >
                Install {appName}
              </button>
            ) : (
              <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-700">
                If you don’t see an Install button, use the steps below
                (device/browser dependent).
              </div>
            )}

            <div className="space-y-3 text-sm text-slate-800">
              <div>
                <div className="font-semibold">iPhone / iPad (Safari)</div>
                <ol className="list-decimal ml-5 mt-1 space-y-1 text-slate-700">
                  <li>Open the app link in Safari.</li>
                  <li>
                    Tap the <span className="font-semibold">Share</span> button
                    (square with arrow).
                  </li>
                  <li>
                    Select{" "}
                    <span className="font-semibold">Add to Home Screen</span>.
                  </li>
                  <li>
                    Tap <span className="font-semibold">Add</span>.
                  </li>
                </ol>
              </div>

              <div>
                <div className="font-semibold">Android (Chrome)</div>
                <ol className="list-decimal ml-5 mt-1 space-y-1 text-slate-700">
                  <li>Open the app link in Chrome.</li>
                  <li>Tap the menu (⋮).</li>
                  <li>
                    Select <span className="font-semibold">Install app</span> or{" "}
                    <span className="font-semibold">Add to Home screen</span>.
                  </li>
                  <li>Confirm.</li>
                </ol>
              </div>

              <div>
                <div className="font-semibold">Desktop (Chrome / Edge)</div>
                <ol className="list-decimal ml-5 mt-1 space-y-1 text-slate-700">
                  <li>Open the app link.</li>
                  <li>
                    Look for the <span className="font-semibold">Install</span>{" "}
                    icon in the address bar (or browser menu).
                  </li>
                  <li>Click Install and confirm.</li>
                </ol>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              After installing, the app opens like a native app and can work
              offline after the first load.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
