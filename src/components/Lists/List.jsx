import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  List as MuiList,
  Button,
  TextField,
  Box,
} from "@mui/material";

import Cards from "../Cards/Cards";
import DeleteList from "./DeleteList";
import { createCard, getCards } from "../../API/cardsApi";

const List = ({ list, setLists, navigate }) => {
  const [cards, setCards] = useState([]);
  const [showAddCardInput, setShowAddCardInput] = useState(false);
  const [newCardName, setNewCardName] = useState("");

  const fetchCards = async () => {
    try {
      const data = await getCards(list.id, navigate);
      setCards(data);
    } catch (error) {
      navigate("/ErrorPage");
    }
  };

  const handleAddCard = async () => {
    if (newCardName.trim() === "") return;
    const cardData = await createCard(list.id, newCardName, navigate);
    if (cardData) {
      setCards((prevCards) => [...prevCards, cardData]);
      setShowAddCardInput(false);
      setNewCardName("");
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
