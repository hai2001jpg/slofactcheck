import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { t } = useTranslation("auth");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg flex items-center justify-center min-h-screen text-white text-2xl font-[Montserrat]">
        {t("protectedRoute.checkingCredentials")}
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
