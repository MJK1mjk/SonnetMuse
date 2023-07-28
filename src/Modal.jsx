import "./Modal.css"
export default function Modal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div onClick={(e) => {e.stopPropagation();}}
            className="modalContainer"
            >
        <h2 className="modal-header">Welcome to SonnetMuse</h2>
        <p className="closeBtn" onClick={onClose}>x</p>
        <div className="content">
          <p className="modal-data">SonnetMuse helps you to write sonnets- </p>
          <p className="modal-data">• It checks your poem structure and suggests you rhyming words.</p>
          <p className="modal-data">• Correct Lines are shown in Blue and Italics while wrong lines are shown in red.</p>
          <p className="modal-data">• There is also a dictionary in case you want to search a words's meaning.</p>
        </div>
        <div className="content">
          <p className="modal-data">A sonnet is a poem that has 14 lines each of 10 syllables.</p>
          <p className="modal-data">It follows the rhyme scheme-</p>
          <p className="modal-data" style={{"textAlign":"center","fontFamily":"monospace","margin":"0.25rem 0","fontSize":"1.5rem"}}>ABAB CDCD EFEF GG</p>
          <p className="modal-data">This is also called Shakespearean Sonnet.</p>
          <p className="modal-data"><a className="modal-example" href="https://www.poetryfoundation.org/poems/45087/sonnet-18-shall-i-compare-thee-to-a-summers-day">▶Example</a></p>
        </div>
      </div>
    </div>
  );
}
