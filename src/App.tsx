import React from "react";
import RulebookList from "./components/RulebookList";

// const RULEBOOK_SLUG = "seminole-2024";

function App() {
  // Keep useRulebook here to preserve any global rulebook-loading behavior
  // useRulebook(RULEBOOK_SLUG);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">
        Seminole Tribe of Florida Seminole Gaming Poker Rule Book / Procedures
      </h1>
      <div className="mt-10">
        <RulebookList />
      </div>
    </div>
  );
}

export default App;
