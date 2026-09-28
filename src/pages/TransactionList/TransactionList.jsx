import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { deleteTransaction as deleteTransactionFromRedux } from "../../store/transactionSlice";
import { deleteTransaction } from "../services/transactionService";

import "./TransactionList.css";

function TransactionList({
  transactions = [],
  showViewAll = false,
  onEdit,
  emptyMessage = "No transactions found.",
}) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) return;

    deleteTransaction(id);
    dispatch(deleteTransactionFromRedux(id));
  };

  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <h2>Recent Transactions</h2>

        {showViewAll && (
          <Link className="view-all-button" to="/transactions">
            View All
          </Link>
        )}
      </div>

      <div className="transactions">
        {transactions.length === 0 ? (
          <p className="empty-state">{emptyMessage}</p>
        ) : (
          transactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div className="transaction-item-description">
                <h3>{transaction.description || transaction.category}</h3>

                <p>
                  {transaction.category} · {transaction.date}
                </p>
              </div>

              <div className="transaction-actions">
                <span className={transaction.type}>
                  {transaction.type === "income" ? "+" : "-"}₹
                  {transaction.amount.toLocaleString("en-IN")}
                </span>

                <div className="transaction-actions-buttons">
                  {onEdit && (
                    <button type="button" onClick={() => onEdit(transaction)} className="edit-button">
                      Edit
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDelete(transaction.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
