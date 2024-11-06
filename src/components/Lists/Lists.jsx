import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Paper, Typography, CircularProgress } from "@mui/material";
import List from "./List";
import CreateList from "./CreateList";
import { getLists } from "../../API/listApi"; // Import the getLists function

const Lists = () => {
  const [lists, setLists] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true); 
  const { boardId } = useParams();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchLists = async () => {
      setLoading(true);
      try {
        const data = await getLists(boardId); // Use the getLists function
        setLists(data);
      } catch (error) {
        navigate('/ErrorPage'); // Navigate to error page on error
      } finally {
        setLoading(false);
      }
    };
    fetchLists();
  }, [boardId, navigate]);

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
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default Lists;
