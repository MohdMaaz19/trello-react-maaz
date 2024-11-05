import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  List as MuiList,
  Button,
  TextField,
  Box,
} from "@mui/material";
import axios from "axios";
import Cards from "./Cards";
import DeleteList from "./DeleteList"; // Import the DeleteList component

const List = ({ list, setLists }) => {
  const [cards, setCards] = useState([]);
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [newCardName, setNewCardName] = useState("");

  const fetchCards = async () => {
    try {
      const response = await axios.get(
        `https://api.trello.com/1/lists/${list.id}/cards`,
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );
      setCards(response.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  const handleAddCard = async () => {
    if (newCardName.trim() === "") return;
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards`,
        { name: newCardName, idList: list.id },
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );
      setCards((prevCards) => [...prevCards, response.data]);
      setShowAddCardInput(false);
      setNewCardName("");
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [list.id]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        minWidth: "300px",
        textAlign: "center",
        bgcolor: "#0079BF",
        color: "white",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {list.name}
      </Typography>

      {/* Include the DeleteList component */}
      <DeleteList list={list} setLists={setLists} />

      <MuiList sx={{ marginTop: "10px" }}>
        {cards.map((card) => (
          <Cards key={card.id} card={card} setCards={setCards} />
        ))}
      </MuiList>

      {showAddCardInput ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
          }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter card name"
            value={newCardName}
            onChange={(e) => setNewCardName(e.target.value)}
          />
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button variant="contained" color="primary" onClick={handleAddCard}>
              Add
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setShowAddCardInput(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowAddCardInput(true)}
          sx={{ marginTop: "10px" }}
        >
          Add Card
        </Button>
      )}
    </Paper>
  );
};

export default List;
