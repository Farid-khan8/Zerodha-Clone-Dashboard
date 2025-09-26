export const fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
    };

    const res = await fetch(url, { ...options, headers });
    const data = await res.json();
    return data;
};
