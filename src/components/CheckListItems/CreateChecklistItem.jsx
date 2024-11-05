import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const CreateChecklistItem = ({ checklistId, setCheckItems }) => {
  const [newCheckItemTitle, setNewCheckItemTitle] = useState("");

  const handleAddCheckItem = async () => {
    if (newCheckItemTitle.trim()) {
      try {
        const response = await axios.post(
          `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
          { name: newCheckItemTitle, checked: false },
          {
            params: {
              key: import.meta.env.VITE_TRELLO_API_KEY,
              token: import.meta.env.VITE_TRELLO_TOKEN,
            },
          }
        );

        // Update local state with the new check item
        setCheckItems((prevItems) => [...prevItems, response.data]);
        setNewCheckItemTitle("");
      } catch (error) {
        console.error("Error adding check item:", error);
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" sx={{ marginBottom: 1 }}>
      <TextField
        variant="outlined"
        size="small"
        value={newCheckItemTitle}
        onChange={(e) => setNewCheckItemTitle(e.target.value)}
        label="Add New Item"
        sx={{ marginRight: 2 }}
      />
      <Button onClick={handleAddCheckItem} variant="contained">
        Add
      </Button>
    </Box>
  );
};

export default CreateChecklistItem;
