import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/buyer/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes that use the Layout (with header and footer) */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* Routes that do not use the Layout (no header and footer) */}
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Redirect to Home if no match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
