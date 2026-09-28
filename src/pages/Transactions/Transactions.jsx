import { useSelector } from "react-redux";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../TransactionList/TransactionList";
import "./Transactions.css";
import { useState } from "react";

function Transactions() {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [transactionType, setTransactionType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const transactions = useSelector((state) => state.transactions.transactions);

  const filteredTransactions = transactions.filter((transaction) => {
    const searchValue = searchTerm.toLowerCase().trim();

    const matchesSearch =
      !searchValue ||
      transaction.description?.toLowerCase().includes(searchValue) ||
      transaction.category?.toLowerCase().includes(searchValue) ||
      transaction.type?.toLowerCase().includes(searchValue);

    const matchesType =
      transactionType === "all" || transaction.type === transactionType;

    return matchesSearch && matchesType;
  });

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
        emptyMessage={
          searchTerm
            ? "No transactions match your search."
            : "No transactions found."
        }
      />
    </div>
  );
}

export default Transactions;
