import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cookies from "js-cookie";

//MUI
import { Box, Button, TextField, Typography } from "@mui/material";
import LoadingButton from "../../LoadingButton/LoadingButton";

const LoginForm = ({ formik }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      cookies.remove("user_data");
      cookies.remove("token");
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <Typography variant="h3" className={`text-center game-font flex-center`}>
        Welcome To Tournament
      </Typography>
      <TextField
        className={`grid-stretch email`}
        label="Username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        id="username"
        error={
          Boolean(formik.touched.username) &&
          Boolean(formik.errors.username)
        }
        helperText={formik.touched.username && formik.errors.username}
        onBlur={formik.handleBlur}
      />

      <TextField
        className={`grid-stretch pass`}
        label="Password"
        error={
          Boolean(formik.touched.password) &&
          Boolean(formik.errors.password)
        }
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        id="password"
        helperText={formik.touched.password && formik.errors.password}
        onBlur={formik.handleBlur}
      />

      <Box className={`flex-start forgot`}>
        <Typography variant="h5">Forgot your password?</Typography>
        <Button
          onClick={() => {
            navigate(process.env.REACT_APP_FORGOT_PASS_PAGE);
          }}
        >
          Recover Password
        </Button>
      </Box>

      <Box className={`flex-center btn`}>
        <LoadingButton text={"Sign In"} />
      </Box>

      <Box className={`flex-center have_acc`}>
        <Typography variant="h5">Don't have an account?</Typography>
        <Button onClick={() => navigate(process.env.REACT_APP_SIGNUP_PAGE)}>
          Sign Up Here
        </Button>
      </Box>
    </>
  );
};

export default LoginForm;
