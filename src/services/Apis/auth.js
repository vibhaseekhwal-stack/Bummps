import api from "../Interceptor/api";

export const login = (credentials) => {
    return api.post("/auth/login", credentials);
};

export const register = (formData) => {
    return api.post("/auth/register", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getUserProfileById = async (userId) => {
    const res = await api.get(`/auth/profile/${userId}`);
    return res.data;
};

export const deleteAccount = async () => {
    const res = await api.delete("/auth/delete-account");
    return res.data;
};