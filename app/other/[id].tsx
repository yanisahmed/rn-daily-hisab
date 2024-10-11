// app/other/index.js
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useExpense from "../useExpense";

const OtherScreen = () => {
  const { id } = useLocalSearchParams();
  const { expenses } = useExpense();

  // Separate expenses into credit and debit
  const creditExpenses = expenses.filter((expense) => expense.amount > 0);
  const debitExpenses = expenses.filter((expense) => expense.amount < 0);

  // Calculate totals
  const totalCredits = creditExpenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );
  const totalDebits = debitExpenses.reduce(
    (acc, expense) => acc + Math.abs(expense.amount),
    0
  );
  const netTotal = totalCredits - totalDebits;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User: {id}</Text>
      <Text style={styles.subHeading}>Account Number: 1234567890</Text>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Balance:</Text>
        <Text style={styles.totalAmount}>${netTotal.toFixed(2)}</Text>
      </View>

      <View style={styles.tallyContainer}>
        <Text style={styles.sectionTitle}>Tally Balance Sheet</Text>

        <View style={styles.row}>
          <Text style={styles.columnTitle}>Date</Text>
          <Text style={styles.columnTitle}>Description</Text>
          <Text style={styles.columnTitle}>Credit</Text>
          <Text style={styles.columnTitle}>Debit</Text>
        </View>

        <FlatList
          data={creditExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.date}</Text>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>${item.amount.toFixed(2)}</Text>
              <Text style={styles.cell}>-</Text>
            </View>
          )}
        />

        <FlatList
          data={debitExpenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.date}</Text>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>-</Text>
              <Text style={styles.cell}>
                ${Math.abs(item.amount).toFixed(2)}
              </Text>
            </View>
          )}
        />

        {/* Totals Section */}
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Total Credits:</Text>
          <Text style={styles.totalAmount}>${totalCredits.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Total Debits:</Text>
          <Text style={styles.totalAmount}>${totalDebits.toFixed(2)}</Text>
        </View>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Net Total:</Text>
          <Text style={styles.totalAmount}>${netTotal.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 18,
    color: "#6c757d",
    marginBottom: 16,
  },
  totalContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 24,
    color: "#28a745",
    fontWeight: "bold",
  },
  tallyContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 1,
    padding: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  columnTitle: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    marginTop: 8,
  },
  totalLabel: {
    fontWeight: "bold",
  },
});

export default OtherScreen;
