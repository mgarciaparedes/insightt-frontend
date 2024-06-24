import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Skeleton,
  IconButton,
  Alert,
  Box,
  Snackbar,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4dabf5",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Props {
  tasks: any;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalFunction: string;
  setModalFunction: React.Dispatch<React.SetStateAction<string>>;
  selection: any;
  setSelection: React.Dispatch<React.SetStateAction<any>>;
}

const TaskList = ({
  tasks,
  setTasks,
  loading,
  open,
  setOpen,
  modalFunction,
  setModalFunction,
  selection,
  setSelection
}: Props) => {
  // const [selection, setSelection] = useState<Task>(initialTask);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => handleClose()}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const openModalToEditTask = () => {
    setOpen(true);
    setModalFunction("Edit");
  };

  const deleteTask = (id: string) => {
    const payload = { id };
    axios
      .post("/deleteTask", payload)
      .then((response) => {
        const { message, taskList } = response.data;
        if (message === "Task successfully deleted") {
          setSnackbarMessage(message);
          setShowSnackbar(true);
          setTasks(taskList);
        }
      })
      .catch(() => {
        setSnackbarMessage("Error. Try again!");
        setShowSnackbar(true);
      });
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 3 }}>
        {loading ? (
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Skeleton variant="rounded" height={200} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Task</StyledTableCell>
                      <StyledTableCell align="right">Points</StyledTableCell>
                      <StyledTableCell align="right">State</StyledTableCell>
                      <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks !== null && tasks.length > 0 ? (
                      tasks.map((row: any) => (
                        <StyledTableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                          onClick={() => {
                            setSelection(row);
                          }}
                        >
                          <StyledTableCell component="th" scope="row">
                            {row.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.points}
                          </StyledTableCell>
                          <StyledTableCell>
                            <Chip
                              label={row.status}
                              sx={{
                                bgcolor:
                                  row.status === "Done"
                                    ? "#A9DFBF"
                                    : row.status === "To Do"
                                    ? "#FCF3CF"
                                    : "#4dabf5",
                                color:
                                  row.status === "Done"
                                    ? "#196F3D"
                                    : row.status === "To Do"
                                    ? "#7D6608"
                                    : "white",
                                fontWeight: "bold",
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <IconButton
                              aria-label="update"
                              size="small"
                              onClick={() => {
                                openModalToEditTask();
                              }}
                            >
                              <EditIcon sx={{ width: "15px" }} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={() => {
                                deleteTask(row._id);
                              }}
                            >
                              <CancelIcon sx={{ width: "15px" }} />
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row" colSpan={4}>
                          There's no tasks at this moment ;)
                        </StyledTableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} lg={6}>
              {selection._id === "" ? (
                <Typography>Click on any of the tasks ;)</Typography>
              ) : (
                <Card variant="outlined" sx={{ bgcolor: "#F8F9F9" }}>
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "25px", fontWeight: "bold" }}
                    >
                      {selection.name}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      Task Points: {selection.points}
                    </Typography>
                    <Chip
                      label={selection.status}
                      sx={{
                        mt: 2,
                        fontWeight: "bold",
                        bgcolor:
                          selection.status === "Done"
                            ? "#A9DFBF"
                            : selection.status === "To Do"
                            ? "#FCF3CF"
                            : "#4dabf5",
                        color:
                          selection.status === "Done"
                            ? "#196F3D"
                            : selection.status === "To Do"
                            ? "#7D6608"
                            : "white",
                      }}
                    />
                    <Box
                      sx={{
                        mt: 3,
                        border: "1px solid #E5E7E9",
                        backgroundColor: "white",
                        p: 1,
                      }}
                    >
                      <Typography variant="body2">
                        <b>Description:</b>&nbsp; {selection.description}
                      </Typography>
                    </Box>
                    {selection.notes === "" ? (
                      <Typography variant="subtitle2" sx={{ mt: 3 }}>
                        No notes for this task!
                      </Typography>
                    ) : (
                      <Alert severity="warning" sx={{ mt: 3 }}>
                        <b>Notes:</b> {selection.notes}
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        action={action}
        onClose={() => setShowSnackbar(false)}
      />
    </>
  );
};

export default TaskList;
