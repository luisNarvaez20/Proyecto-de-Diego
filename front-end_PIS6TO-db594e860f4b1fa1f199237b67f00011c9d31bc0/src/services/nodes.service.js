import axios from "axios";
const { API_URL } = require("@/constants/index");

export const createNode = async (body, token) => {
  const url = `${API_URL}/nodes`;

  const { data } = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const updateNode = async (id, body, token) => {
  const url = `${API_URL}/nodes/${id}`;

  const { data } = await axios.put(url, body, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const deleteNode = async (id, token) => {
  const url = `${API_URL}/nodes/${id}`;

  const { data } = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getAllNodes = async (token, owner) => {
  const url = `${API_URL}/nodes`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};

export const getNodeById = async (id, token) => {
  const url = `${API_URL}/nodes/${id}`;

  const { data } = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
};