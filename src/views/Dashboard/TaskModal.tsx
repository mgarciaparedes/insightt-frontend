import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  MenuItem,
  TextField,
  Container,
  Snackbar,
  IconButton,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object({
  name: yup.string().required("Task name is required"),
  points: yup
    .number()
    .required("Task points are required")
    .positive("Task points must be positive"),
  description: yup.string().required("Task description is required"),
  status: yup.string().required("Status is required"),
  notes: yup.string().nullable().notRequired(),
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 5,
  p: 4,
};

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: any;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  modalFunction: string;
  selection: any;
}

const TaskModal = ({
  open,
  setOpen,
  tasks,
  setTasks,
  modalFunction,
  selection,
}: Props) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const statusOptions = ["To Do", "In Progress", "Done"];

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

  const formik = useFormik({
    initialValues: {
      name: "",
      points: "",
      description: "",
      status: "",
      notes: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (modalFunction === "Add") {
        saveNewTask(values);
      } else {
        updateTask(values);
      }
    },
  });

  useEffect(() => {
    if (modalFunction === "Edit") {
      formik.setFieldValue("name", selection.name);
      formik.setFieldValue("points", selection.points);
      formik.setFieldValue("description", selection.description);
      formik.setFieldValue("status", selection.status);
      formik.setFieldValue("notes", selection.notes);
    }
  }, [modalFunction, selection]);

  const saveNewTask = (values: any) => {
    axios
      .post("/saveNewTask", values)
      .then((response: any) => {
        const { message, taskList } = response.data;
        if (message === "Task created successfully") {
          setTasks(taskList);
          setSnackbarMessage(message);
          setShowSnackbar(true);
          handleClose();
        }
      })
      .catch(() => {
        setSnackbarMessage("Error. Try again!");
        setShowSnackbar(true);
      });
  };

  const updateTask = (values: any) => {
    const payload = {
      id: selection._id,
      name: values.name,
      points: values.points,
      description: values.description,
      status: values.status,
      notes: values.notes,
    };
    axios
      .post("/updateTask", payload)
      .then((response: any) => {
        const { message, taskList } = response.data;
        if (message === "Task updated successfully") {
          setTasks(taskList);
          setSnackbarMessage(message);
          setShowSnackbar(true);
          handleClose();
        }
      })
      .catch(() => {
        setSnackbarMessage("Error. Try again!");
        setShowSnackbar(true);
      });
  };

  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container maxWidth="sm">
            <Typography variant="h4" align="center" sx={{ mb: 4 }} gutterBottom>
              {modalFunction === "Add" ? "Add New Task" : "Edit Task"}
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Task name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="points"
                name="points"
                label="Task points"
                value={formik.values.points}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.points && Boolean(formik.errors.points)}
                helperText={formik.touched.points && formik.errors.points}
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="description"
                name="description"
                label="Task description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                multiline
                rows={8}
              />
              <TextField
                name="status"
                label="Status"
                select
                variant="outlined"
                margin="normal"
                fullWidth
                value={formik.values.status || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="notes"
                name="notes"
                label="Notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Button
                sx={{ mt: 2 }}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                {modalFunction === "Add" ? "Save" : "Edit"}
              </Button>
            </form>
          </Container>
        </Box>
      </Modal>
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

export default TaskModal;
