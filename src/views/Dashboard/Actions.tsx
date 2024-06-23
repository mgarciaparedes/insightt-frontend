import React from "react";
import { TextField, Button, Grid, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Actions = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: 4 }} alignItems="center">
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              label="Search"
              fullWidth
              // Aquí puedes agregar más props según tus necesidades
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              fullWidth
              // Aquí puedes agregar más props según tus necesidades
            >
              Add new task
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Actions;
