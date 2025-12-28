import React from "react";
import { Route, Routes } from "react-router";
import RulebookList from "./components/RulebookList";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/rules" element={<RulebookList />} />
      </Route>
    </Routes>
  );
}

export default App;
