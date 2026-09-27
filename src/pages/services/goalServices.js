const STORAGE_KEY = "finance_goals";

export const getGoals = () => {
  const goals = localStorage.getItem(STORAGE_KEY);

  return goals ? JSON.parse(goals) : [];
};

export const addGoal = (goal) => {
  const goals = getGoals();

  const updatedGoals = [goal, ...goals];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedGoals)
  );

  return goal;
};

export const deleteGoal = (id) => {
  const goals = getGoals();

  const updatedGoals = goals.filter(
    (goal) => goal.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedGoals)
  );
};

export const updateGoal = (updatedGoal) => {
  const goals = getGoals();

  const updatedGoals = goals.map((goal) =>
    goal.id === updatedGoal.id
      ? updatedGoal
      : goal
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedGoals)
  );

  return updatedGoal;
};