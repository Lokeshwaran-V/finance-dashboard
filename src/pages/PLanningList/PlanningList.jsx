import React from "react";
import { useSelector } from "react-redux";

function PlanningList() {
  const goals = useSelector((state) => state.goals.goals);
  return (
    <div>
      <div className="goals-list">
        <h2>My Goals</h2>

        {goals.length === 0 ? (
          <p>No goals found.</p>
        ) : (
          goals.map((goal) => (
            <div className="goal-item" key={goal.id}>
              <div>
                <h3>{goal.goal}</h3>
                <p>Target Date: {goal.date}</p>
              </div>

              <strong>₹{goal.amount.toLocaleString("en-IN")}</strong>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PlanningList;
