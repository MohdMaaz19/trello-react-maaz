import axios from 'axios';

const BASE_URL = import.meta.env.VITE_TRELLO_BASE_URL;
const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN;

export const fetchChecklists = async (cardId, navigate) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    navigate('/ErrorPage'); // Navigate to error page
  }
};

export const createChecklist = async (cardId, checklistName, navigate) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/cards/${cardId}/checklists?key=${API_KEY}&token=${TOKEN}`,
      { name: checklistName }
    );
    return response.data;
  } catch (error) {
    navigate('/ErrorPage'); // Navigate to error page
  }
};

export const deleteChecklist = async (checklistId, navigate) => {
  try {
    await axios.delete(
      `${BASE_URL}/checklists/${checklistId}?key=${API_KEY}&token=${TOKEN}`
    );
    return true; // Indicate success
  } catch (error) {
    navigate('/ErrorPage'); // Navigate to error page
    return false; // Indicate failure
  }
};
