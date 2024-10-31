import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import Board from "./Board";
import CreateBoard from "./CreateBoard";
import { useNavigate } from "react-router-dom";

const Boards = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = useState(false);

  const handleBoardClick = (boardId) => {
    navigate(`boards/${boardId}`);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get(
          `https://api.trello.com/1/members/me/boards`,
          {
            params: {
              key: import.meta.env.VITE_TRELLO_API_KEY,
              token: import.meta.env.VITE_TRELLO_TOKEN,
            },
          }
        );
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Box p={4}>
        <Grid container spacing={3} justifyContent="center">
          {boards.map((board) => (
            <Grid item key={board.id} xs={12} sm={6} md={4} lg={3}>
              <Board
                board={board}
                onClick={() => {
                  handleBoardClick(board.id);
                }}
              />
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
              onClick={handleClickOpen}
            >
              <Typography variant="h5" gutterBottom>
                Create a new Board +
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <CreateBoard
        open={open}
        handleClose={handleClose}
        setBoards={setBoards}
      />
    </>
  );
};

export default Boards;
