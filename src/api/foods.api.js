import api from "./client";

export const getFoods = () => api.get("/food-items");
