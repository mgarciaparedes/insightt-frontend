import React from "react";
import { TextField, Button, Grid, Container, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setModalFunction: React.Dispatch<React.SetStateAction<string>>;
}

const Actions = ({ setOpen, setModalFunction }: Props) => {
  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ mt: 4 }} alignItems="center">
          <Grid item xs={12} sm={6} md={8} lg={10}>
            <TextField
              variant="outlined"
              label="Search"
              fullWidth
              // Aquí puedes agregar más props según tus necesidades
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              fullWidth
              onClick={() => {
                setOpen(true);
                setModalFunction("Add");
              }}
            >
              Add new task
            </Button>
          </Grid>
          <Grid item mt={3} mb={1} xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Actions;
