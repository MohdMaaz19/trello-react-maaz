import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import axios from "axios";

const DeleteList = ({ list, setLists }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
      setLists((previousList) => previousList.filter((l) => l.id !== list.id));
    } catch (error) {
      console.error("Error archiving the list:", error);
    }
    handleClose(); // Close the menu after action
  };

  return (
    <>
      <IconButton
        aria-label="more options"
        aria-controls="more-options-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ position: "absolute", top: -10, right: -5, color: "white" }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id="more-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={archiveList}>
          Archive this list
        </MenuItem>
      </Menu>
    </>
  );
};

export default DeleteList;
