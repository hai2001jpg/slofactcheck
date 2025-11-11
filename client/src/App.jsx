import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/ui/PageWrapper";

import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import UserPanel from "./pages/UserPanel";
import History from "./pages/History";
import Statistics from "./pages/Statistics";
import ProtectedRoute from "./components/routing/ProtectedRoute";

function App() {
  const location = useLocation();
  const hideNav = ["/login", "/userpanel", "/history", "/statistics"].includes(location.pathname);

  return (
    <div className="bg flex flex-col min-h-screen">
      {!hideNav && <Navbar />}

      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route path="/" element={
                <PageWrapper routeKey="/">
                  <Home />
                </PageWrapper>
              }
            />
            <Route path="/login" element={
                <PageWrapper routeKey="/login">
                  <Login />
                </PageWrapper>
              }
            />

            {/* Protected routes */ }
            <Route
              path="/userpanel"
              element={
                <ProtectedRoute>
                  <PageWrapper routeKey="/userpanel">
                    <UserPanel />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <PageWrapper routeKey="/history">
                    <History />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <PageWrapper routeKey="/statistics">
                    <Statistics />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {!hideNav && <Footer />}
    </div>
  );
}

export default App;
