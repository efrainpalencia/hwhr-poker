import React from "react";
import { useRulebook } from "./hooks/useRulebook";
import GeneralRulesList from "./components/GeneralRulesList";

const RULEBOOK_SLUG = "seminole-2024";

function App() {
  // Keep useRulebook here to preserve any global rulebook-loading behavior
  useRulebook(RULEBOOK_SLUG);

  return (
    <div style={{ padding: 20 }}>
      <h1>HWHR Poker Rules</h1>
      <GeneralRulesList rulebookSlug={RULEBOOK_SLUG} />
    </div>
  );
}

export default App;
