import React from "react";
import { ListItem, ListItemText, IconButton, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CheckItem = ({ item, onDelete, onToggle }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        checked={item.state === "complete"}
        onChange={onToggle}
      />
      <ListItemText primary={item.name} />
    </ListItem>
  );
};

export default CheckItem;
