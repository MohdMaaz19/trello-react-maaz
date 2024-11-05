import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const DeleteCard = ({ card, setCards }) => {
  const handleDeleteCard = async (event) => {
    event.stopPropagation(); // Prevent click from propagating to ListItem
    try {
      await axios.delete(`https://api.trello.com/1/cards/${card.id}`, {
        params: {
          key: import.meta.env.VITE_TRELLO_API_KEY,
          token: import.meta.env.VITE_TRELLO_TOKEN,
        },
      });
      setCards((previousState) =>
        previousState.filter((c) => c.id !== card.id)
      );
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return (
    <IconButton edge="end" onClick={handleDeleteCard} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteCard;
