import axios from 'axios';

const BASE_URL = import.meta.env.VITE_TRELLO_BASE_URL;
const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN;

export const createList = async (boardId, listName, navigate) => {
  if (listName.trim() === "") return; // Prevent empty lists
  try {
    const response = await axios.post(
      `${BASE_URL}/lists?key=${API_KEY}&token=${TOKEN}&name=${listName}&idBoard=${boardId}`
    );
    return response.data; // Return the created list data
  } catch (error) {
    navigate('/ErrorPage'); // Navigate to error page
  }
};

export const deleteList = async (listId, navigate) => {
  try {
    await axios.put(
      `${BASE_URL}/lists/${listId}/closed?key=${API_KEY}&token=${TOKEN}`,
      { value: true }
    );
    return true; // Indicate success
  } catch (error) {
    navigate('/ErrorPage'); // Navigate to error page
    return false; // Indicate failure
  }
};

export const getLists = async (boardId, navigate) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/boards/${boardId}/lists?key=${API_KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    navigate('/ErrorPage'); // Navigate to error page
  }
};
