import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./components/UserContext";
import StoreSettingPage from "./pages/StoreSettingPage";
import { ManageStoreProvider } from "./components/Stores/Provider";
import EditStorePage from "./pages/EditStorePage";
import StorePage from "./pages/StorePage";
import ConractStorePage from "./pages/buyer/ConractStorePage";
import AddProductPage from "./pages/buyer/AddProductPage";
import { ManageProductProvider } from "./components/Products/Provider";
import ProductPage from "./pages/buyer/ProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <ManageStoreProvider>
      <ManageProductProvider>
        <AuthProvider>
          <Router>
          <ToastContainer />

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
              <Route path="/edit-store/:storeId" element={<EditStorePage />} />
              <Route path="/add-store" element={<EditStorePage />} />
              <Route path="/managestores" element={<StoreSettingPage />} />
              <Route path="/store/:storeId" element={<StorePage />} />
              <Route path="/contactstore" element={<ConractStorePage />} />
              <Route
                path="/stores/:storeId/add-product"
                element={<AddProductPage />}
              />
              <Route path="/product/:id" element={<ProductPage />} />

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
