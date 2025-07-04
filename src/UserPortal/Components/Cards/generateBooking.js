import jsPDF from "jspdf";
import qrCode from "../../../assets/qrCode.png"; // Adjust the path to your QR code image


export const generateBookingPDF = (name, holder, type, price) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`${name}`, 105, 30, { align: "center" });

  doc.setFontSize(12);
  doc.text(`Booking Holder: ${holder}`, 20, 50);
  doc.text(`Booking Type: ${type}`, 20, 65);
  doc.text(`Booking Price: $${price}`, 20, 80);

  doc.text("Check in using:", 105, 100, { align: "center" });

  // Load the QR image and add it to the PDF
  const qrImg = new Image();
  qrImg.src = qrCode;
  qrImg.onload = () => {
    doc.addImage(qrImg, "PNG", 70, 110, 70, 70); // (x, y, width, height)
    doc.save("booking.pdf");
  };
};

