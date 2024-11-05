import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Paper, Typography } from "@mui/material";
import List from "./List";
import CreateList from "./CreateList";

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [isAdding, setIsAdding] = useState(false); 
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
      <Box
        sx={{
          display: 'flex',
          overflowX: 'scroll',
          minHeight: '80vh',
          gap: '16px',
          padding: '16px',
          position: 'relative',
          bottom: 0, 
          borderTop: '1px solid #ddd', 
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
    
        }}
      >
        {lists.map((list) => (
          <Box key={list.id} sx={{ flexShrink: 0 }}>
            <List list={list} setLists={setLists} />
          </Box>
        ))}
        <Box sx={{ flexShrink: 0 }}>
          {isAdding ? (
            <CreateList setIsAdding={setIsAdding} setLists={setLists} boardId={boardId} />
          ) : (
            <Paper
              elevation={3}
              sx={{
                padding: "20px",
                minWidth: "300px",
                textAlign: "center",
                bgcolor: "#00B0E1",
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
        </Box>
      </Box>
    </Box>
  );
};

export default Lists;