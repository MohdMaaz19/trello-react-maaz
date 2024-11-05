import React, { useEffect, useState } from "react";
import { List, Box, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import ChecklistItem from "./ChecklistItem";
import CreateChecklistItem from "./CreateChecklistItem";

const ChecklistItems = ({ checklistId, card }) => {
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

  const completedItemsCount = checkItems.filter(
    (item) => item.state === "complete"
  ).length;
  const totalItemsCount = checkItems.length;
  const completionPercentage =
    totalItemsCount > 0 ? (completedItemsCount / totalItemsCount) * 100 : 0;

  return (
    <Box>
      <Typography variant="body2" color="textSecondary">{`${Math.round(
        completionPercentage
      )}%`}</Typography>
      <LinearProgress
        variant="determinate"
        value={completionPercentage}
        sx={{ marginBottom: 2 }}
      />

      <List>
        {checkItems.map((item) => (
          <ChecklistItem
            key={item.id}
            item={item}
            checklistId={checklistId}
            setCheckItems={setCheckItems}
            card={card}
          />
        ))}
      </List>

      <CreateChecklistItem
        checklistId={checklistId}
        setCheckItems={setCheckItems}
      />
    </Box>
  );
};

export default ChecklistItems;
