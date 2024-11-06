import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCard } from "../../API/cardsApi";
import { useNavigate } from "react-router-dom";

const DeleteCard = ({ card, setCards }) => {
  const navigate = useNavigate();

  const handleDeleteCard = async (event) => {
    event.stopPropagation();
    const success = await deleteCard(card.id, navigate);
    if (success) {
      setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
    }
  };

  return (
    <IconButton edge="end" onClick={handleDeleteCard} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteCard;
