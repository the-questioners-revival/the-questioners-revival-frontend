import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoPage from './components/Todo/TodoPage';
import QaasPage from './components/Qaa/QaasPage';
import SummaryPage from './components/Summary/SummaryPage';
import HabitsPage from './components/Habits/HabitsPage';
import GoalsPage from './components/Goals/GoalsPage';
import ReviewsPage from './components/Reviews/ReviewsPage';
import LoginPage from './components/Login/LoginPage';
import WelcomePage from './components/Welcome/WelcomePage';
import SearchPage from './components/Search/SearchPage';
import ActivityCalendar from './components/ActivityCalendar/ActivityCalendarPage';
import CategoriesPage from './components/Category/CategoriesPage';

const CustomRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/qaas" element={<QaasPage />} />
        <Route path="/summary" element={<SummaryPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/calendar" element={<ActivityCalendar />} />
        <Route path="/category" element={<CategoriesPage />} />
      </Routes>
    </Router>
  );
};

export default CustomRouter;
