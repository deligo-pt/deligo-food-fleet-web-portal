/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

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

    colId: { width: "18%" },
    colDate: { width: "14%" },
    colPartner: { width: "22%" },
    colPeriod: { width: "20%" },
    colAmount: { width: "14%", textAlign: "right" },
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

export function PaymentPdf({ payments }: { payments: any[] }) {
    const totalAmount = payments.reduce(
        (sum, p) => sum + Number(p.amount || 0),
        0
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
                <Text style={styles.title}>Payment History</Text>

                {/* SUMMARY */}
                <View style={styles.summary}>
                    <Text>Total Transactions: {payments.length}</Text>
                    <Text>Total Amount: € {totalAmount.toFixed(2)}</Text>
                </View>

                {/* TABLE HEADER */}
                <View style={styles.tableHeader}>
                    <Text style={styles.colId}>Transaction</Text>
                    <Text style={styles.colDate}>Date</Text>
                    <Text style={styles.colPartner}>Partner</Text>
                    <Text style={styles.colPeriod}>Period</Text>
                    <Text style={styles.colAmount}>Amount</Text>
                    <Text style={styles.colStatus}>Status</Text>
                </View>

                {/* TABLE ROWS */}
                {payments.map((p) => (
                    <View key={p.id} style={styles.tableRow}>
                        <Text style={styles.colId}>{p.id}</Text>
                        <Text style={styles.colDate}>{p.date}</Text>
                        <Text style={styles.colPartner}>{p.partner}</Text>
                        <Text style={styles.colPeriod}>{p.period}</Text>
                        <Text style={styles.colAmount}>€ {p.amount}</Text>
                        <Text style={[styles.colStatus, getStatusStyle(p.status)]}>
                            {p.status}
                        </Text>
                    </View>
                ))}

                {/* FOOTER */}
                <Text style={styles.footer}>
                    Generated on {new Date().toLocaleDateString()}
                </Text>
            </Page>
        </Document>
    );
}
