import React, { useEffect, useState } from "react";
import { List, Box } from "@mui/material";
import axios from "axios";
import ChecklistItem from "./ChecklistItem";
import CreateChecklistItem from "./CreateChecklistItem"; // Import the new component

const ChecklistItems = ({ checklistId,card }) => {
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    const fetchCheckItems = async () => {
      try {
        const response = await axios.get(
          `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
          {
            params: {
              key: import.meta.env.VITE_TRELLO_API_KEY,
              token: import.meta.env.VITE_TRELLO_TOKEN,
            },
          }
        );
        setCheckItems(response.data);
      } catch (error) {
        console.error("Error fetching check items:", error);
      }
    };

    fetchCheckItems();
  }, [checklistId]);

  return (
    <Box>
      <List>
        {checkItems.map((item) => (
          <ChecklistItem
            key={item.id}
            checkItem={item}
            checklistId={checklistId}
            setCheckItems={setCheckItems}
            card={card}
          />
        ))}
      </List>

      {/* Include the new CreateChecklistItem component */}
      <CreateChecklistItem checklistId={checklistId} setCheckItems={setCheckItems} />
    </Box>
  );
};

export default ChecklistItems;
