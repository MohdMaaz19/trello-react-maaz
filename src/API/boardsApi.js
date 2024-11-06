import axios from 'axios';

const BASE_URL = import.meta.env.VITE_TRELLO_BASE_URL;
const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN;

export const createBoard = async (boardName, navigate) => {
  if (boardName.trim()) {
    try {
      const response = await axios.post(`${BASE_URL}/boards?key=${API_KEY}&token=${TOKEN}&name=${boardName}`);
      return response.data;
    } catch (error) {
      navigate('/ErrorPage');
    }
  }
};

export const getBoards = async (navigate) => {
  try {
    const response = await axios.get(`${BASE_URL}/members/me/boards?key=${API_KEY}&token=${TOKEN}`);
    return response.data;
  } catch (error) {
    navigate('/ErrorPage');
  }
};
