import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createChecklist } from "../../API/checklistApi"; // Import the API function

const CreateChecklist = ({ cardId, setChecklists, navigate }) => {
  const [checklistName, setChecklistName] = useState("");

  const handleCreateChecklist = async () => {
    if (!checklistName.trim()) return;

    const newChecklist = await createChecklist(cardId, checklistName, navigate);
    if (newChecklist) {
      setChecklists((prevChecklists) => [...prevChecklists, newChecklist]);
      setChecklistName(""); // Clear the input field
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
