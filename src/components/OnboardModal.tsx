import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onDontShowAgain: () => void;
};

export default function OnboardingModal({
  open,
  onClose,
  onDontShowAgain,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-white dark:bg-slate-950/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-end sm:items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="How to use this app"
          className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-950 shadow-xl"
        >
          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Quick tour
              </h2>
              <button
                onClick={onClose}
                className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
              Here’s how to navigate the main features:
            </p>

            <ul className="mt-4 space-y-3 text-sm text-slate-800 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-slate-800 dark:text-slate-300">
                  1
                </span>
                <div>
                  <div className="font-medium">Home</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    Your starting point—recent activity and shortcuts.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-slate-800 dark:text-slate-300">
                  2
                </span>
                <div>
                  <div className="font-medium">Rulebook</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    Browse rules by section and open details quickly.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-slate-800 dark:text-slate-300">
                  3
                </span>
                <div>
                  <div className="font-medium">Search</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    Type a question to find the best matching rule.
                  </div>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-700 text-slate-800 dark:text-slate-300">
                  4
                </span>
                <div>
                  <div className="font-medium">Share</div>
                  <div className="text-slate-700 dark:text-slate-300">
                    Share the app or a rule via link/QR.
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-5 flex flex-col gap-2">
              <button
                onClick={onClose}
                className="w-full rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-600"
              >
                Got it
              </button>

              <button
                onClick={() => {
                  onDontShowAgain();
                  onClose();
                }}
                className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-400 hover:bg-slate-100"
              >
                Don’t show again
              </button>
            </div>
          </div>

          {/* iPhone safe area padding */}
          <div className="pb-safe" />
        </div>
      </div>
    </div>
  );
}
