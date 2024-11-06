import axios from "axios";

const BASE_URL = "http://localhost:4000/api";

export const SignUpUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signUp`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const logInUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const logout = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/logout`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const verifyAuth = async (data) => {
  try {
    const response = await axios.get(`${BASE_URL}/verify_auth`,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const createDoc = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/createDocs`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in createDoc:", error);
    throw error;
  }
};

export const updateDocs = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/updateDocs`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in updating data:", error);
    throw error;
  }
};

export const getDocs = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/getDocs`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDocs = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/deleteDocs`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllDocs = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getAllDocs/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
