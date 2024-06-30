/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const MainContext = createContext();

export const PageContext = ({ children }) => {
  const [lightTheme, setLightTheme] = useState(true);

  return (
    <MainContext.Provider
      value={{
        lightTheme,
        setLightTheme,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
