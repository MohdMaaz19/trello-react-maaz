import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createCheckItem } from "../../API/checklistItemsApi";
const CreateChecklistItem = ({ checklistId, setCheckItems, navigate }) => {
  const [newCheckItemTitle, setNewCheckItemTitle] = useState("");

  const handleAddCheckItem = async () => {
    const newCheckItem = await createCheckItem(checklistId, newCheckItemTitle, navigate); 
    if (newCheckItem) {
      setCheckItems((prevItems) => [...prevItems, newCheckItem]); 
      setNewCheckItemTitle("");
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
