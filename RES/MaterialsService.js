import axios from "axios";
import { API_URLs } from "../src/shared/common-settings";

const component_URL = API_URLs.materials;

export const getMaterials = async () => {
  const response = await axios.get(component_URL);
  return response.data.data;
};

export const addMaterial = async (material) => {
  const response = await axios.post(component_URL, { data: material });
  return response.data.data;
};

export const updateMaterial = async (id, updatedData) => {
  const response = await axios.put(`${component_URL}/${id}`, { data: updatedData });
  return response.data.data;
};

export const deleteMaterial = async (id) => {
  await axios.delete(`${component_URL}/${id}`);
};
