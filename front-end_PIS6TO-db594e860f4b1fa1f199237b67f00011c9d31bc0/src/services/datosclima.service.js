import axios from "axios";
const { API_URL } = require("@/constants/index");

export const getData = async (body) => {
    const url = `${API_URL}/data/chatbot`;

    const response = await axios.post(url, body);

    return response.data;
};
