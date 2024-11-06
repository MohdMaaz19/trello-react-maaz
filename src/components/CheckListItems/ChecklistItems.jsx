import React, { useEffect, useState } from "react";
import { List, Box, LinearProgress, Typography } from "@mui/material";

import { fetchCheckItems } from "../../API/checklistItemsApi"; 
import ChecklistItem from "./ChecklistItem";
import CreateChecklistItem from "./CreateChecklistItem";

const ChecklistItems = ({ checklistId, card, navigate }) => {
  const [checkItems, setCheckItems] = useState([]);

  useEffect(() => {
    const getCheckItems = async () => {
      const items = await fetchCheckItems(checklistId, navigate);
      if (items) {
        setCheckItems(items);
      }
    };

    getCheckItems();
  }, [checklistId, navigate]);

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
