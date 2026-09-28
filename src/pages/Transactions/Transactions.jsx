import { useState } from "react";
import { useSelector } from "react-redux";

import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../TransactionList/TransactionList";

import "./Transactions.css";

function Transactions() {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactionType, setTransactionType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = useSelector((state) => state.transactions.transactions);

  const searchValue = searchTerm.toLowerCase().trim();

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      !searchValue ||
      transaction.description?.toLowerCase().includes(searchValue) ||
      transaction.category?.toLowerCase().includes(searchValue) ||
      transaction.type?.toLowerCase().includes(searchValue);

    const matchesType =
      transactionType === "all" || transaction.type === transactionType;

    return matchesSearch && matchesType;
  });

  const emptyMessage =
    searchValue || transactionType !== "all"
      ? "No transactions match your filters."
      : "No transactions found.";

  return (
    <div className="transactions-page">
      <div className="transactions-header">
        <div>
          <h1>Transactions</h1>
          <p>Manage your income and expenses.</p>
        </div>
      </div>

      <TransactionForm
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />

      <div className="transaction-filters">
        <div className="transaction-search">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          value={transactionType}
          onChange={(event) => setTransactionType(event.target.value)}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        onEdit={setEditingTransaction}
        emptyMessage={emptyMessage}
      />
    </div>
  );
}

export default Transactions;
