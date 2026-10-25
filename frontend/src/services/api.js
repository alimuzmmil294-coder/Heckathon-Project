const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

/**
 * Universal safe fetch wrapper with error handling, JWT auth attachment, and fallback support
 */
async function fetchFromApi(endpoint, options = {}) {
  try {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("medflow_token")
        : null;

    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized by clearing stale tokens & redirecting
    if (
      res.status === 401 &&
      !endpoint.startsWith("/auth/login") &&
      !endpoint.startsWith("/auth/register")
    ) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("medflow_token");
        localStorage.removeItem("medflow_user");
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup"
        ) {
          window.location.href = "/login";
        }
      }
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (error) {
    console.warn(`[MedFlow API Error] on ${endpoint}:`, error.message);
    throw error;
  }
}

// ==========================================
// 1. AUTHENTICATION SERVICES
// ==========================================
export const loginApi = async (credentials) => {
  return await fetchFromApi("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

export const registerApi = async (userData) => {
  return await fetchFromApi("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const getCurrentUserApi = async () => {
  return await fetchFromApi("/auth/me");
};

// ==========================================
// 2. DOCTOR WORKSPACE SERVICES
// ==========================================
export const getDoctorStatsApi = async () => {
  return await fetchFromApi("/doctor/stats");
};

export const getDoctorAppointmentsApi = async () => {
  return await fetchFromApi("/doctor/appointments");
};

export const getDoctorPatientsApi = async () => {
  return await fetchFromApi("/doctor/patients");
};

export const getDoctorPrescriptionsApi = async () => {
  return await fetchFromApi("/doctor/prescriptions");
};

export const createPrescriptionApi = async (prescriptionData) => {
  return await fetchFromApi("/doctor/prescriptions", {
    method: "POST",
    body: JSON.stringify(prescriptionData),
  });
};

// ==========================================
// 3. PATIENT WORKSPACE SERVICES
// ==========================================
export const getPatientProfileApi = async () => {
  return await fetchFromApi("/patients/profile");
};

export const getPatientAppointmentsApi = async () => {
  return await fetchFromApi("/patients/appointments");
};

export const getPatientPrescriptionsApi = async () => {
  return await fetchFromApi("/patients/prescriptions");
};

export const bookAppointmentApi = async (appointmentData) => {
  return await fetchFromApi("/patients/appointments", {
    method: "POST",
    body: JSON.stringify(appointmentData),
  });
};

// ==========================================
// 4. CLINIC MANAGER SERVICES
// ==========================================
export const getManagerStatsApi = async () => {
  return await fetchFromApi("/manager/stats");
};

export const getManagerStaffApi = async () => {
  return await fetchFromApi("/manager/staff");
};

// ==========================================
// 5. AI CLINICAL COPILOT
// ==========================================
export const analyzeSymptomsApi = async (payload) => {
  return await fetchFromApi("/ai/diagnose", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
