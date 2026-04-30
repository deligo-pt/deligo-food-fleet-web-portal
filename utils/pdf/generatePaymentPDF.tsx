import { PayoutData } from "@/types/payment.type";
import { formatPrice } from "@/utils/formatPrice";
import { removeUnderscore } from "@/utils/formatter";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePaymentPDF = (payment: PayoutData) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 15;

  // header section
  const headerTop = 15;
  const logoSize = 18;

  // Logo
  doc.addImage(
    "/deligoLogo.png",
    "PNG",
    marginX,
    headerTop,
    logoSize,
    logoSize,
  );

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(220, 49, 115);
  doc.text("DeliGo", marginX, headerTop + logoSize + 5);

  // Company info
  const textX = marginX + logoSize + 6;
  let currentY = headerTop + 5;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text("PIXELMIRACLE, LDA", textX, currentY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  currentY += 5;
  doc.text("Avenida do Brasil, nº 43, 6º D", textX, currentY);

  currentY += 4;
  doc.text("1700-062 Lisboa, Portugal", textX, currentY);

  currentY += 4;
  doc.text("NIF: 518758176", textX, currentY);

  currentY += 4;
  doc.text("Email: contact@deligo.pt", textX, currentY);

  currentY += 4;
  doc.setTextColor(220, 49, 115);
  doc.text("www.deligo.pt", textX, currentY);
  doc.setTextColor(0);

  // Right meta
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(
    "Extrato de Pagamento do Gestor de Frota",
    pageWidth - marginX,
    headerTop + 5,
    {
      align: "right",
    },
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `Gerado em: ${format(new Date(), "yyyy-MM-dd")}`,
    pageWidth - marginX,
    headerTop + 11,
    { align: "right" },
  );

  // divider
  const dividerY = Math.max(headerTop + logoSize, currentY) + 13;

  doc.setDrawColor(220, 49, 115);
  doc.line(marginX, dividerY, pageWidth - marginX, dividerY);

  // Payment summary
  let y = dividerY + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Resumo de pagamento", marginX, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `Nome do Gestor de Frota: ${payment.userId?.name?.firstName} ${payment.userId?.name?.lastName}`,
    marginX,
    y,
  );
  y += 5;
  doc.text(`ID de pagamento: ${payment.payoutId}`, marginX, y);
  y += 5;
  doc.text(`ID de referência do banco: ${payment.bankReferenceId}`, marginX, y);
  y += 5;
  doc.text(`Montante total: €${formatPrice(payment.amount)}`, marginX, y);

  // Bank Details
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Detalhes da Conta Bancária", marginX, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(`Nome do banco: ${payment.bankDetails?.bankName}`, marginX, y);
  y += 5;
  doc.text(
    `Titular da Conta: ${payment.bankDetails?.accountHolderName}`,
    marginX,
    y,
  );
  y += 5;
  doc.text(
    `Número de conta: ${payment.bankDetails?.accountNumber}`,
    marginX,
    y,
  );
  y += 5;
  doc.text(`IBAN: ${payment.bankDetails?.iban}`, marginX, y);
  y += 5;
  doc.text(`Código SWIFT: ${payment.bankDetails?.swiftCode}`, marginX, y);

  // Payout Details
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Detalhes de pagamento", marginX, y);

  y += 4;

  autoTable(doc, {
    startY: y,
    head: [["Data", "Tipo de Pagamento", "Descrição", "Valor", "Estatuto"]],
    body: [
      [
        format(payment.createdAt, "dd/MM/yyyy"),
        removeUnderscore(payment.paymentMethod),
        payment.remarks || "-",
        `€${formatPrice(payment.amount)}`,
        payment.status,
      ],
    ],
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [220, 49, 115],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { left: marginX, right: marginX },
  });

  y += 25;
  // doc.setDrawColor(220, 49, 115);
  // doc.line(pageWidth - marginX - 400, y, pageWidth - marginX, y + 2);

  // y += 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(
    `Valor Pago: €${formatPrice(payment.amount)}`,
    pageWidth - marginX,
    y,
    { align: "right" },
  );

  // Auto Generated note
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Este é um extrato de pagamento automatizado para os Gestores de Frota da DeliGo Food.",
    pageWidth / 2,
    240,
    {
      align: "center",
    },
  );

  // footer
  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 290, {
      align: "center",
    });
  }

  doc.save(
    `payment_statement_${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}.pdf`,
  );
};
