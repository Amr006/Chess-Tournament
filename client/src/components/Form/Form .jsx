import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/slices/authSlice";
import { handleToastMessage } from "../../App";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import * as Yup from "yup";

//Components
import LoginForm from "./LoginForm/LoginForm";
import SignUpForm from "./SignUpForm/SignUpForm";
import ForgotPasswordForm from "./ForgotPasswordForm/ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm/ResetPasswordForm";

//MUI
import { Box } from "@mui/material";
import { MyButton } from "../../MUIComponents/MyButton/MyButton";

//Style
import "./Form.css";
import { LoadingButtonContext } from "../../context/LoadingButtonContext";

const From = (props) => {
  const isLogin = props.formType === "login";
  const isRegister = props.formType === "register";
  const isForgot_pass = props.formType === "forgot_pass";
  const isReset_pass = props.formType === "reset_pass";
  const isVerify = props.formType === "verify";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, unique } = useParams();
  const [sent, setSent] = useState(false);
  const { setLoadingButton } = useContext(LoadingButtonContext);

  const initialLoginValues = {
    username: "",
    password: "",
  };

  const initialRegisterValues = {
    email: "",
    username: "",
    password: "",
  };

  const initialForgotPassValues = {
    username: "",
  };

  const initialResetPasswordValues = {
    password: "",
    confirm_password: "",
  };

  const registerSchema = Yup.object({
    email: Yup.string().email().required(),
    username: Yup.string().required("Username is Required"),
    password: Yup.string().required("Password is Required").min(8),
  });

  const loginSchema = Yup.object({
    username: Yup.string().required("Username is Required"),
    password: Yup.string().required("Password is Required"),
  });

  const forgotPassSchema = Yup.object({
    username: Yup.string().required("Username is Required"),
  });

  const resetPasswordSchema = Yup.object({
    password: Yup.string().required().min(8),
    confirm_password: Yup.string()
      .required()
      .min(8)
      .when("password", (password, field) =>
        password
          ? field
              .required("Password isn't Matched")
              .oneOf([Yup.ref("password")])
          : field
      ),
  });

  const handleResetPasswordData = async () => {
    setLoadingButton(true);
    await axios
      .get(
        process.env.REACT_APP_SERVER_URL + `/user/resetPassword/${id}/${unique}`
      )
      .then((res) => {
        Cookies.set("user_id", JSON.stringify(res.data.user_id));
      })
      .catch((err) => {
        try {
          handleToastMessage(err.response.data.message, "e");
        } catch (error) {
          handleToastMessage("Error", "e");
        }
      });
    setLoadingButton(false);
  };

  if (isReset_pass) {
    handleResetPasswordData();
  }

  const registerFormik = useFormik({
    initialValues: initialRegisterValues,
    validationSchema: registerSchema,
    onSubmit: async (values, onSubmitProps) => {
      setLoadingButton(true);
      await axios
        .post(process.env.REACT_APP_SERVER_URL + "/register", {
          ...values,
        })
        .then((res) => {
          try {
            handleToastMessage(res.data.message, "s");
          } catch (error) {
            handleToastMessage("Email is Created Successfully", "s");
          }
          navigate("/login");
          onSubmitProps.resetForm();
        })
        .catch((err) => {
          try {
            handleToastMessage(err.response.data.message, "e");
          } catch (error) {
            handleToastMessage("Error", "e");
          }
        });
      setLoadingButton(false);
    },
  });

  const loginFormik = useFormik({
    initialValues: initialLoginValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoadingButton(true);
      await axios
        .post(process.env.REACT_APP_SERVER_URL + "/login", {
          ...values,
        })
        .then((res) => {
          const userData = {
            username: values.username,
            token: res.data.token,
            role: res.data.role,
            tutorial: res.data.tutorial,
          };
          Cookies.set("user_data", JSON.stringify(userData), { expires: 7 });
          Cookies.set("token", res.data.token, { expires: 7 });
          dispatch(setUserData(userData));
          navigate("/");
          try {
            Cookies.remove("user_id");
          } catch (error) {
            console.log(error);
          }
          handleToastMessage(`Welcome ${values.username}`, "s");
        })
        .catch((err) => {
          try {
            handleToastMessage(err.response.data.message, "e");
          } catch (error) {
            handleToastMessage("Error", "e");
          }
        });
      setLoadingButton(false);
    },
  });

  const resetPasswordFormik = useFormik({
    initialValues: initialResetPasswordValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, onSubmitProps) => {
      setLoadingButton(true);
      let user_id = Cookies.get("user_id");
      user_id = JSON.parse(user_id);
      values = { ...values, user_id };
      await axios
        .post(process.env.REACT_APP_SERVER_URL + `/ResetPassword`, {
          ...values,
        })
        .then((res) => {
          Cookies.remove("Forgot_Password_Username");
          navigate(process.env.REACT_APP_LOGIN_PAGE);
          onSubmitProps.resetForm();
          handleToastMessage(res.data.message, "s");
        })
        .catch((err) => {
          handleToastMessage(err.response.data.message, "e");
        });
      setLoadingButton(false);
    },
  });

  const forgotPasswordFormik = useFormik({
    initialValues: initialForgotPassValues,
    validationSchema: forgotPassSchema,
    onSubmit: async (values, onSubmitProps) => {
      setLoadingButton(true);
      await axios
        .post(process.env.REACT_APP_SERVER_URL + "/ForgotPassword", {
          ...values,
        })
        .then((res) => {
          setSent(true);
          onSubmitProps.resetForm();
          try {
            handleToastMessage(res.data.message, "s");
          } catch (error) {
            handleToastMessage("Check your Mail", "s");
          }
        })
        .catch((err) => {
          try {
            handleToastMessage(err.response.data.message, "e");
          } catch (error) {
            handleToastMessage("Error", "e");
          }
        });
      setLoadingButton(false);
    },
  });

  // const handleRegister = async (values, onSubmitProps) => {
  //   setLoadingButton(true);
  //   await axios
  //     .post(process.env.REACT_APP_SERVER_URL + "/register", {
  //       ...values,
  //     })
  //     .then((res) => {
  //       try {
  //         handleToastMessage(res.data.message, "s");
  //       } catch (error) {
  //         handleToastMessage("Email is Created Successfully", "s");
  //       }
  //       navigate("/login");
  //       onSubmitProps.resetForm();
  //     })
  //     .catch((err) => {
  //       try {
  //         handleToastMessage(err.response.data.message, "e");
  //       } catch (error) {
  //         handleToastMessage("Error", "e");
  //       }
  //     });
  //   setLoadingButton(false);
  // };

  // const handleLogin = async (values, onSubmitProps) => {
  //   setLoadingButton(true);
  //   await axios
  //     .post(process.env.REACT_APP_SERVER_URL + "/login", {
  //       ...values,
  //     })
  //     .then((res) => {
  //       const userData = {
  //         username: values.username_log,
  //         token: res.data.token,
  //         role: res.data.role,
  //         tutorial: res.data.tutorial,
  //       };
  //       Cookies.set("user_data", JSON.stringify(userData), { expires: 7 });
  //       Cookies.set("token", res.data.token, { expires: 7 });
  //       dispatch(setUserData(userData));
  //       navigate("/");
  //       try {
  //         Cookies.remove("user_id");
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       onSubmitProps.resetForm();
  //       handleToastMessage(`Welcome ${values.username_log}`, "s");
  //     })
  //     .catch((err) => {
  //       try {
  //         handleToastMessage(err.response.data.message, "e");
  //       } catch (error) {
  //         handleToastMessage("Error", "e");
  //       }
  //     });
  //   setLoadingButton(false);
  // };

  // const handleForgotPassword = async (values, onSubmitProps) => {
  //   setLoadingButton(true);
  //   await axios
  //     .post(process.env.REACT_APP_SERVER_URL + "/ForgotPassword", {
  //       ...values,
  //     })
  //     .then((res) => {
  //       setSent(true);
  //       onSubmitProps.resetForm();
  //       try {
  //         handleToastMessage(res.data.message, "s");
  //       } catch (error) {
  //         handleToastMessage("Check your Mail", "s");
  //       }
  //     })
  //     .catch((err) => {
  //       try {
  //         handleToastMessage(err.response.data.message, "e");
  //       } catch (error) {
  //         handleToastMessage("Error", "e");
  //       }
  //     });
  //   setLoadingButton(false);
  // };

  // const handleResetPassword = async (values, onSubmitProps) => {
  //   setLoadingButton(true);
  //   let user_id = Cookies.get("user_id");
  //   user_id = JSON.parse(user_id);
  //   values = { ...values, user_id };
  //   await axios
  //     .post(process.env.REACT_APP_SERVER_URL + `/ResetPassword`, {
  //       ...values,
  //     })
  //     .then((res) => {
  //       Cookies.remove("Forgot_Password_Username");
  //       navigate(process.env.REACT_APP_LOGIN_PAGE);
  //       onSubmitProps.resetForm();
  //       handleToastMessage(res.data.message, "s");
  //     })
  //     .catch((err) => {
  //       handleToastMessage(err.response.data.message, "e");
  //     });
  //   setLoadingButton(false);
  // };

  const handleVerify = async () => {
    setLoadingButton(true);
    await axios
      .get(process.env.REACT_APP_SERVER_URL + `/user/verify/${id}/${unique}`)
      .then((res) => {
        navigate(process.env.REACT_APP_LOGIN_PAGE);
        try {
          handleToastMessage(res.data.message, "s");
        } catch (error) {
          handleToastMessage("Email Verified Successfully", "s");
        }
      })
      .catch((err) => {
        try {
          handleToastMessage(err.response.data.message, "e");
        } catch (error) {
          handleToastMessage("Error", "e");
        }
      });
    setLoadingButton(false);
  };

  if (isVerify) {
    return (
      <Box className={`verify flex-center`}>
        <MyButton onClick={() => handleVerify()}>Activate Account</MyButton>
      </Box>
    );
  }

  return (
    <form
      className={`grid-stretch form`}
      onSubmit={
        isLogin
          ? loginFormik.handleSubmit
          : isRegister
          ? registerFormik.handleSubmit
          : isReset_pass
          ? resetPasswordFormik.handleSubmit
          : isForgot_pass && forgotPasswordFormik.handleSubmit
      }
    >
      {isLogin ? (
        <LoginForm formik={loginFormik} />
      ) : isRegister ? (
        <SignUpForm formik={registerFormik} />
      ) : isForgot_pass ? (
        <ForgotPasswordForm sent={sent} formik={forgotPasswordFormik} />
      ) : (
        isReset_pass && <ResetPasswordForm formik={resetPasswordFormik} />
      )}
    </form>
  );
};

export default From;
