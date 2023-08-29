import { createContext, useState } from "react";

export const LoadingButtonContext = createContext();

export const LoadingButtonProvider = ({ children }) => {
  const [loadingButton, setLoadingButton] = useState(false);
  return (
    <LoadingButtonContext.Provider value={{ loadingButton, setLoadingButton }}>
      {children}
    </LoadingButtonContext.Provider>
  );
};
