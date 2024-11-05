import React from "react";
import { List } from "@mui/material";
import Checklist from "./Checklist";

const AllChecklist = ({ card, checklists, setChecklists }) => {
  return (
    <List>
      {checklists.map((checklist) => (
        <Checklist
          key={checklist.id}
          checklist={checklist}
          setChecklists={setChecklists}
          card={card}
        />
      ))}
    </List>
  );
};

export default AllChecklist;
