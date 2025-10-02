import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemsPage from './pages/ItemsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RegistrationPage from "./pages/RegistrationPage";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈 */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />


        <Route
          path="/items"
          element={
            <Layout>
              <ItemsPage />
            </Layout>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
          <Route path="/registration" element={<RegistrationPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
