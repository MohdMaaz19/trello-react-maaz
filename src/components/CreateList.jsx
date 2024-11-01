import {React,useState} from "react";
import { Box, Paper, TextField, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const CreateList = ({ setIsAdding, setLists,boardId }) => {

  const [newListName, setNewListName] = useState(""); // State for the new list name
  const { VITE_TRELLO_API_KEY, VITE_TRELLO_TOKEN } = import.meta.env;
  const handleAddList = async () => {
    if (newListName.trim() === "") return; // Prevent empty lists
    try {
      const response = await axios.post(
        `https://api.trello.com/1/lists`,
        null,
        {
          params: {
            name: newListName,
            idBoard: boardId,
            key: VITE_TRELLO_API_KEY,
            token: VITE_TRELLO_TOKEN,
          },
        }
      );
      setLists((previousList)=>[...previousList, response.data]);
      setNewListName("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding new list:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        maxWidth: "300px",
        textAlign: "center",
        bgcolor: "grey",
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
        <IconButton color="primary" onClick={handleAddList}>
          <AddIcon />
        </IconButton>
        <IconButton color="error" onClick={() => setIsAdding(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default CreateList;
