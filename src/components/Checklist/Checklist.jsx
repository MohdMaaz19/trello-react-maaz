import React from "react";
import { ListItem, ListItemText, Box } from "@mui/material";

import ChecklistItems from "../CheckListItems/ChecklistItems"; 
import DeleteChecklist from "./DeleteChecklist"; 

const Checklist = ({ card, checklist, setChecklists }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <ListItem
        secondaryAction={
          <DeleteChecklist
            checklistId={checklist.id}
            setChecklists={setChecklists}
          />
        }
      >
        <ListItemText primary={checklist.name} />
      </ListItem>

      {/* Integrate CheckListItems component */}
      <ChecklistItems checklistId={checklist.id} card={card} />
    </Box>
  );
};

export default Checklist;
