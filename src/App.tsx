import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/buyer/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './components/UserContext';
import StoreSettingPage from './pages/StoreSettingPage';
import { ManageStoreProvider } from './components/Stores/Provider';
import EditStorePage from './pages/EditStorePage';

const App: React.FC = () => {
  return (
    <ManageStoreProvider>
      <AuthProvider>
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
            <Route path="/edit-store/:id" element={<EditStorePage />} />
            <Route path="/add-store" element={<EditStorePage />} />
            <Route path="/managestores" element={<StoreSettingPage />} />
            
            {/* Redirect to Home if no match */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ManageStoreProvider>
  );
};

export default App;
