// CreateChecklist.jsx

import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const CreateChecklist = ({ cardId, setChecklists }) => {
  const [checklistName, setChecklistName] = useState("");

  const handleCreateChecklist = async () => {
    if (!checklistName.trim()) return;

    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards/${cardId}/checklists`,
        { name: checklistName },
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );

      setChecklists((prevChecklists) => [...prevChecklists, response.data]);
      setChecklistName(""); // Clear the input field
    } catch (error) {
      console.error("Error adding checklist:", error);
    }
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        variant="outlined"
        size="small"
        label="New Checklist"
        value={checklistName}
        onChange={(e) => setChecklistName(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleCreateChecklist}>
        Add
      </Button>
    </Box>
  );
};

export default CreateChecklist;
