import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./ExpenseChart.css";

const CHART_HEIGHT = 300;

const CHART_MARGIN = {
  top: 10,
  right: 20,
  left: 10,
  bottom: 10,
};

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const formatCurrency = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

function ExpenseChart({ expenses }) {
  const expenseByCategory = expenses.reduce((accumulator, transaction) => {
    const { category, amount } = transaction;

    accumulator[category] = (accumulator[category] || 0) + amount;

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

      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart data={chartData} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip formatter={formatCurrency} />

          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
