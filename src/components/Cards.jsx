import React, { useState } from "react";
import { ListItem, ListItemText } from "@mui/material";
import CardDetailsDialog from "./CardDetailsDialog";
import DeleteCard from "./DeleteCard";

const Cards = ({ card, setCards }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <ListItem
        onClick={() => setDialogOpen(true)} 
        secondaryAction={<DeleteCard card={card} setCards={setCards} />} 
        sx={{
          bgcolor: "#005A8D",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
          marginBottom: "10px",
          padding: "10px",
          "&:hover": {
            bgcolor: "#003554",
          },
        }}
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
