import React, { useState } from "react";
import { Paper, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";

const List = ({ list,setLists }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const archiveList = async () => {
    try {
      await axios.put(
        `https://api.trello.com/1/lists/${list.id}/closed`,
        { value: true },
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );
      setLists((previousList)=>previousList.filter((l)=>l.id!==list.id))
    } catch (error) {
      console.error("Error archiving the list:", error);
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
        position: "relative",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {list.name}
      </Typography>

      <IconButton
        aria-label="more options"
        aria-controls="more-options-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ position: "absolute", top: -10, right: -5, color: "white" }} // Adjust top and right values
        >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="more-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            archiveList();
          }}
        >
          Archive this list
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default List;
