import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./ExpenseChart.css";

function ExpenseChart({ expenses }) {
  const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
  ];
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
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value) => `₹${value.toLocaleString("en-IN")}`} />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
