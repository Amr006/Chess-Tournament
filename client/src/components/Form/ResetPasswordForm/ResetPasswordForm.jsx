import React from "react";

//MUI
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "../../LoadingButton/LoadingButton";

const ResetPasswordForm = ({ formik }) => {
  return (
    <>
      <Typography variant="h3" className={`text-center game-font flex-center`}>
        Reset Your Password
      </Typography>

      <TextField
        className={`grid-stretch pass`}
        label="New Password"
        error={
          Boolean(formik.touched.password) && Boolean(formik.errors.password)
        }
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        id="password"
        helperText={formik.touched.password && formik.errors.password}
        onBlur={formik.handleBlur}
      />

      <TextField
        className={`grid-stretch pass`}
        label="Confirm Password"
        error={
          Boolean(formik.touched.confirm_password) && Boolean(formik.errors.confirm_password)
        }
        name="confirm_password"
        type="password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        id="confirm_password"
        helperText={formik.touched.confirm_password && formik.errors.confirm_password}
        onBlur={formik.handleBlur}
      />

      <Box className={`flex-center btn`}>
        <LoadingButton text={"Reset Password"} />
      </Box>
    </>
  );
};

export default ResetPasswordForm;
