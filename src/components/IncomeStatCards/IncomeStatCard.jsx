import "./IncomeStatCard.css";

function IncomeStatCard({ category, amount }) {
  const formattedCategory = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Unknown";

  return (
    <div className="income-stat-card">
      <p>{formattedCategory} Revenue</p>
      <h2>₹{amount.toLocaleString("en-IN")}</h2>
    </div>
  );
}

export default IncomeStatCard;
