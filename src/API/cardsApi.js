import axios from 'axios';

const BASE_URL = import.meta.env.VITE_TRELLO_BASE_URL;
const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN;

export const createCard = async (listId, cardName, navigate) => {
  if (cardName.trim()) {
    try {
      const response = await axios.post(
        `${BASE_URL}/cards?key=${API_KEY}&token=${TOKEN}&idList=${listId}&name=${cardName}`
      );
      return response.data;
    } catch (error) {
      navigate('/ErrorPage');
    }
  }
};

export const getCards = async (listId, navigate) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/lists/${listId}/cards?key=${API_KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    navigate('/ErrorPage');
  }
};

export const deleteCard = async (cardId, navigate) => {
  try {
    await axios.delete(
      `${BASE_URL}/cards/${cardId}?key=${API_KEY}&token=${TOKEN}`
    );
    return true; // Indicates successful deletion
  } catch (error) {
    navigate('/ErrorPage'); // Navigate to error page on failure
    return false; // Indicates failure
  }
};
