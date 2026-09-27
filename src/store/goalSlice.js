import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [],
};

const goalSlice = createSlice({
  name: "goals",

  initialState,

  reducers: {
    setGoal: (state, action) => {
      state.goals = action.payload;
    },

    addGoal: (state, action) => {
      state.goals.unshift(action.payload);
    },

    updateGoal: (state, action) => {
      const index = state.goals.findIndex(
        (goal) => goal.id === action.payload.id
      );

      if (index !== -1) {
        state.goals[index] = action.payload;
      }
    },

    deleteGoal: (state, action) => {
      state.goals = state.goals.filter(
        (goal) => goal.id !== action.payload
      );
    },
  },
});

export const {
  setGoal,
  addGoal,
  updateGoal,
  deleteGoal,
} = goalSlice.actions;

export default goalSlice.reducer;