import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addTransaction as addTransactionToRedux,
  updateTransaction as updateTransactionInRedux,
} from "../../store/transactionSlice";
import {
  addTransaction,
  updateTransaction,
} from "../../pages/services/transactionService";
import "./TransactionForm.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TransactionForm({ editingTransaction, setEditingTransaction }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        type: editingTransaction.type,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        description: editingTransaction.description,
        date: editingTransaction.date
          ? new Date(editingTransaction.date)
          : null,
      });
    }
  }, [editingTransaction]);

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: null,
  });

  const isIncome = formData.type === "income";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const transaction = {
      ...(editingTransaction || {}),
      ...formData,
      amount: Number(formData.amount),
      date: formData.date ? formData.date.toISOString().split("T")[0] : null,
    };

    if (editingTransaction) {
      // Update localStorage
      updateTransaction(transaction);

      // Update Redux
      dispatch(updateTransactionInRedux(transaction));
    } else {
      // Create new transaction
      const newTransaction = {
        id: crypto.randomUUID(),
        ...transaction,
      };

      addTransaction(newTransaction);

      dispatch(addTransactionToRedux(newTransaction));
    }

    // Reset form
    setFormData({
      type: "expense",
      amount: "",
      category: "",
      description: "",
      date: null,
    });

    setEditingTransaction(null);
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="transaction-form--inputs">
        {/* Type */}
        <div className="form-group">
          <label htmlFor="type">Type</label>

          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Amount */}
        <div className="form-group">
          <label htmlFor="amount">Amount</label>

          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label htmlFor="category">Category</label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>

            {isIncome ? (
              <>
                <option value="salary">Salary</option>
                <option value="other">Other</option>
              </>
            ) : (
              <>
                <option value="food">Food</option>
                <option value="shopping">Shopping</option>
                <option value="transport">Transport</option>
                <option value="bills">Bills</option>
                <option value="other">Other</option>
              </>
            )}
          </select>
        </div>

        {/* Date - Expense only */}

        <div className="form-group">
          <label htmlFor="date">Date</label>

          <DatePicker
            id="date"
            selected={formData.date}
            onChange={(date) =>
              setFormData((previousData) => ({
                ...previousData,
                date,
              }))
            }
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            maxDate={new Date()}
            onChangeRaw={(event) => event.preventDefault()}
            required
          />
        </div>

        {/* Description */}
        {(!isIncome || formData.category === "other") && (
          <div className="form-group">
            <label htmlFor="description">Description</label>

            <input
              id="description"
              name="description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        )}
      </div>

      <button type="submit">
        {isIncome ? "Add Income" : "Add Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;
