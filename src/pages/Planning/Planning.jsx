import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addGoal as addGoalToRedux,
  updateGoal as updateGoalToRedux,
} from "../../store/goalSlice";
import { addGoal, updateGoal } from "../services/goalServices.js";
import "./Planning.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlanningList from "../PlanningList/PlanningList.jsx";

function Planning() {
  const dispatch = useDispatch();
  const [editingGoal, setEditingGoal] = useState(null);
  const [goalData, setGoalData] = useState({
    goal: "",
    amount: "",
    date: null,
  });

  const handleGoalChange = (event) => {
    const { name, value } = event.target;

    setGoalData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);

    const [year, month, day] = goal.date.split("-").map(Number);

    setGoalData({
      goal: goal.goal,
      amount: goal.amount,
      date: new Date(year, month - 1, day),
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedDate = goalData.date
      ? `${goalData.date.getFullYear()}-${String(
          goalData.date.getMonth() + 1,
        ).padStart(2, "0")}-${String(goalData.date.getDate()).padStart(2, "0")}`
      : null;

    if (editingGoal) {
      const updatedGoal = {
        ...editingGoal,
        goal: goalData.goal,
        amount: Number(goalData.amount),
        date: formattedDate,
      };

      updateGoal(updatedGoal);
      dispatch(updateGoalToRedux(updatedGoal));

      setEditingGoal(null);
    } else {
      const newGoal = {
        id: crypto.randomUUID(),
        goal: goalData.goal,
        amount: Number(goalData.amount),
        date: formattedDate,
      };

      addGoal(newGoal);
      dispatch(addGoalToRedux(newGoal));
    }

    setGoalData({
      goal: "",
      amount: "",
      date: null,
    });
  };

  return (
    <div>
      <form className="goal-form" onSubmit={handleSubmit}>
        <div className="planning-form--input">
          <div className="form-group">
            <label htmlFor="goal">Goal</label>

            <input
              id="goal"
              name="goal"
              type="text"
              placeholder="Enter your goal"
              value={goalData.goal}
              onChange={handleGoalChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>

            <input
              id="amount"
              name="amount"
              type="number"
              placeholder="Enter amount"
              value={goalData.amount}
              onChange={handleGoalChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>

            <DatePicker
              id="date"
              selected={goalData.date}
              onChange={(date) =>
                setGoalData((previousData) => ({
                  ...previousData,
                  date,
                }))
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="Select target date"
              onChangeRaw={(event) => event.preventDefault()}
              required
            />
          </div>
        </div>

        <button type="submit">Add Goal</button>
      </form>
      <PlanningList onEdit={handleEdit} />
    </div>
  );
}

export default Planning;
