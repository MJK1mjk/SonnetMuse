import { useState} from "react";
import Rhymer from "./Rhymer";
import Dictionary from "./Dictionary";
import "./styles/Tabs.css";

export default function Tabs(props) {
  const { rhymes, active , pattern } = props;
  const [activeTab, setActiveTab] = useState("tab1");
  const [word, setWord] = useState("");
  const [search, setSearch] = useState(false);

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
          <Rhymer rhymes={rhymes} active={active} pattern={pattern} setWord={setWord} change={handleTab2} setSearch={setSearch}/>
        ) : (
          <Dictionary word={word} setWord={setWord} search={search} setSearch={setSearch}/>
        )}
      </div>
    </div>
  );
}
