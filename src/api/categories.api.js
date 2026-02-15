import api from "./client";

export const getCategories = () => api.get("/food-items");
