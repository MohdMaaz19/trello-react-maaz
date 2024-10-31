import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const CreateBoard = ({ open, handleClose, setBoards }) => {
  const [newBoardName, setNewBoardName] = useState("");

  const handleCreateBoard = async () => {
    if (!newBoardName.trim()) {
      console.error("Board name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.trello.com/1/boards/?name=${newBoardName}&key=${
          import.meta.env.VITE_TRELLO_API_KEY
        }&token=${import.meta.env.VITE_TRELLO_TOKEN}`
      );
      setBoards((prevBoards) => [...prevBoards, response.data]);
      setNewBoardName(""); 
      handleClose();
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Board</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Board Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newBoardName}
          onChange={(e) => setNewBoardName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateBoard} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoard;
