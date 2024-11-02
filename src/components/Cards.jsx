import React, { useState } from "react";
import { List } from "@mui/material";
import Card from "./Card";
import CardDetails from "./CardDetails";
import axios from "axios";

const Cards = ({ cards, setCards }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleDeleteCard = async (event, cardId) => {
    event.stopPropagation();
    try {
      await axios.delete(`https://api.trello.com/1/cards/${cardId}`, {
        params: {
          key: import.meta.env.VITE_TRELLO_API_KEY,
          token: import.meta.env.VITE_TRELLO_TOKEN,
        },
      });
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleAddChecklist = () => {
    // Logic to open checklist dialog
  };

  return (
    <>
      <List>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={{ ...card, onClick: () => setSelectedCard(card), onAddChecklist: handleAddChecklist }}
            onDelete={handleDeleteCard}
          />
        ))}
      </List>
      {selectedCard && (
        <CardDetails
          open={Boolean(selectedCard)}
          onClose={() => setSelectedCard(null)}
          card={selectedCard}
        />
      )}
    </>
  );
};

export default Cards;
