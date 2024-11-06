import React from 'react'
import {Paper, Typography} from "@mui/material";

const Board = ({board,onClick}) => {
  return (
    <>
        <Paper
            elevation={3}
            sx={{
              padding: "20px",
              minWidth: "300px",
              minHeight: "300px",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              bgcolor: "#0079BF",
              backgroundImage:`url(${board.prefs.backgroundImage})`,
              backgroundSize: "cover",
              color: "white",
            }}
            key={board.id}
            onClick={onClick} 
            
          >
            <Typography variant="h5" gutterBottom>
              {board.name}
            </Typography>
          </Paper>


    </>
  )
}

export default Board