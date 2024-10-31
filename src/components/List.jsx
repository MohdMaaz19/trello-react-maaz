import React from 'react'
import { Paper,Typography } from '@mui/material'

const List = ({list}) => {
  return (
    <>
        <Paper
              elevation={3}
              sx={{
                padding: "20px",
                maxWidth: "300px",
                textAlign: "center",
                bgcolor: "grey",
                color: "white",
              }}
            >
              <Typography variant="h5" gutterBottom>
                {list.name}
              </Typography>
        </Paper>
    </>
  )     
}

export default List