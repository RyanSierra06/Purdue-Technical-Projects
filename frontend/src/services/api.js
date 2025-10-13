import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getProjects = async () => {
  const { data } = await API.get('/projects');
  return data;
};
