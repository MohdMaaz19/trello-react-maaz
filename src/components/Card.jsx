import React from "react";
import { ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Card = ({ card, onDelete }) => {
  return (
    <ListItem
      onClick={card.onClick}
      secondaryAction={
        <IconButton edge="end" onClick={(e) => onDelete(e, card.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
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
  );
};

export default Card;
