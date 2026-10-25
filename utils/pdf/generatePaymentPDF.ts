/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRiderSettlement } from "@/types/payout.type";
import { formatPrice } from "@/utils/formatPrice";
import { format } from "date-fns";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generatePaymentPDF = (payment: TRiderSettlement) => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 15;

  const partner = payment.deliveryPartnerId;
  const manager = payment.fleetManagerId;

  const partnerName = `${partner?.name?.firstName || ""} ${partner?.name?.lastName || ""}`.trim() || "—";
  const managerName = `${manager?.name?.firstName || ""} ${manager?.name?.lastName || ""}`.trim() || "—";
  const totalAmount = payment.totalAmount ?? 0;
  const settlementId = payment._id?.slice(-10).toUpperCase() || "—";

  // ── Header ──────────────────────────────────────────────
  const headerTop = 15;
  const logoSize = 18;

  try {
    doc.addImage(
      "/deligoLogo.png",
      "PNG",
      marginX,
      headerTop,
      logoSize,
      logoSize
    );
  } catch {
    // logo optional
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(220, 49, 115);
  doc.text("DeliGo", marginX, headerTop + logoSize + 5);

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

  // Right title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(
    "Comprovativo de Liquidação do Estafeta",
    pageWidth - marginX,
    headerTop + 5,
    { align: "right" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `Gerado em: ${format(new Date(), "yyyy-MM-dd")}`,
    pageWidth - marginX,
    headerTop + 11,
    { align: "right" }
  );

  // Divider
  const dividerY = Math.max(headerTop + logoSize, currentY) + 13;
  doc.setDrawColor(220, 49, 115);
  doc.line(marginX, dividerY, pageWidth - marginX, dividerY);

  // ── Settlement summary ──────────────────────────────────
  let y = dividerY + 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Resumo da liquidação", marginX, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(`Estafeta: ${partnerName}`, marginX, y);
  y += 5;
  doc.text(`ID Estafeta: ${partner?.userId || "—"}`, marginX, y);
  y += 5;
  if (partner?.email) {
    doc.text(`Email: ${partner.email}`, marginX, y);
    y += 5;
  }
  if (partner?.contactNumber) {
    doc.text(`Contacto: ${partner.contactNumber}`, marginX, y);
    y += 5;
  }
  doc.text(`ID Liquidação: ${settlementId}`, marginX, y);
  y += 5;
  doc.text(`Iniciado por: ${managerName} (${manager?.userId || "—"})`, marginX, y);
  y += 5;
  doc.text(`Montante total: €${formatPrice(totalAmount)}`, marginX, y);
  y += 5;
  doc.text(
    `Estado: ${payment.status === "PAID" ? "Pago" : payment.status}`,
    marginX,
    y
  );

  // ── Orders breakdown table ──────────────────────────────
  y += 12;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Detalhe por encomenda", marginX, y);
  y += 4;

  const breakdownRows =
    payment.breakdown?.map((item) => [
      item.orderId || "—",
      `€${formatPrice(item.grossEarnings)}`,
      `€${formatPrice(item.fleetFee)}`,
      `€${formatPrice(item.riderSlice)}`,
    ]) || [];

  // Fallback: if no breakdown, show orderIds only
  if (breakdownRows.length === 0 && payment.orderIds?.length) {
    payment.orderIds.forEach((o) => {
      breakdownRows.push([
        o.orderId || o._id || "—",
        "—",
        "—",
        "—",
      ]);
    });
  }

  autoTable(doc, {
    startY: y,
    head: [["Nº Encomenda", "Ganhos Brutos", "Taxa Frota", "Parte Estafeta"]],
    body:
      breakdownRows.length > 0
        ? breakdownRows
        : [["—", "—", "—", "—"]],
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

  // ── Included orders (status + date) ─────────────────────
  let afterBreakdownY = (doc as any).lastAutoTable.finalY + 10;

  if (payment.orderIds?.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Encomendas incluídas", marginX, afterBreakdownY);
    afterBreakdownY += 4;

    autoTable(doc, {
      startY: afterBreakdownY,
      head: [["Nº Encomenda", "Estado", "Data"]],
      body: payment.orderIds.map((o) => [
        o.orderId || "—",
        o.orderStatus || "—",
        o.createdAt ? format(new Date(o.createdAt), "yyyy-MM-dd") : "—",
      ]),
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

    afterBreakdownY = (doc as any).lastAutoTable.finalY + 12;
  }

  // ── Final amount ────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(
    `Valor a pagar ao estafeta: €${formatPrice(totalAmount)}`,
    pageWidth - marginX,
    afterBreakdownY,
    { align: "right" }
  );

  // ── Footer note ─────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80);
  doc.text(
    "Este é um extrato de liquidação automatizado para estafetas da DeliGo Food.",
    pageWidth / 2,
    270,
    { align: "center" }
  );
  doc.setTextColor(0);

  // Page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 290, {
      align: "center",
    });
  }

  // Filename
  const safeName = partnerName.replace(/\s+/g, "_") || "rider";
  doc.save(
    `${format(new Date(), "yyyy-MM-dd_HH-mm-ss")}_${partner?.userId || "DP"}_${safeName}_${totalAmount}€.pdf`
  );
};