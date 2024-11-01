import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2"
import List from "./List";
import CreateList from "./CreateList";

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [isAdding, setIsAdding] = useState(false); // State to manage form visibility
  const { boardId } = useParams();
  const { VITE_TRELLO_API_KEY, VITE_TRELLO_TOKEN } = import.meta.env;

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(
          `https://api.trello.com/1/boards/${boardId}/lists`,
          {
            params: {
              key: VITE_TRELLO_API_KEY,
              token: VITE_TRELLO_TOKEN,
            },
          }
        );
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };
    fetchLists();
  }, [boardId]);

  return (
    <Box p={4}>
      <Grid container spacing={3} justifyContent="center">
        {lists.map((list) => (
          <Grid item key={list.id} xs={12} sm={6} md={4} lg={3}>
            <List list={list} setLists={setLists} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          {isAdding ? (
            <CreateList  setIsAdding={setIsAdding} setLists={setLists} boardId={boardId}/>
          ) : (
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                maxWidth: "300px",
                aspectRatio: "1:1",
                textAlign: "center",
                bgcolor: "grey",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => setIsAdding(true)}
            >
              <Typography variant="h5" gutterBottom>
                Create a new List +
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lists;
