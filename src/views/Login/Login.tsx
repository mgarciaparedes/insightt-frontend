import * as React from "react";
import { useState } from "react";
import {
  Card,
  Avatar,
  Button,
  TextField,
  LinearProgress,
  Snackbar,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });

  const login = (values: any) => {
    setLoading(true);
    axios
      .post("/login", values)
      .then((response) => {
        console.log;
        const { message, token } = response.data;
        axios.defaults.headers.common["x-token"] = token;
        if (message === "Login successfull") {
          setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error);
        const { message } = error.response.data;
        setLoading(false);
        setSnackbarMessage(message);
        setShowSnackbar(true);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="overline">
        Technical Test for the position of Full Stack JavaScript Programmer with
        React
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "80vh",
        }}
      >
        <Card>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {loading ? <LinearProgress sx={{ mt: 2 }} /> : <></>}

              <Button
                sx={{ mt: 2 }}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        action={action}
        onClose={() => setShowSnackbar(false)}
      />
    </Container>
  );
};

export default Login;
