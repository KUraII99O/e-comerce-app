import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./components/UserContext";
import { ManageStoreProvider } from "./components/SellerDashboard/components/Store/Provider";
import StorePage from "./pages/StorePage";
import { ManageProductProvider } from "./components/Products/Provider";
import ProductPage from "./pages/buyer/ProductPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./components/SellerDashboard/layout/DefaultLayout";
import SignUp from "./components/SellerDashboard/pages/Authentication/SignUp";
import PageTitle from "./components/SellerDashboard/components/PageTitle";
import SignIn from "./components/SellerDashboard/pages/Authentication/SignIn";
import Buttons from "./components/SellerDashboard/pages/UiElements/Buttons";
import Alerts from "./components/SellerDashboard/pages/UiElements/Alerts";
import Chart from "./components/SellerDashboard/pages/Chart";
import Settings from "./components/SellerDashboard/pages/Settings";
import Tables from "./components/SellerDashboard/pages/Tables";
import FormLayout from "./components/SellerDashboard/pages/Form/FormLayout";
import FormElements from "./components/SellerDashboard/pages/Form/FormElements";
import Profile from "./components/SellerDashboard/pages/Profile";
import ECommerce from "./components/SellerDashboard/pages/Dashboard/ECommerce";
import Calendar from "./components/SellerDashboard/pages/Calendar";
import CreateProductPage from "./components/SellerDashboard/pages/CreateProductPage";
import StoreListPage from "./components/SellerDashboard/pages/StoreListPage";
import ProductsListPage from "./components/SellerDashboard/pages/ProductsPage";
import StoreFormPage from "./components/SellerDashboard/pages/StoreFormPage";

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
              <Route path="/login" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/store/:storeId" element={<StorePage />} />

              <Route path="/product/:id" element={<ProductPage />} />

              {/* Routes that use DefaultLayout */}
              <Route
                path="/dashboard"
                element={
                  <DefaultLayout>
                    <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <ECommerce />
                  </DefaultLayout>
                }
              />

              <Route
                path="/calendar"
                element={
                  <DefaultLayout>
                    <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Calendar />
                  </DefaultLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <DefaultLayout>
                    <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Profile />
                  </DefaultLayout>
                }
              />
              <Route
                path="/stores/:storeId/add-product"
                element={
                  <DefaultLayout>
                    <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FormElements />
                  </DefaultLayout>
                }
              />
              <Route
                path="/forms/form-layout"
                element={
                  <DefaultLayout>
                    <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <FormLayout />
                  </DefaultLayout>
                }
              />
              <Route
                path="/stores/:storeId/product-list"
                element={
                  <DefaultLayout>
                    <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Tables />
                  </DefaultLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <DefaultLayout>
                    <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Settings />
                  </DefaultLayout>
                }
              />
              <Route
                path="/chart"
                element={
                  <DefaultLayout>
                    <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Chart />
                  </DefaultLayout>
                }
              />
              <Route
                path="/ui/alerts"
                element={
                  <DefaultLayout>
                    <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Alerts />
                  </DefaultLayout>
                }
              />
              <Route
                path="/ui/buttons"
                element={
                  <DefaultLayout>
                    <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <Buttons />
                  </DefaultLayout>
                }
              />
              <Route
                path="/auth/signin"
                element={
                  <DefaultLayout>
                    <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                    <SignIn />
                  </DefaultLayout>
                }
              />
              <Route
                path="/auth/signup"
                element={
                  <DefaultLayout>
                    <SignUp />
                  </DefaultLayout>
                }
              />
             
              <Route
                path="/admin/ecommerce/products"
                element={
                  <DefaultLayout>
                    <ProductsListPage />
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/ecommerce/stores"
                element={
                  <DefaultLayout>
                    <StoreListPage />
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/ecommerce/stores/create"
                element={
                  <DefaultLayout>
                    <StoreFormPage />
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/ecommerce/stores/edit-store/:id"
                element={
                  <DefaultLayout>
                    <StoreFormPage />
                  </DefaultLayout>
                }
              />
              <Route
                path="/admin/ecommerce/products/create"
                element={
                  <DefaultLayout>
                    <CreateProductPage />
                  </DefaultLayout>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </ManageProductProvider>
    </ManageStoreProvider>
  );
};

export default App;
