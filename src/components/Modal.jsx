import "./styles/Modal.css";
export default function Modal(props) {
  const { open, onClose } = props;
  if (open !== 2) return null;
  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modalContainer"
      >
        <h2 className="modal-header">Welcome to SonnetMuse</h2>
        <p className="closeBtn" onClick={onClose}>
          x
        </p>
        <div className="content">
          <p className="modal-data">
            SonnetMuse helps you to write poems and sonnets-{" "}
          </p>
          <p className="modal-data">
            • Click on the settings icon to customise your poem structure or use
            a predefined sonnet style.
          </p>
          <p className="modal-data">
            • SonnetMuse checks your poem structure and suggests you rhyming
            words.
          </p>
          <p className="modal-data">
            • Click on the suggested words to search their meanings. You can
            also manually search for meanings.
          </p>
          <p className="modal-data">
            • Correct Lines are shown in Blue and Italics while wrong lines are
            shown in red.
          </p>
          <p className="modal-data">
            • If everything's good, click on the download button(should be
            green) to download .pdf of your poem.
          </p>
        </div>
        <div className="content">
          <p className="modal-data">
            A sonnet is a poem that has 14 lines each of 10 syllables.
          </p>
          <p className="modal-data">It follows the rhyme scheme-</p>
          <p
            className="modal-data"
            style={{
              textAlign: "center",
              fontFamily: "monospace",
              margin: "0.25rem 0",
              fontSize: "1.5rem",
            }}
          >
            ABAB CDCD EFEF GG
          </p>
          <p className="modal-data">
            This is also called Shakespearean Sonnet.
          </p>
          <p className="modal-data">
            <a
              className="modal-example"
              href="https://www.poetryfoundation.org/poems/45087/sonnet-18-shall-i-compare-thee-to-a-summers-day"
            >
              ▶Example
            </a>
          </p>
        </div>
        <a
          href="https://github.com/MJK1mjk/SonnetMuse.git"
          className="Repo-Link"
        >
          Github Repo
        </a>
      </div>
    </div>
  );
}
