import { jsPDF } from "jspdf";

export const exportToPDF = (title: string, content: string) => {
  const doc = new jsPDF();
  const margin = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = pageWidth - margin * 2;

  // Title
  doc.setFontSize(22);
  doc.text(title.toUpperCase(), margin, 30);

  // Content
  doc.setFontSize(12);
  const splitText = doc.splitTextToSize(content, textWidth);
  doc.text(splitText, margin, 50);

  doc.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
};

export const exportToDoc = (title: string, content: string) => {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};