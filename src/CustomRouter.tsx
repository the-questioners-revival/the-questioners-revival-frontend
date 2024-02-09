import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './components/Todo/TodoPage';
import QaaPage from './components/Qaa/QaaPage';
import SummaryPage from './components/Summary/SummaryPage';
import HabitsPage from './components/Habits/HabitsPage';
import GoalsPage from './components/Goals/GoalsPage';
import ReviewsPage from './components/Reviews/ReviewsPage';

const CustomRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/qaas" element={<QaaPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
