/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const MainContext = createContext();

export const ThemeContext = ({ children }) => {
  const [light, setLight] = useState(true);

  return (
    <MainContext.Provider
      value={{
        light,
        setLight,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
