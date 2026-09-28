import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  addGoal as addGoalToRedux,
  updateGoal as updateGoalToRedux,
} from "../../store/goalSlice";

import { addGoal, updateGoal } from "../services/goalServices.js";

import PlanningList from "../PlanningList/PlanningList.jsx";
import "./Planning.css";

const INITIAL_GOAL_DATA = {
  goal: "",
  amount: "",
  date: null,
};

const formatDate = (date) => {
  if (!date) return null;

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const parseDate = (dateString) => {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

function Planning() {
  const dispatch = useDispatch();

  const [editingGoal, setEditingGoal] = useState(null);
  const [goalData, setGoalData] = useState(INITIAL_GOAL_DATA);

  const handleGoalChange = (event) => {
    const { name, value } = event.target;

    setGoalData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setGoalData((previousData) => ({
      ...previousData,
      date,
    }));
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);

    setGoalData({
      goal: goal.goal,
      amount: goal.amount,
      date: parseDate(goal.date),
    });
  };

  const resetForm = () => {
    setGoalData(INITIAL_GOAL_DATA);
    setEditingGoal(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const goal = {
      ...(editingGoal || {}),
      goal: goalData.goal,
      amount: Number(goalData.amount),
      date: formatDate(goalData.date),
    };

    if (editingGoal) {
      updateGoal(goal);
      dispatch(updateGoalToRedux(goal));
    } else {
      const newGoal = {
        id: crypto.randomUUID(),
        ...goal,
      };

      addGoal(newGoal);
      dispatch(addGoalToRedux(newGoal));
    }

    resetForm();
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
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Select target date"
              onChangeRaw={(event) => event.preventDefault()}
              required
            />
          </div>
        </div>

        <button type="submit">
          {editingGoal ? "Update Goal" : "Add Goal"}
        </button>
      </form>

      <PlanningList onEdit={handleEdit} />
    </div>
  );
}

export default Planning;