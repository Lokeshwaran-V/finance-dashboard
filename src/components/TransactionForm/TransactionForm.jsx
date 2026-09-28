import { useEffect, useState } from "react";
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

const INITIAL_FORM_DATA = {
  type: "expense",
  amount: "",
  category: "",
  description: "",
  date: null,
};

const formatDate = (date) => {
  if (!date) return null;

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const parseDate = (dateString) => {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

function TransactionForm({ editingTransaction, setEditingTransaction }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const isIncome = formData.type === "income";

  useEffect(() => {
    if (!editingTransaction) return;

    setFormData({
      type: editingTransaction.type,
      amount: editingTransaction.amount,
      category: editingTransaction.category,
      description: editingTransaction.description,
      date: parseDate(editingTransaction.date),
    });
  }, [editingTransaction]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((previousData) => ({
      ...previousData,
      date,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setEditingTransaction(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const transaction = {
      ...(editingTransaction || {}),
      ...formData,
      amount: Number(formData.amount),
      date: formatDate(formData.date),
    };

    if (editingTransaction) {
      updateTransaction(transaction);
      dispatch(updateTransactionInRedux(transaction));
    } else {
      const newTransaction = {
        id: crypto.randomUUID(),
        ...transaction,
      };

      addTransaction(newTransaction);
      dispatch(addTransactionToRedux(newTransaction));
    }

    resetForm();
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="transaction-form--inputs">
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

        <div className="form-group">
          <label htmlFor="date">Date</label>

          <DatePicker
            id="date"
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date"
            maxDate={new Date()}
            onChangeRaw={(event) => event.preventDefault()}
            required
          />
        </div>

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
        {editingTransaction
          ? "Update Transaction"
          : isIncome
            ? "Add Income"
            : "Add Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;
