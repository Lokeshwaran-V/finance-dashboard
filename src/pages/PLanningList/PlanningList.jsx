import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGoal as deleteGoalFromRedux,
} from "../../store/goalSlice";
import { deleteGoal } from "../services/goalServices.js";
import "./PlanningList.css";

function PlanningList({ onEdit }) {
  
  const dispatch = useDispatch();

  const goals = useSelector((state) => state.goals.goals);

  const handleDelete = (id) => {
    deleteGoal(id);
    dispatch(deleteGoalFromRedux(id));
  };

  return (
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

            <div className="goal-actions">
              <strong>
                ₹{goal.amount.toLocaleString("en-IN")}
              </strong>

              <button onClick={() => onEdit(goal)}>
                Edit
              </button>

              <button onClick={() => handleDelete(goal.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default PlanningList;