import { PayoutData } from "@/types/payment.type";
import { formatPrice } from "@/utils/formatPrice";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: "Helvetica",
  },

  title: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: "bold",
  },

  summary: {
    marginBottom: 12,
    fontSize: 11,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #d1d5db",
    paddingVertical: 6,
    paddingHorizontal: 4,
    fontWeight: "bold",
  },

  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },

  colId: { width: "20%" },
  colDate: { width: "20%" },
  colPartner: { width: "30%" },
  colAmount: { width: "18%", textAlign: "right" },
  colStatus: { width: "12%", textAlign: "right" },

  statusCompleted: {
    color: "#16a34a",
    fontWeight: "bold",
  },
  statusProcessing: {
    color: "#ca8a04",
    fontWeight: "bold",
  },
  statusFailed: {
    color: "#dc2626",
    fontWeight: "bold",
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    fontSize: 9,
    textAlign: "center",
    color: "#6b7280",
  },
});

export function PaymentPdf({ payments }: { payments: PayoutData[] }) {
  const totalAmount = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0,
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "completed":
        return styles.statusCompleted;
      case "processing":
        return styles.statusProcessing;
      case "failed":
        return styles.statusFailed;
      default:
        return {};
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* TITLE */}
        <Text style={styles.title}>Histórico de pagamentos</Text>

        {/* SUMMARY */}
        <View style={styles.summary}>
          <Text>Transação total: {payments.length}</Text>
          <Text>Montante total: € {totalAmount.toFixed(2)}</Text>
        </View>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>
          <Text style={styles.colId}>Transação</Text>
          <Text style={styles.colDate}>Data</Text>
          <Text style={styles.colPartner}>Parceiro de entrega</Text>
          <Text style={styles.colAmount}>Montante</Text>
          <Text style={styles.colStatus}>Estatuto</Text>
        </View>

        {/* TABLE ROWS */}
        {payments.map((p) => (
          <View key={p._id} style={styles.tableRow}>
            <Text style={styles.colId}>{p.payoutId}</Text>
            <Text style={styles.colDate}>
              {format(p.createdAt, "dd/MM/yyyy")}
            </Text>
            <Text style={styles.colPartner}>
              {p.userId?.name?.firstName} {p.userId?.name?.lastName}
            </Text>
            <Text style={styles.colAmount}>€ {formatPrice(p.amount)}</Text>
            <Text style={[styles.colStatus, getStatusStyle(p.status)]}>
              {p.status}
            </Text>
          </View>
        ))}

        {/* FOOTER */}
        <Text style={styles.footer}>
          Gerado em {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  );
}
