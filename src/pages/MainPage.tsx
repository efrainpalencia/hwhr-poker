import React from "react";
import OnboardingModal from "../components/OnboardModal";
import pic1 from "../assets/images/Picture1.jpg";
import pic2 from "../assets/images/Picture2.jpg";
import pic3 from "../assets/images/Picture3.jpg";
import pic4 from "../assets/images/Picture4.jpg";
import pic5 from "../assets/images/Picture5.jpg";
import pic6 from "../assets/images/Picture6.jpg";
import { Link, useNavigate } from "react-router";

const ONBOARDING_KEY = "ppp_onboarding_seen_v1";

export default function MainPage() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const seen = localStorage.getItem(ONBOARDING_KEY);
    if (!seen) setOpen(true);
  }, []);

  const dontShowAgain = () => {
    localStorage.setItem(ONBOARDING_KEY, "1");
  };

  const goToRulebook = () => {
    navigate("/rules");
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Seminole Tribe of Florida</h1>
      <h1 className="text-2xl font-bold mb-4">d/b/a</h1>
      <h1 className="text-2xl font-bold mb-4">Seminole Gaming</h1>
      <h1 className="text-2xl font-bold mb-4">Poker Rule Book / Procedures</h1>
      <div>
        <button
          onClick={goToRulebook}
          className="btn bg-linear-to-r from-red-600 to-yellow-600 hover:from-yellow-500 hover:to-red-500 text-xl font-bold justify-center p-1.5 px-12 rounded-xl"
        >
          View Rulebook
        </button>
      </div>
      <h1 className="text-2xl italic m-6">
        <span className="text-red-700">♥ </span> ♣
        <span className="text-red-700"> ♦</span> ♠
      </h1>
      <h1 className="text-2xl italic">5th Revised Draft</h1>
      <h2 className="m-3">Covered Casinos</h2>
      <div className="grid grid-cols-3 align-baseline gap-4 my-6">
        <Link to="/rules">
          <img className="rounded-lg" src={pic1} alt="Hard Rock Tampa" />
        </Link>
        <Link to="/rules">
          <img className="rounded-lg" src={pic2} alt="Hard Rock Hollywood" />
        </Link>
        <Link to="/rules">
          <img className="rounded-lg" src={pic3} alt="Seminole Brighton" />
        </Link>
        <Link to="/rules">
          <img className="rounded-lg" src={pic4} alt="Seminole Coconut Creek" />
        </Link>
        <Link to="/rules">
          <img className="rounded-lg" src={pic5} alt="Seminole Hollywood" />
        </Link>
        <Link to="/rules">
          <img className="rounded-lg" src={pic6} alt="Seminole Imokalee" />
        </Link>
      </div>
      <div className="my-3 h-px w-full text-slate-800 dark:text-slate-300" />
      <div className="grid grid-cols-1 place-items-center gap-3 mt-12">
        <p>This document is inteded for use by casino employees.</p>
        <p>
          Seminole Tribe of Florida – Poker – Intended Recipient: Seminole
          Gaming Commission
        </p>
        <p>Approval Date: 09-23-2025</p>
        <p>Attention:</p>
        <p>
          This document contains{" "}
          <span className="text-yellow-400">
            PRIVILEGED AND CONFIDENTIAL INFORMATION
          </span>{" "}
          intended only for the use of the individual(s) named above. If you are
          not an intended recipient of this document, you are hereby notified
          that any dissemination or copying of this document is strictly
          prohibited
        </p>
      </div>
      <OnboardingModal
        open={open}
        onClose={() => setOpen(false)}
        onDontShowAgain={dontShowAgain}
      />
    </div>
  );
}
