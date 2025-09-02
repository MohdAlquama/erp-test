// // // utils/axiosInstance.js
// // import axios from "axios";

// // const axiosInstance = axios.create({
// //   baseURL:"http://127.0.0.1:8000",
// //   headers: {
// //     "Content-Type": "application/json",
// //     Accept: "application/json",
// //   },
// // });

// // // Add request interceptor to include Sanctum token
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token"); // Adjust based on your auth
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => Promise.reject(error)
// // );

// // // Add response interceptor for error handling
// // axiosInstance.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     // Handle common errors (e.g., 401 Unauthorized)
// //     if (error.response?.status === 401) {
// //       // Optionally redirect to login or clear token
// //       localStorage.removeItem("token");
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export default axiosInstance;

// // utils/axiosInstance.js
// import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000";

// const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//     },
// });

// // Response interceptor for basic error handling
// // axiosInstance.interceptors.response.use(
// //     (response) => response,
// //     (error) => {
// //         console.error("Response error:", error.response?.data || error.message);
// //         return Promise.reject(error);
// //     }
// // );

// export default axiosInstance;

// import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000";

// const axiosInstance = axios.create({
//     baseURL: BASE_URL,
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//     },
// });

// // Fetch CSRF token before POST requests
// axiosInstance.get('/sanctum/csrf-cookie').then(() => {
//     console.log('CSRF token fetched');
// });

// export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "http://127.0.0.1:8000",
//     withCredentials: true,
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         "X-Requested-With": "XMLHttpRequest",
//     },
// });

// axiosInstance.get("/sanctum/csrf-cookie");

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://setbizsolution.com", // Update to your backend URL 
    withCredentials: true, // VERY important for Sanctum
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
});

export const getCsrfCookie = async () => {
  await axiosInstance.get("/sanctum/csrf-cookie");
};

export default axiosInstance;
