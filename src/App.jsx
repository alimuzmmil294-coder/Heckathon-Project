import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import LoginPage from "./Pages/Login";
import DoctorDashboard from "./Pages/DoctorDashboard";
import PatientDashboard from "./Pages/PatientDashboard";
import ClinicManagerDashboard from "./Pages/ClinicManagerDashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route
          path="/clinic-manager-dashboard"
          element={<ClinicManagerDashboard />}
        />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
