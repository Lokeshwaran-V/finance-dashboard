import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTransactions } from "./store/transactionSlice";
import { getTransactions } from "./pages/services/transactionService";
import { setGoal } from "./store/goalSlice";
import { getGoals } from "./pages/services/goalServices";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Planning from "./pages/Planning/Planning";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTransactions = getTransactions();
    const storedGoals = getGoals();

    dispatch(setGoal(storedGoals));
    dispatch(setTransactions(storedTransactions));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/planning" element={<Planning />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
