import React from "react";

//MUI
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "../../LoadingButton/LoadingButton";

const ForgotPasswordForm = ({ sent,formik }) => {
  if (!sent) {
    return (
      <>
        <Typography
          variant="h3"
          className={`text-center game-font flex-center`}
        >
          Forgot Your Password ?
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
          helperText={
            formik.touched.username && formik.errors.username
          }
          onBlur={formik.handleBlur}
        />

        <Box className={`flex-center btn`}>
          <LoadingButton text={"Reset Password"} />
        </Box>
      </>
    );
  } else {
    return (
      <Box>
        <Typography variant="h4" className={`flex-center`}>
          Email is Sent
        </Typography>
      </Box>
    );
  }
};

export default ForgotPasswordForm;
