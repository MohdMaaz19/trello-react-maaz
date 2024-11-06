import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { deleteList } from "../../API/listApi"; // Import deleteList

const DeleteList = ({ list, setLists, navigate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleArchiveList = async () => {
    const success = await deleteList(list.id, navigate); // Use deleteList function
    if (success) {
      setLists((previousList) => previousList.filter((l) => l.id !== list.id));
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
        <MenuItem onClick={handleArchiveList}>
          Archive this list
        </MenuItem>
      </Menu>
    </>
  );
};

export default DeleteList;
