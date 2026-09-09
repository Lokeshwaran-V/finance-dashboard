import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTransactions } from "./store/transactionSlice";
import { getTransactions } from "./pages/services/transactionService";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedTransactions = getTransactions();

    dispatch(setTransactions(storedTransactions));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
