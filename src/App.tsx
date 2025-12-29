import { Route, Routes } from "react-router";
import RulebookList from "./components/RulebookList";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";
import { SearchPage } from "./pages/SearchPage";
import RuleDetailPage from "./pages/RuleDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/rules" element={<RulebookList />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/rule/:ruleId" element={<RuleDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
