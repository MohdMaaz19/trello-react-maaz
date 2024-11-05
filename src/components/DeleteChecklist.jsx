// DeleteChecklist.jsx

import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const DeleteChecklist = ({ checklistId, setChecklists }) => {
  const handleDeleteChecklist = async () => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checklistId}`,
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );

      // Update the checklists state after deletion
      setChecklists((prevChecklists) =>
        prevChecklists.filter((checklist) => checklist.id !== checklistId)
      );
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  return (
    <IconButton onClick={handleDeleteChecklist} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteChecklist;
