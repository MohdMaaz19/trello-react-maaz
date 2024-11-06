import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import AllChecklist from "./AllChecklist";
import CreateChecklist from "./CreateChecklist";
import { fetchChecklists } from "../../API/checklistApi"; 

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
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {card.name}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
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
