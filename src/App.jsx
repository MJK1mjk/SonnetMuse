import { useState, useEffect, useRef } from "react";
import InputField from "./components/InputField";
import Tabs from "./components/Tabs";
import Title from "./components/Title";
import Author from "./components/Author";
import Modal from './Modal';
import scheme from "./components/rhymingScheme";
import rhymesWith from "rhymes-with";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [rhymes, setRhymes] = useState(new Array(14).fill(""));
  const [valid, setValid] = useState(new Array(14).fill(false));
  const [active, setActive] = useState(-1);
  const [openModal, setOpenModal] = useState(true);
  const [download, setDownload] = useState(false);

  useEffect(() => {
    let newValid = [...valid];
    let check=true;
    for (let i = 0; i < 14; i++) {
      if (rhymes[i]) {
        let word = rhymes[scheme[i]];
        if (word) {
          const check = rhymesWith(rhymes[i], word, {
            allPronounciations: true,
          });
          if (check) newValid[i] = true;
          else newValid[i] = false;
        }
      }
      check&=newValid[i];
    }
    setValid(newValid);
    setDownload(check);
  }, [rhymes]);

  const changeRhyme = (val, id) => {
    let arr = [...rhymes];
    if (arr[id] !== val) {
      arr[id] = val;
      setRhymes(arr);
    }
  };

  const changeActive = (val) => setActive(val);

  const inputFields = [];
  for (let i = 0; i < 14; i++) {
    inputFields.push(
      <InputField
        key={`line-${i}`}
        changeRhyme={changeRhyme}
        changeActive={changeActive}
        valid={valid}
        line={i}
      />
    );
  }

  return (
    <div>
      <nav>
        <h1>SonnetMuse</h1>
        <button onClick={() => setOpenModal(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info">
            <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </button>
      </nav>
      <main>
        <div className="Input-Container">
          <Title changeActive={changeActive} />
          {inputFields.map((a) => a)}
          <Author changeActive={changeActive} />
          <button id="download" onClick={pdf} className={`${download ? "" : "hide"}`}>Download</button>
        </div>
        <Tabs rhymes={rhymes} active={active} />
      </main>
      <Modal open={openModal} onClose={() => setOpenModal(false)}/>
    </div>
  );
}

export default App;

function pdf(e){
  e.preventDefault();
  if(download)
  {
    alert("The Sonnet is not completed or properly written");
    return;
  }
  const doc = new jsPDF({ orientation: "potrait", unit: "mm", format: "a4",});
  const width=doc.internal.pageSize.getWidth();
  const height=doc.internal.pageSize.getHeight();
  doc.setTextColor(0o0, 23, 66);
  
  const backgroundColor = "#f8f8f8";
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, width, height, "F");
  const dotRadius = 0.2;
  const dotColor = "#d9bf77";
  doc.setFillColor(dotColor);
  for(let y=5;y<height;y+=7){
    let shift=((Math.ceil(y/7))%2)*3.5;
    for(let i=5;i<width;i+=7){
      doc.circle(i+shift,y, dotRadius, "F");
    }
  }

  const top = document.getElementById('title');
  const lines = document.getElementsByClassName('InputField')
  const author = document.getElementById('author');
  
  doc.setFont("helvetica","normal","bold");
  const title=top.value||lines[0].value;
  let fontSize = 30;
  doc.setFontSize(fontSize);
  const titleWidth = doc.getTextWidth(title);
  const titleX = (width - titleWidth) / 2;
  doc.text(titleX, 20, title);
  doc.setDrawColor(0o0, 23, 66);
  doc.setLineWidth(0.5);
  doc.line(titleX-5, 22, width-titleX+5, 22);
  
  doc.setFont("Times","italic","normal");
  fontSize = 20;
  doc.setFontSize(fontSize);
  let ySpace=0;
  for(let i=0;i<lines.length;i++)
  {
    if(i%4==0&i) ySpace+=2;
    if(((Math.floor(i/4))%2)==0) doc.text(10,40+i*10+ySpace,lines[i].value);
    else doc.text(width-10,40+i*10+ySpace,lines[i].value,{ align: "right" });
  }
  
  doc.setFont("Times","normal","bold");
  const name=author.value||"Anonymous";
  doc.text(`-${name}`, width-10, 190,{ align: "right" });
  doc.save(`${title}.pdf`);
}
