import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addGoal as addGoalToRedux } from "../../store/goalSlice";
import { addGoal } from "../services/goalServices.js";
import "./Planning.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PlanningList from "../PLanningList/PlanningList.jsx";

function Planning() {
  const dispatch = useDispatch();
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newGoal = {
      id: crypto.randomUUID(),
      goal: goalData.goal,
      amount: Number(goalData.amount),
      date: goalData.date
        ? `${goalData.date.getFullYear()}-${String(
            goalData.date.getMonth() + 1,
          ).padStart(2, "0")}-${String(goalData.date.getDate()).padStart(
            2,
            "0",
          )}`
        : null,
    };
    addGoal(newGoal);
    dispatch(addGoalToRedux(newGoal));
    console.log("New Goal Added:", newGoal);
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
      <PlanningList />
    </div>
  );
}

export default Planning;
