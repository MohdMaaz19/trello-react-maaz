import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
  Box,
} from "@mui/material";
import Checklist from "./Checklist"; // Import the Checklist component
import axios from "axios";

const CardDetails = ({ open, onClose, card }) => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchChecklists = async () => {
      if (open) {
        try {
          const response = await axios.get(
            `https://api.trello.com/1/cards/${card.id}/checklists`,
            {
              params: {
                key: import.meta.env.VITE_TRELLO_API_KEY,
                token: import.meta.env.VITE_TRELLO_TOKEN,
              },
            }
          );
          setChecklists(response.data);
        } catch (error) {
          console.error("Error fetching checklists:", error);
        }
      }
    };

    fetchChecklists();
  }, [open, card.id]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{card.name}</DialogTitle>
      <DialogContent>
        <Button variant="outlined" onClick={card.onAddChecklist}>
          Add Checklist
        </Button>
        <List>
          {checklists.map((checklist) => (
            <Checklist
              key={checklist.id}
              checklist={checklist}
              cardId={card.id}
              setChecklists={setChecklists}
            />
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetails;
