import React, { useState } from "react";
import Form from "./components/Form";
import SelectTransaction from "./components/SelectTransaction";
import Transaction from "./components/Transaction";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [show, setShow] = useState("");

  const handleAddTransaction = (event) => {
    event.preventDefault();
    const reason = event.target.elements.reason.value;
    const amount = parseFloat(event.target.elements.amount.value);
    const type = event.target.elements.type.value;
    const current = new Date();
    const day = current.getDate().toString().padStart(2, "0");
    const month = (current.getMonth() + 1).toString().padStart(2, "0");
    const year = current.getFullYear();
    const date = `${day}-${month}-${year}`;

    if (reason && amount && type) {
      setTransactions([...transactions, { reason, amount, type, date }]);
      event.target.reset();
    }
  };

  const handleShowChange = (event) => {
    setShow(event.target.value);
  };

  const handleDeleteTransaction = (index) => {
    setTransactions(transactions.filter((transaction, i) => i !== index));
  };

  const filteredTransactions =
    show === ""
      ? transactions
      : transactions.filter((transaction) => transaction.type === show);

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const netSum = totalIncome - totalExpenses;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      const transactionsArray = fileContent
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((line) => {
          const [reason, amount, type, date] = line.split(",");
          return {
            reason,
            amount: parseFloat(amount),
            type,
            date: date,
          };
        });
      setTransactions([...transactions, ...transactionsArray]);
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Remaining: ${netSum.toFixed(2)}</h1>
        <div className="sums-container">
          <h2>Income: ${totalIncome.toFixed(2)}</h2>
          <h2>Expenses: ${totalExpenses.toFixed(2)}</h2>
        </div>
        <Form handleAddTransaction={handleAddTransaction} />
        <SelectTransaction handleShowChange={handleShowChange} />
        <Transaction
          filteredTransactions={filteredTransactions}
          handleDeleteTransaction={handleDeleteTransaction}
        />
        <div className="file">
          <h3>Add transactions from text file</h3>
          <label htmlFor="file">Upload File</label>
          <input
            type="file"
            id="file"
            accept=".txt"
            onChange={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
