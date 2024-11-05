import React from "react";
import { ListItem, ListItemText, Checkbox } from "@mui/material";
import DeleteChecklistItem from "./DeleteChecklistItem";
import axios from "axios";

const ChecklistItem = ({ card, item, setCheckItems, checklistId }) => {
  const handleToggleCheckItem = async () => {
    try {
      const newState = item.state === "complete" ? "incomplete" : "complete";
      await axios.put(
        `https://api.trello.com/1/cards/${card.id}/checkItem/${item.id}`,
        { state: newState },
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );

      // Update the state of check items locally
      setCheckItems((prevItems) =>
        prevItems.map((checkItem) =>
          checkItem.id === item.id
            ? { ...checkItem, state: newState }
            : checkItem
        )
      );
    } catch (error) {
      console.error("Error toggling check item:", error);
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
      />
    </ListItem>
  );
};

export default ChecklistItem;
