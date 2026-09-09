const STORAGE_KEY = "finance_transactions";

export const getTransactions = () => {
  const transactions = localStorage.getItem(STORAGE_KEY);

  return transactions ? JSON.parse(transactions) : [];
};

export const totalRevenue = () => {
  const transactions = getTransactions();
  console.log(JSON.stringify(transactions.type))

  const newIncome = transactions.map(
    (transaction) => (transaction.type === "income" ? transaction.amount : 0)
    
  );

  return newIncome
  
}

export const addTransaction = (transaction) => {
  const transactions = getTransactions();

  const newTransaction = {
    id: crypto.randomUUID(),
    ...transaction,
  };

  const updatedTransactions = [newTransaction, ...transactions];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedTransactions)
  );

  return newTransaction;
};

export const deleteTransaction = (id) => {
  const transactions = getTransactions();

  const updatedTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedTransactions)
  );
};

export const updateTransaction = (updatedTransaction) => {
  const transactions = getTransactions();

  const updatedTransactions = transactions.map((transaction) =>
    transaction.id === updatedTransaction.id
      ? updatedTransaction
      : transaction
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedTransactions)
  );

  return updatedTransaction;
};