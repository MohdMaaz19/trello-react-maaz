import axios from "axios";

const BASE_URL = import.meta.env.VITE_TRELLO_BASE_URL;
const API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
const TOKEN = import.meta.env.VITE_TRELLO_TOKEN;

export const fetchCheckItems = async (checklistId, navigate) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/checklists/${checklistId}/checkItems?key=${API_KEY}&token=${TOKEN}`
    );
    return response.data;
  } catch (error) {
    navigate('/ErrorPage');
  }
};

export const createCheckItem = async (checklistId, newCheckItemTitle, navigate) => {
  if (!newCheckItemTitle.trim()) return;

  try {
    const response = await axios.post(
      `${BASE_URL}/checklists/${checklistId}/checkItems?key=${API_KEY}&token=${TOKEN}`,
      { name: newCheckItemTitle, checked: false }
    );
    return response.data;
  } catch (error) {
    navigate('/ErrorPage');
  }
};

export const deleteCheckItem = async (checklistId, itemId, navigate) => {
  try {
    await axios.delete(
      `${BASE_URL}/checklists/${checklistId}/checkItems/${itemId}?key=${API_KEY}&token=${TOKEN}`
    );
  } catch (error) {
    navigate('/ErrorPage');
  }
};

export const toggleCheckItem = async (cardId, itemId, currentState, navigate) => {
  const newState = currentState === "complete" ? "incomplete" : "complete";
  try {
    await axios.put(
      `${BASE_URL}/cards/${cardId}/checkItem/${itemId}?key=${API_KEY}&token=${TOKEN}`,
      { state: newState }
    );
    return newState;
  } catch (error) {
    navigate('/ErrorPage');
  }
};
