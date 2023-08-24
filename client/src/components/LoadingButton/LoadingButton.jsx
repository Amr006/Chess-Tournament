import React, { useContext } from "react";
import { LoadingButtonContext } from "../../context/LoadingButtonContext";
import { MyButton } from "../../MUIComponents/MyButton/MyButton";
import { MyIconButton } from "../../MUIComponents/MyIconButton/MyIconButton";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

const LoadingButton = ({ text }) => {
  const { loadingButton } = useContext(LoadingButtonContext);
  return (
    <>
      {loadingButton ? (
        <MyIconButton>
          <LoadingIcon />
        </MyIconButton>
      ) : (
        <MyButton type="submit">{text}</MyButton>
      )}
    </>
  );
};

export default LoadingButton;
