import { useState } from "react";
import Rhymer from "./Rhymer";
import Dictionary from "./Dictionary";
import "./Tabs.css";

export default function Tabs(props) {
  const [activeTab, setActiveTab] = useState("tab1");
  const { rhymes, active } = props;

  const handleTab1 = () => setActiveTab("tab1");
  const handleTab2 = () => setActiveTab("tab2");
  return (
    <div className="Tabs">
      <ul className="nav">
        <li
          className={activeTab === "tab1" ? "active" : ""}
          onClick={handleTab1}
        >
          Rhymes
        </li>
        <li
          className={activeTab === "tab2" ? "active" : ""}
          onClick={handleTab2}
        >
          Meaning
        </li>
      </ul>
      <div className="outlet">
        {activeTab == "tab1" ? (
          <Rhymer rhymes={rhymes} active={active} />
        ) : (
          <Dictionary />
        )}
      </div>
    </div>
  );
}
