import axios from "axios";
import React from "react";

const axiosIntance = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/",

    headers: {
        Accept: "application/json",

        TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA",
    },
});

// Add a request interceptor
axiosIntance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosIntance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized: 401 - Phiên đăng nhập đã hết hạn");
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        } else {
            console.log("Lỗi API:", error);
        }
        return Promise.reject(error);
    }
);

export default axiosIntance;
