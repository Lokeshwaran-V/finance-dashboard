import { useSelector } from "react-redux";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../TransactionList/TransactionList";
import "./Transactions.css";
import { useState } from "react";

function Transactions() {
  const [editingTransaction, setEditingTransaction] = useState(null);

  const transactions = useSelector((state) => state.transactions.transactions);

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

      <TransactionList
        transactions={transactions}
        onEdit={setEditingTransaction}
      />
    </div>
  );
}

export default Transactions;
