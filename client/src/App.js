import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyle from "components/GlobalStyle";
import LoginAdmin from "components/admin/LoginAdmin";
import DashboardAdminPage from "page/admin/DashboardAdminPage";
import ProductAdminPage from "page/admin/ProductAdminPage";
import ProductAddAdminPage from "page/admin/ProductAddAdminPage";
import ProductEditAdminPage from "page/admin/ProductEditAdminPage";
import ProtectedRouteAdmin from "components/admin/ProtectedRouteAdmin";
import RegisterPage from "page/user/RegisterPage";
import LoginPage from "page/user/LoginPage";
import Header from "components/user/layout/header/Header";
import HomePage from "page/user/HomePage";
import Footer from "components/user/layout/footer/Footer";
import LoadUser from "components/user/auth/LoadUser";
import NotFoundPage from "page/user/NotFoundPage";
import SearchPage from "page/user/SearchPage";
import ProductCategoryPage from "page/user/ProductCategoryPage";
import ProductDetailPage from "page/user/ProductDetailPage";

function App() {
  return (
    <GlobalStyle>
      <div className='App'>
        <Router>
          <LoadUser />
          <Header />
          <Routes>
            {/* Route user */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route
              path='/category/:categoryPath'
              element={<ProductCategoryPage />}
            />
            <Route path='/product-detail/:id' element={<ProductDetailPage />} />
            <Route path='*' element={<NotFoundPage />} />

            {/* Route Admin */}
            <Route path='/admin/login' element={<LoginAdmin />} />
            <Route path='/admin/dashboard' element={<ProtectedRouteAdmin />}>
              <Route path='/admin/dashboard' element={<DashboardAdminPage />} />
            </Route>
            <Route path='/admin/product/add' element={<ProtectedRouteAdmin />}>
              <Route
                path='/admin/product/add'
                element={<ProductAddAdminPage />}
              />
            </Route>
            <Route
              path='/admin/product/edit/:id'
              element={<ProtectedRouteAdmin />}
            >
              <Route
                path='/admin/product/edit/:id'
                element={<ProductEditAdminPage />}
              />
            </Route>
            <Route path='/admin/product' element={<ProtectedRouteAdmin />}>
              <Route path='/admin/product' element={<ProductAdminPage />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </GlobalStyle>
  );
}

export default App;
