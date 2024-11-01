import React, { useState } from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import CardDetailsDialog from "./CardDetailsDialog";

const Cards = ({ card, setCards }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
    <>
      <ListItem
        button
        onClick={() => setDialogOpen(true)} // Open dialog on click
        secondaryAction={
          <IconButton edge="end" onClick={handleDeleteCard} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={card.name} />
      </ListItem>
      <CardDetailsDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        card={card}
      />
    </>
  );
};

export default Cards;
