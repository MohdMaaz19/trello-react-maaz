import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const CardDetailsDialog = ({ open, onClose, card }) => {
  const [checklists, setChecklists] = useState([]);
  const [checklistDialogOpen, setChecklistDialogOpen] = useState(false);
  const [newChecklistTitle, setNewChecklistTitle] = useState("");
  const [checkItems, setCheckItems] = useState({});
  const [newCheckItemTitle, setNewCheckItemTitle] = useState("");
  const [activeChecklistId, setActiveChecklistId] = useState(null);

  useEffect(() => {
    const fetchChecklistsAndItems = async () => {
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

          const fetchedChecklists = response.data;
          setChecklists(fetchedChecklists);

          const checkItemsPromises = fetchedChecklists.map((checklist) =>
            axios.get(
              `https://api.trello.com/1/checklists/${checklist.id}/checkItems`,
              {
                params: {
                  key: import.meta.env.VITE_TRELLO_API_KEY,
                  token: import.meta.env.VITE_TRELLO_TOKEN,
                },
              }
            )
          );

          const checkItemsResponses = await Promise.all(checkItemsPromises);
          const checkItemsData = checkItemsResponses.reduce((acc, response, index) => {
            acc[fetchedChecklists[index].id] = response.data;
            return acc;
          }, {});
          setCheckItems(checkItemsData);
        } catch (error) {
          console.error("Error fetching checklists or check items:", error);
        }
      }
    };

    fetchChecklistsAndItems();
  }, [open, card.id]);

  const handleAddChecklist = async () => {
    if (newChecklistTitle.trim()) {
      try {
        const response = await axios.post(
          `https://api.trello.com/1/cards/${card.id}/checklists`,
          {
            name: newChecklistTitle,
          },
          {
            params: {
              key: import.meta.env.VITE_TRELLO_API_KEY,
              token: import.meta.env.VITE_TRELLO_TOKEN,
            },
          }
        );

        const newChecklist = {
          id: response.data.id,
          name: newChecklistTitle,
        };
        setChecklists((prevChecklists) => [...prevChecklists, newChecklist]);
        setNewChecklistTitle("");
        setChecklistDialogOpen(false);
      } catch (error) {
        console.error("Error creating checklist:", error);
      }
    }
  };

  const handleDeleteChecklist = async (checklistId) => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checklistId}`,
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );

      setChecklists((prevChecklists) =>
        prevChecklists.filter((checklist) => checklist.id !== checklistId)
      );
      setCheckItems((prevCheckItems) => {
        const updatedCheckItems = { ...prevCheckItems };
        delete updatedCheckItems[checklistId];
        return updatedCheckItems;
      });
    } catch (error) {
      console.error("Error deleting checklist:", error);
    }
  };

  const handleAddCheckItem = async (checklistId) => {
    if (newCheckItemTitle.trim() && checklistId) {
      try {
        const response = await axios.post(
          `https://api.trello.com/1/checklists/${checklistId}/checkItems`,
          {
            name: newCheckItemTitle,
          },
          {
            params: {
              key: import.meta.env.VITE_TRELLO_API_KEY,
              token: import.meta.env.VITE_TRELLO_TOKEN,
            },
          }
        );

        setCheckItems((prevCheckItems) => ({
          ...prevCheckItems,
          [checklistId]: [
            ...(prevCheckItems[checklistId] || []),
            response.data,
          ],
        }));
        setNewCheckItemTitle("");
        setActiveChecklistId(null);
      } catch (error) {
        console.error("Error creating check item:", error);
      }
    }
  };

  const handleDeleteCheckItem = async (checklistId, checkItemId) => {
    try {
      await axios.delete(
        `https://api.trello.com/1/checklists/${checklistId}/checkItems/${checkItemId}`,
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );

      setCheckItems((prevCheckItems) => ({
        ...prevCheckItems,
        [checklistId]: prevCheckItems[checklistId].filter(
          (item) => item.id !== checkItemId
        ),
      }));
    } catch (error) {
      console.error("Error deleting check item:", error);
    }
  };

  const handleToggleCheckItem = async (checklistId, checkItem) => {
    try {
      const updatedState = checkItem.state === "complete" ? "incomplete" : "complete";
      await axios.put(
        `https://api.trello.com/1/cards/${card.id}/checkItem/${checkItem.id}`,
        {
          state: updatedState,
        },
        {
          params: {
            key: import.meta.env.VITE_TRELLO_API_KEY,
            token: import.meta.env.VITE_TRELLO_TOKEN,
          },
        }
      );

      setCheckItems((prevCheckItems) => ({
        ...prevCheckItems,
        [checklistId]: prevCheckItems[checklistId].map((item) =>
          item.id === checkItem.id ? { ...item, state: updatedState } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating check item state:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{card.name}</DialogTitle>
      <DialogContent>
        <Button variant="outlined" onClick={() => setChecklistDialogOpen(true)}>
          Add Checklist
        </Button>

        <List sx={{ marginTop: 2 }}>
          {checklists.map((checklist) => (
            <React.Fragment key={checklist.id}>
              <ListItem
                secondaryAction={
                  <IconButton onClick={() => handleDeleteChecklist(checklist.id)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={checklist.name} />
              </ListItem>
              {checkItems[checklist.id]?.map((item) => (
                <ListItem key={item.id} sx={{ paddingLeft: 4 }}
                  secondaryAction={
                    <IconButton onClick={() => handleDeleteCheckItem(checklist.id, item.id)} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Checkbox
                    checked={item.state === "complete"}
                    onChange={() => handleToggleCheckItem(checklist.id, item)}
                  />
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}

              <ListItem>
                <TextField
                  variant="outlined"
                  size="small"
                  value={activeChecklistId === checklist.id ? newCheckItemTitle : ""}
                  onChange={(e) => {
                    setNewCheckItemTitle(e.target.value);
                    setActiveChecklistId(checklist.id);
                  }}
                  label="Add Item"
                  fullWidth
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddCheckItem(checklist.id)}
                  sx={{ marginLeft: 1 }}
                >
                  Add
                </Button>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </DialogContent>

      <Dialog
        open={checklistDialogOpen}
        onClose={() => setChecklistDialogOpen(false)}
      >
        <DialogTitle>Add Checklist</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={newChecklistTitle}
            onChange={(e) => setNewChecklistTitle(e.target.value)}
            label="Checklist Title"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddChecklist}
            sx={{ marginTop: 2 }}
          >
            Add
          </Button>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};

export default CardDetailsDialog;
