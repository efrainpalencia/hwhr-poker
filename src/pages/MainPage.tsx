import React from "react";
import pokerTableSrc from "../assets/images/poker-table.png";

export default function MainPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">
        Seminole Gaming: Poker Rule Book / Procedures{" "}
        <span className="italic text-red-600">3rd Revised</span>
      </h1>
      <img src={pokerTableSrc} alt="Poker Table" />
    </div>
  );
}
