import { React, useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import AllChecklist from "./AllChecklist";
import CreateChecklist from "./CreateChecklist";
import { fetchChecklists } from "../../API/checklistApi"; // Import the API function

const CardDetailsDialog = ({ open, onClose, card, navigate }) => {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    const loadChecklists = async () => {
      if (open && card.id) {
        const data = await fetchChecklists(card.id, navigate);
        if (data) {
          setChecklists(data);
        }
      }
    };

    loadChecklists();
  }, [open, card.id, navigate]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{card.name}</DialogTitle>
      <DialogContent>
        <CreateChecklist cardId={card.id} setChecklists={setChecklists} />
        <AllChecklist
          card={card}
          checklists={checklists}
          setChecklists={setChecklists}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CardDetailsDialog;
