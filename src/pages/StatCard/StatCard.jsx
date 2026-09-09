import "./StatCard.css";

function StatCard({ title, amount }) {
  return (
    <div className="summary-card">
      <p>{title}</p>
      <h2>{amount}</h2>
    </div>
  );
}

export default StatCard;