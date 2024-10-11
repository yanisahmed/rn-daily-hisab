// hooks/useExpense.js
import React from "react";

const useExpense = () => {
  const expenses = [
    { id: "1", name: "Groceries", amount: 50, date: "2024-10-07" },
    { id: "2", name: "Rent", amount: 500, date: "2024-10-07" },
    { id: "3", name: "Utilities", amount: 75, date: "2024-10-07" },
  ];
  const str = "hello";
  return {
    expenses,
    str,
  };
};

export default useExpense;
