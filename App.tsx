/* FAST-MODE */
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { SearchPage } from "./pages/SearchPage";
import { ProviderDetails } from "./pages/ProviderDetails";
import { Login } from "./pages/Login";
import { ProviderDashboard } from "./pages/ProviderDashboard";
import { UserDashboard } from "./pages/UserDashboard";
import { ThemeProvider } from "./components/ThemeContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <div className="bg-red-500/10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/provider/:id" element={<ProviderDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register-provider" element={<Login />} />
              <Route path="/provider-dashboard" element={<ProviderDashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;
