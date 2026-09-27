import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ExpenseChart.css";

function ExpenseChart({ expenses }) {
  const expenseByCategory = expenses.reduce((accumulator, transaction) => {
    const category = transaction.category;

    accumulator[category] = (accumulator[category] || 0) + transaction.amount;

    return accumulator;
  }, {});

  const chartData = Object.entries(expenseByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    }),
  );

  return (
    <div className="expense-chart">
      <h2>Expenses by Category</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />

          <Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
