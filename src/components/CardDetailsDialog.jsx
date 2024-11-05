// CardDetailsDialog.jsx

import { React, useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import AllChecklist from "./AllChecklist";
import CreateChecklist from "./CreateChecklist"; // Import CreateChecklist
import axios from "axios";

const CardDetailsDialog = ({ open, onClose, card }) => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const fetchChecklists = async () => {
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
    };

    if (open) {
      fetchChecklists();
    }
  }, [open, card.id]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{card.name}</DialogTitle>
      <DialogContent>
        <CreateChecklist cardId={card.id} setChecklists={setChecklists} />
        <AllChecklist card={card} checklists={checklists} setChecklists={setChecklists} />
      </DialogContent>
    </Dialog>
  );
};

export default CardDetailsDialog;
