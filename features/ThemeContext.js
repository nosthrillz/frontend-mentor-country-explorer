import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
  darkTheme: false,
};

const themeReducer = (state, action) =>
  action?.type === "dark" ? { darkTheme: true } : { darkTheme: false };

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
}
