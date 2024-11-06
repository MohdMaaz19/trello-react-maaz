import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteCheckItem } from "../../API/checklistItemsApi"; 

const DeleteChecklistItem = ({ item, checklistId, setCheckItems, navigate }) => {
  const handleDeleteCheckItem = async () => {
    await deleteCheckItem(checklistId, item.id, navigate); 
    
    setCheckItems((prevItems) => prevItems.filter((checkItem) => checkItem.id !== item.id));
  };

  return (
    <IconButton onClick={handleDeleteCheckItem} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteChecklistItem;
