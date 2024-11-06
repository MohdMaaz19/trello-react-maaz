import React from "react";
import { ListItem, ListItemText, Checkbox } from "@mui/material";

import DeleteChecklistItem from "./DeleteChecklistItem";
import { toggleCheckItem } from "../../API/checklistItemsApi"; 

const ChecklistItem = ({ card, item, setCheckItems, checklistId, navigate }) => {
  const handleToggleCheckItem = async () => {
    const newState = await toggleCheckItem(card.id, item.id, item.state, navigate);
    
    if (newState) {
      setCheckItems((prevItems) =>
        prevItems.map((checkItem) =>
          checkItem.id === item.id ? { ...checkItem, state: newState } : checkItem
        )
      );
    }
  };

  return (
    <ListItem>
      <Checkbox
        checked={item.state === "complete"}
        onChange={handleToggleCheckItem} // Call the toggle function on change
      />
      <ListItemText primary={item.name} />
      <DeleteChecklistItem
        item={item}
        setCheckItems={setCheckItems}
        checklistId={checklistId}
        navigate={navigate}
      />
    </ListItem>
  );
};

export default ChecklistItem;
