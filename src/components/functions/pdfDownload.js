import { jsPDF } from "jspdf";

const pdf = (e, poem, download) => {
  e.preventDefault();
  if (!download) {
    alert("The Sonnet is not completed or properly written");
    return;
  }
  const doc = new jsPDF({ orientation: "potrait", unit: "mm", format: "a4" });
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  doc.setTextColor(0o0, 23, 66);

  const backgroundColor = "#f8f8f8";
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, width, height, "F");
  const dotRadius = 0.2;
  const dotColor = "#d9bf77";
  doc.setFillColor(dotColor);
  for (let y = 5; y < height; y += 7) {
    let shift = (Math.ceil(y / 7) % 2) * 3.5;
    for (let i = 5; i < width; i += 7) {
      doc.circle(i + shift, y, dotRadius, "F");
    }
  }

  const top = document.getElementById("title");
  const lines = document.getElementsByClassName("InputField");
  const author = document.getElementById("author");

  doc.setFont("helvetica", "normal", "bold");
  const title = top.value || lines[0].value;
  let fontSize = 30;
  doc.setFontSize(fontSize);
  const titleWidth = doc.getTextWidth(title);
  const titleX = (width - titleWidth) / 2;
  doc.text(titleX, 20, title);
  doc.setDrawColor(0o0, 23, 66);
  doc.setLineWidth(0.5);
  doc.line(titleX - 5, 22, width - titleX + 5, 22);

  doc.setFont("Times", "italic", "normal");
  fontSize = 20;
  doc.setFontSize(fontSize);
  let ySpace = 40;
  if (poem === 2) {
    for (let i = 0; i < lines.length; i++) {
      if (i === 8) ySpace += 5;
      if (i === 4 || i === 11) ySpace += 2.5;
      if (i < 8) doc.text(10, i * 10 + ySpace, lines[i].value);
      else
        doc.text(width - 10, i * 10 + ySpace, lines[i].value, {
          align: "right",
        });
    }
  } else {
    for (let i = 0; i < lines.length; i++) {
      if ((i % 4 == 0) & i) ySpace += 5;
      if (Math.floor(i / 4) % 2 == 0)
        doc.text(10, i * 10 + ySpace, lines[i].value);
      else
        doc.text(width - 10, i * 10 + ySpace, lines[i].value, {
          align: "right",
        });
    }
  }

  doc.setFont("Times", "normal", "bold");
  const name = author.value || "Anonymous";
  doc.text(`-${name}`, width - 10, ySpace + 10 * lines.length + 20, {
    align: "right",
  });
  doc.save(`${title}.pdf`);
};

export default pdf;
