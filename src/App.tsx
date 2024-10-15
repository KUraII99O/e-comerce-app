import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './components/UserContext';
import StoreSettingPage from './pages/StoreSettingPage';
import { ManageStoreProvider } from './components/Stores/Provider';
import EditStorePage from './pages/EditStorePage';
import StorePage from './pages/StorePage';
import ConractStorePage from './pages/ConractStorePage';
import AddProductPage from './pages/seller/AddProductPage';
import { ManageProductProvider } from './components/Products/Provider';

const App: React.FC = () => {
  return (
    <ManageStoreProvider>
    <ManageProductProvider>
      
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
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/contactstore" element={<ConractStorePage />} />
            <Route path="/addproduct" element={<AddProductPage />} />
            
            {/* Redirect to Home if no match */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ManageProductProvider>
    </ManageStoreProvider>
  );
};

export default App;
