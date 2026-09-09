# Personal Finance Dashboard
A responsive personal finance dashboard built with React.js to track income, expenses, and monthly financial activity.

## 🚀 Live Demo
View Live Application - https://finance-dashboard-nine-tau.vercel.app/

## 📌 Features

- Add, edit, and delete transactions
- Track income and expenses
- Categorize transactions
- Monthly transaction filtering
- Income summary by category
- Expense breakdown using a pie chart
- Recent transactions dashboard
- Persistent data using localStorage
- Responsive design for desktop and mobile
- Client-side routing with React Router
- Global state management with Redux Toolkit

## 🛠️ Tech Stack
- React.js
- Vite
- JavaScript (ES6+)
- Redux Toolkit
- React Redux
- React Router
- Recharts
- React DatePicker
- CSS3
- localStorage
  
## 📂 Project Structure
src/
├── components/
├── pages/
├── services/
├── store/
├── App.jsx
├── main.jsx
└── index.css

## 💾 State Management & Data Storage
- **Redux Toolkit** is used for global transaction state management and UI updates.
- **localStorage** is used for client-side data persistence.
- Transactions are loaded from localStorage into Redux when the application starts.
- Changes to transactions are synchronized between Redux state and localStorage.
No backend or external database is currently required.

## 📈 Future Improvements

- Backend integration
- User authentication
- Cloud database storage
- Advanced financial analytics
- Budget management
- Export transactions
