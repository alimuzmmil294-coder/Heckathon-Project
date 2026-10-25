import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LoginPage from "./Pages/Login";
import DoctorDashboard from "./Pages/DoctorDashboard";
import PatientDashboard from "./Pages/PatientDashboard";
import ClinicManagerDashboard from "./Pages/ClinicManagerDashboard";

/**
 * ProtectedRoute: guards dashboard routes by verifying active session credentials
 * (medflow_token or medflow_user) and optionally validating role access.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("medflow_token") : null;
  const userStr =
    typeof window !== "undefined" ? localStorage.getItem("medflow_user") : null;

  if (!token && !userStr) {
    return <Navigate to="/login" replace />;
  }

  let redirectTo = null;
  if (allowedRoles && userStr) {
    try {
      const user = JSON.parse(userStr);
      const roleNorm = (user.role || "").toLowerCase().replace(/\s+/g, "_");
      const normalizedAllowed = allowedRoles.map((r) =>
        r.toLowerCase().replace(/\s+/g, "_")
      );

      if (!normalizedAllowed.includes(roleNorm)) {
        if (roleNorm === "doctor") redirectTo = "/doctor-dashboard";
        else if (roleNorm === "clinic_manager")
          redirectTo = "/clinic-manager-dashboard";
        else redirectTo = "/patient-dashboard";
      }
    } catch (e) {
      console.warn("[Auth Router] Session parse error:", e);
    }
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Role-Based Dashboard Routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clinic-manager-dashboard"
          element={
            <ProtectedRoute allowedRoles={["clinic_manager"]}>
              <ClinicManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient-dashboard"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
