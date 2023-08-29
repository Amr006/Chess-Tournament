import React from "react";
import { useNavigate } from "react-router-dom";

//MUI
import { Box, Button, TextField, Typography } from "@mui/material";
import LoadingButton from "../../LoadingButton/LoadingButton";

const SignUpForm = ({ formik}) => {
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h3" className={`text-center game-font flex-center`}>
        Let's get started
      </Typography>
      <TextField
        className={`grid-stretch username`}
        label="Lichess Username"
        value={formik.values.username}
        error={Boolean(formik.touched.username) && Boolean(formik.errors.username)}
        name="username"
        type="username"
        onChange={formik.handleChange}
        id="username"
        helperText={formik.touched.username && formik.errors.username}
        onBlur={formik.handleBlur}
      />

      <TextField
        className={`grid-stretch email`}
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        id="email"
        error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        onBlur={formik.handleBlur}
      />

      <TextField
        className={`grid-stretch pass`}
        label="Password"
        error={Boolean(formik.touched.password) && Boolean(formik.errors.password)}
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        id="password"
        helperText={formik.touched.password && formik.errors.password}
        onBlur={formik.handleBlur}
      />

      <Box className={`flex-center btn`}>
        <LoadingButton text={"Sign Up"} />
      </Box>

      <Box className={`flex-center have_acc`}>
        <Typography variant="h5">Already have an account?</Typography>
        <Button onClick={() => navigate(process.env.REACT_APP_LOGIN_PAGE)}>
          Sign In
        </Button>
      </Box>
    </>
  );
};

export default SignUpForm;
