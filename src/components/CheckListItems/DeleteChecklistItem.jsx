import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const DeleteChecklistItem = ({ item, checklistId, setCheckItems }) => {
  // Function to handle deleting the check item
  const handleDeleteCheckItem = async () => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checklistId}/checkItems/${item.id}`,
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );

      // Remove the item from local state
      setCheckItems((prevItems) => prevItems.filter((checkItem) => checkItem.id !== item.id));
    } catch (error) {
      console.error("Error deleting check item:", error);
    }
  };

  return (
    <IconButton onClick={handleDeleteCheckItem} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteChecklistItem;
