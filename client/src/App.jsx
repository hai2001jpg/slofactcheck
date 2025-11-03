import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/ui/PageWrapper";

import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./pages/Login";
import UserPanel from "./pages/UserPanel";

function App() {
  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/userpanel";

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
            <Route path="/userpanel" element={
                <PageWrapper routeKey="/userpanel">
                  <UserPanel />
                </PageWrapper>
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
