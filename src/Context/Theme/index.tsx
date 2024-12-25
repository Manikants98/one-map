import {
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
  createTheme,
} from "@mui/material";
import React, { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "../../Hooks/useLocalStorage";

/**
 * Type representing the theme mode options.
 */
type ThemeMode = "light" | "dark";

/**
 * Interface defining the shape of the ThemeContext.
 */
interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

/**
 * Context instance for managing theme mode state.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Props interface for the ThemeProvider component.
 */
interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider component manages the current theme mode state
 * and provides it via context to its children wrapped in MuiThemeProvider.
 * @param {ThemeProviderProps} props - The properties object.
 * @returns {JSX.Element} The ThemeProvider component.
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}: ThemeProviderProps): JSX.Element => {
  // Retrieve theme mode from local storage, defaulting to light
  const [storedMode, setStoredMode] = useLocalStorage("mode", "light");
  const mode = (storedMode as ThemeMode) || "light";

  // Function to set the theme mode in local storage
  const setMode = (newMode: ThemeMode) => {
    setStoredMode(newMode);
  };

  // Create the MUI theme based on the current theme mode
  const theme = createTheme({
    palette: {
      primary: { main: "rgba(183, 17, 65, 1)" },
      mode: mode as PaletteMode,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ mode, setMode }}>
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;

/**
 * Custom hook to consume the ThemeContext.
 * Throws an error if used outside of a ThemeProvider.
 * @returns {ThemeContextType} The current theme context.
 * @throws Will throw an error if used outside of a ThemeProvider.
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
