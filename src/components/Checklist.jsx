import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckItem from "./CheckItem"; // Import CheckItem component
import axios from "axios";

const Checklist = ({ checklist, cardId, setChecklists }) => {
  const [newCheckItemTitle, setNewCheckItemTitle] = useState("");

  const handleDeleteChecklist = async () => {
    try {
      await axios.delete(`https://api.trello.com/1/checklists/${checklist.id}`, {
        params: {
          key: import.meta.env.VITE_TRELLO_API_KEY,
          token: import.meta.env.VITE_TRELLO_TOKEN,
        },
      });
      setChecklists((prev) => prev.filter((c) => c.id !== checklist.id));
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  const handleAddCheckItem = async () => {
    if (newCheckItemTitle.trim()) {
      try {
        const response = await axios.post(
          `https://api.trello.com/1/checklists/${checklist.id}/checkItems`,
          { name: newCheckItemTitle },
          {
            params: {
              key: import.meta.env.VITE_TRELLO_API_KEY,
              token: import.meta.env.VITE_TRELLO_TOKEN,
            },
          }
        );
        setNewCheckItemTitle("");
      } catch (error) {
        console.error("Error adding check item:", error);
      }
    }
  };

  return (
    <Box sx={{ border: "1px solid #ccc", padding: 2, marginBottom: 2 }}>
      <ListItem
        secondaryAction={
          <IconButton onClick={handleDeleteChecklist} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemText primary={checklist.name} />
      </ListItem>
      {/* Add CheckItem component here */}
      <TextField
        variant="outlined"
        size="small"
        value={newCheckItemTitle}
        onChange={(e) => setNewCheckItemTitle(e.target.value)}
        label="Add Item"
        fullWidth
      />
      <Button onClick={handleAddCheckItem}>Add</Button>
      {/* Render CheckItems here */}
    </Box>
  );
};

export default Checklist;
