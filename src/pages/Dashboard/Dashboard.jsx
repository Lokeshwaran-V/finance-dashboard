import { useState } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import StatCard from "../StatCard/StatCard";
import IncomeStatCard from "../../components/IncomeStatCards/IncomeStatCard";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import TransactionList from "../TransactionList/TransactionList";
import GoalSummary from "../../components/GoalSummary/GoalSummary";

import "./Dashboard.css";

function Dashboard() {
  const transactions = useSelector(
    (state) => state.transactions.transactions,
  );

  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const selectedYear = selectedMonth.getFullYear();
  const selectedMonthNumber = selectedMonth.getMonth() + 1;

  const monthlyTransactions = transactions.filter((transaction) => {
    if (!transaction.date) return false;

    const [year, month] = transaction.date.split("-").map(Number);

    return year === selectedYear && month === selectedMonthNumber;
  });

  const incomeTransactions = monthlyTransactions.filter(
    (transaction) => transaction.type === "income",
  );

  const expenseTransactions = monthlyTransactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const totalIncome = incomeTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const totalExpenses = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  const allIncome = transactions.reduce(
    (total, transaction) =>
      transaction.type === "income"
        ? total + transaction.amount
        : total,
    0,
  );

  const allExpenses = transactions.reduce(
    (total, transaction) =>
      transaction.type === "expense"
        ? total + transaction.amount
        : total,
    0,
  );

  const totalBalance = allIncome - allExpenses;
  const savings = totalIncome - totalExpenses;

  const incomeByCategory = incomeTransactions.reduce(
    (accumulator, transaction) => {
      const { category, amount } = transaction;

      accumulator[category] = (accumulator[category] || 0) + amount;

      return accumulator;
    },
    {},
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Here's your financial overview.</p>
        </div>

        <div className="month-picker">
          <DatePicker
            selected={selectedMonth}
            onChange={setSelectedMonth}
            dateFormat="MMMM yyyy"
            showMonthYearPicker
            onChangeRaw={(event) => event.preventDefault()}
          />
        </div>
      </div>

      <div className="summary-cards">
        <StatCard
          title="Total Balance"
          amount={`₹${totalBalance.toLocaleString("en-IN")}`}
        />

        <StatCard
          title="Total Income"
          amount={`₹${totalIncome.toLocaleString("en-IN")}`}
        />

        <StatCard
          title="Expenses"
          amount={`₹${totalExpenses.toLocaleString("en-IN")}`}
        />

        <StatCard
          title="Savings"
          amount={`₹${savings.toLocaleString("en-IN")}`}
        />
      </div>

      <div className="income-stat-cards">
        {Object.entries(incomeByCategory).map(([category, amount]) => (
          <IncomeStatCard
            key={category}
            category={category}
            amount={amount}
          />
        ))}
      </div>

      {expenseTransactions.length > 0 && (
        <ExpenseChart expenses={expenseTransactions} />
      )}

      <TransactionList
        transactions={monthlyTransactions.slice(0, 5)}
        showViewAll
        emptyMessage="No transactions found for this month."
      />

      <GoalSummary />
    </div>
  );
}

export default Dashboard;