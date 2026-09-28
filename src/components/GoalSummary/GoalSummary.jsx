import { useSelector } from "react-redux";
import "./GoalSummary.css";

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const formatGoalDate = (dateString) => {
  const date = parseLocalDate(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getDaysRemaining = (dateString) => {
  const targetDate = parseLocalDate(dateString);

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const difference = targetDate - today;

  return Math.ceil(difference / MILLISECONDS_PER_DAY);
};

function GoalSummary() {
  const goals = useSelector((state) => state.goals.goals);

  return (
    <section className="goal-summary">
      <div className="goal-summary-header">
        <h2>Financial Goals</h2>
      </div>

      {goals.length === 0 ? (
        <p className="no-goals">No financial goals added yet.</p>
      ) : (
        <div className="goal-summary-list">
          {goals.map((goal) => {
            const daysRemaining = getDaysRemaining(goal.date);

            return (
              <div className="goal-summary-item" key={goal.id}>
                <div>
                  <h3>{goal.goal}</h3>

                  <p>Target Date: {formatGoalDate(goal.date)}</p>

                  <span className="goal-days">
                    {daysRemaining > 0
                      ? `${daysRemaining} days remaining`
                      : daysRemaining === 0
                        ? "Due today"
                        : "Target date passed"}
                  </span>
                </div>

                <strong>₹{goal.amount.toLocaleString("en-IN")}</strong>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default GoalSummary;
