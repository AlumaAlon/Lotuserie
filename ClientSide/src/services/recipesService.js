import axios from "axios";
const api = import.meta.env.VITE_API_BASE_URL || "";

export const getAllRecipes = () => {
  return axios.get(`${api}recipes`);
};

export const getRecipeById = (id) => {
  return axios.get(`${api}recipes/${id}`);
};
