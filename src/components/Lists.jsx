import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Grid, Paper, Typography } from "@mui/material";
import List from "./List";

const Lists = () => {
  const [lists, setList] = useState([]);
  const { boardId } = useParams();
  const { VITE_TRELLO_API_KEY, VITE_TRELLO_TOKEN } = import.meta.env; 

  useEffect(() => {
    const boardList = async () => {
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
        setList(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error); 
      }
    };
    boardList();
  }, [boardId]);

  return (
    <Box p={4}>
      <Grid container spacing={3} justifyContent="center">
        {lists.map((list) => (
          <Grid item key={list.id} xs={12} sm={6} md={4} lg={3}>
            <List list={list} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper
            elevation={3}
            sx={{
              padding: "20px",
              maxWidth: "300px",
              aspectRatio: "1:1",
              textAlign: "center",
              bgcolor: "grey",
              color: "white",
            }}
            //   onClick={handleClickOpen}
          >
            <Typography variant="h5" gutterBottom>
              Create a new List +
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Lists;
