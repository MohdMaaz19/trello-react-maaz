import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; 

import { createBoard } from "../../API/boardsApi"; 

const CreateBoard = ({ open, handleClose, setBoards }) => {
  const [newBoardName, setNewBoardName] = useState("");
  const navigate = useNavigate(); 

  const handleCreateBoard = async () => {
    try {
      const boardData = await createBoard(newBoardName, navigate);
      if (boardData) {
        setBoards((prevBoards) => [...prevBoards, boardData]);
        setNewBoardName(""); 
        handleClose();
      }
    } catch {
      navigate('/ErrorPage'); 
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
