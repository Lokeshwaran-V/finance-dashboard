import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction as deleteTransactionFromRedux } from "../../store/transactionSlice";
import { deleteTransaction } from "../services/transactionService";
import "./TransactionList.css";
import { Link } from "react-router-dom";

function TransactionList({
  transactions = [],
  showViewAll = false,
  onEdit,
  emptyMessage = "No transactions found.",
}) {
  const dispatch = useDispatch();

  // const transactions = useSelector((state) => state.transactions.transactions);

  const handleDelete = (id) => {
    // Remove from localStorage
    deleteTransaction(id);

    // Remove from Redux
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
              <div>
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

                <button onClick={() => onEdit(transaction)}>Edit</button>

                <button onClick={() => handleDelete(transaction.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
