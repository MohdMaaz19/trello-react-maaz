import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteChecklist } from "../../API/checklistApi"; 

const DeleteChecklist = ({ checklistId, setChecklists, navigate }) => {
  const handleDeleteChecklist = async () => {
    const deleteCheckList = await deleteChecklist(checklistId, navigate); 

    if (deleteCheckList) {
      setChecklists((prevChecklists) =>
        prevChecklists.filter((checklist) => checklist.id !== checklistId)
      );
    }
  };

  return (
    <IconButton onClick={handleDeleteChecklist} aria-label="delete">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteChecklist;
