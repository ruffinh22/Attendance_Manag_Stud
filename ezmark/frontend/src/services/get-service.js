import {
  getAccessToken,
  refreshTokens,
  isAccessTokenValid,
  handleErrors,
} from "./auth-service";
import toast from "react-hot-toast";

const API_URL = "http://127.0.0.1:8000/api";

// Admin GET/POST/PUT/DELETE Requests
export const getAdminDashboardMetrics = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(`${API_URL}/dashboard/admin/metrics/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
        await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};


export const getManageStudents = async (search) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(
      `${API_URL}/dashboard/admin/student-section/${
        search ? `?search=${search}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.length > 0) {
        return responseData;
      } else {
        toast("No Data Found!", {
          icon: "👎",
        });
        return responseData;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getManageAttendance = async (date) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    // Tentative de rafraîchissement du jeton d'accès
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(
      `${API_URL}/dashboard/admin/attendance-management/?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.length > 0) {
        return responseData;
      } else {
        toast(`No Attendance Found (${date})`, {
          icon: "👎",
        });
        return responseData;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getPendingApprovals = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    // Attempt to refresh the access token
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/request-management-section/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    if (res.ok) {
      const responseData = await res.json();
      if (responseData.length > 0) {
        return responseData;
      } else {
        toast("No Pending requests", {
          icon: "👎",
        });
        return responseData;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const setPendingApprovals = async (email, type) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/pending-requests/`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      if (type === "POST") {
        toast.success(`${email} Approved`);
      }
      if (type === "DELETE") {
        toast(`${email} Deleted`, {
          icon: "🗑️",
        });
      }
      return res;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

// Student GET/POST/PUT/DELETE Requests
export const getStudentDashboardMetrics = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/dashboard/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    } else {
        await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getGenerateQR = async () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/generate-qr-code/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (res.ok) {
      const responseData = await res.json();
      console.log(responseData);
      return responseData;
    } else {
        await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const setScanQRAPI = async (data) => {
  const accessToken = getAccessToken();
  console.log(JSON.stringify(data));

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(`${API_URL}/student/MarkAttendanceDynamicQRView/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const responseData = await res.json();
      toast.success("Attendance Marked Successfully");
      console.log("Response Data:", responseData);
      return responseData;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAttendanceStudent = async (date) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return Promise.reject(new Error("No access token available"));
  }

  if (!isAccessTokenValid()) {
    const refreshedAccessToken = await refreshTokens();

    if (!refreshedAccessToken) {
      return Promise.reject(new Error("Token refresh failed"));
    }
  }

  try {
    const res = await fetch(
      `${API_URL}/student/get-attendence-by-date/?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      return responseData;
    }
  } catch (error) {
    console.error(error);
  }
};

// Ajoutez cette fonction à votre fichier get-service.js
export const markAttendance = async (attendanceData) => {
  try {
    const res = await fetch(`${API_URL}/mark-attendance/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    });

    if (res.ok) {
      const responseData = await res.json();
      toast.success("Attendance marked successfully");
      return responseData;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};



// Dans addAttendance
export const addAttendance = async (attendanceData) => {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return Promise.reject(new Error("No access token available"));
    }

    const res = await fetch(`${API_URL}/mark-attendance/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Ajout du token d'authentification dans l'en-tête
      },
      body: JSON.stringify(attendanceData),
    });

    const responseData = await res.json(); // Parse la réponse JSON
    
    if (res.ok) {
      toast.success("Attendance added successfully");
      return responseData;
    } else {
      console.error("Server error:", responseData); // Log l'erreur côté client
      toast.error("An error occurred while adding attendance. Please try again later.");
      return Promise.reject(responseData); // Rejette la promesse avec les données d'erreur
    }
  } catch (error) {
    console.error(error);
    toast.error("An error occurred while adding attendance. Please try again later.");
    return Promise.reject(error); // Rejette la promesse avec l'erreur
  }
};



export const updateAttendance = async (attendanceData) => {
  try {
    const res = await fetch(`${API_URL}/mark-attendance/${attendanceData.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendanceData),
    });

    if (res.ok) {
      const responseData = await res.json();
      toast.success("Attendance updated successfully");
      return responseData;
    } else {
      await handleErrors(res);
    }
  } catch (error) {
    console.error(error);
  }
};


