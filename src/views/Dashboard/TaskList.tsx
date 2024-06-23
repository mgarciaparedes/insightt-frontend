import { useEffect, useState } from "react";
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
  Button,
  IconButton,
  Alert,
  Box,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

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
  loading: boolean;
}

// Define el tipo de tu objeto
interface Task {
  _id: string;
  name: string;
  createdBy: string;
  points: string;
  status: string;
  description: string;
  notes: string;
  __v: number;
}

const initialTask: Task = {
  _id: "",
  name: "",
  createdBy: "",
  points: "",
  status: "",
  description: "",
  notes: "",
  __v: 0,
};

const TaskList = ({ tasks, loading }: Props) => {
  const [selection, setSelection] = useState<Task>(initialTask);
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
                            console.log(row);
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
                            <IconButton aria-label="update" size="small">
                              <EditIcon sx={{ width: "15px" }} />
                            </IconButton>
                            <IconButton aria-label="delete" size="small">
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
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ fontSize: "10px" }}
                    >
                      Created by <b>user</b>
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
                        <b>Description:</b>&nbsp; "{selection.description}"
                      </Typography>

                      {selection.notes === "" ? (
                        <Alert severity="info" sx={{ mt: 3 }}>
                          "No notes for this task."
                        </Alert>
                      ) : (
                        <Alert severity="warning" sx={{ mt: 3 }}>
                          <b>Notes:</b> {selection.notes}
                        </Alert>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default TaskList;
