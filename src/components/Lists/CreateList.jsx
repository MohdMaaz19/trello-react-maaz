import React, { useState } from "react";
import { Box, Paper, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { createList } from "../../API/listApi"; // Import the createList function

const CreateList = ({ setIsAdding, setLists, boardId, navigate }) => { // Add navigate as a prop
  const [newListName, setNewListName] = useState(""); // State for the new list name

  const handleAddList = async () => {
    if (newListName.trim() === "") return; // Prevent empty lists
    try {
      const newList = await createList(boardId, newListName, navigate); // Use createList
      setLists((previousList) => [...previousList, newList]);
      setNewListName("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding new list:", error.message);
      navigate('/ErrorPage'); // Navigate to error page on error
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        minWidth: "300px",
        textAlign: "center",
        bgcolor: "#00B0E1",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <TextField
        label="List Name"
        variant="outlined"
        fullWidth
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddList}
          sx={{ bgcolor: "white", color: "#00B0E1" }}
        >
          Add List
        </Button>
        <IconButton color="error" onClick={() => setIsAdding(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CreateList;
