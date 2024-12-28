import { ThemeProvider as MuiThemeProvider, PaletteMode, createTheme } from '@mui/material'
import React, { ReactNode, createContext, useContext } from 'react'
import { useLocalStorage } from '../../Hooks/useLocalStorage'

/**
 * ### ThemeMode
 * Type representing the available theme modes.
 */
type ThemeMode = 'light' | 'dark'

/**
 * ### ThemeContextType
 * Interface defining the shape of the theme context.
 */
interface ThemeContextType {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
}

/**
 * ### ThemeContext
 * Context instance for managing theme mode state.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * ### ThemeProviderProps
 * Props interface for the `ThemeProvider` component.
 */
interface ThemeProviderProps {
  children: ReactNode
}

/**
 * ### ThemeProvider
 * Component that manages the current theme mode state and provides it via context
 * to its children, wrapped in MUI's `ThemeProvider`.
 *
 * @param {ThemeProviderProps} props - The properties object.
 * @returns {JSX.Element} The `ThemeProvider` component.
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }): JSX.Element => {
  const [storedMode, setStoredMode] = useLocalStorage<ThemeMode>('mode', 'light')
  const mode: ThemeMode = storedMode || 'light'

  const setMode = (newMode: ThemeMode): void => {
    setStoredMode(newMode)
  }

  const theme = createTheme({
    palette: {
      primary: { main: 'rgba(183, 17, 65, 1)' },
      mode: mode as PaletteMode,
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  )
}

export default ThemeProvider

/**
 * ### useThemeContext
 * Custom hook to consume the `ThemeContext`.
 *
 * @returns {ThemeContextType} The current theme context.
 * @throws Will throw an error if used outside of a `ThemeProvider`.
 * @example
 * ```tsx
 * import { useThemeContext } from './ThemeProvider';
 *
 * const MyComponent = () => {
 *   const { mode, setMode } = useThemeContext();
 *
 *   return (
 *     <div>
 *       <p>Current Mode: {mode}</p>
 *       <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
 *         Toggle Theme
 *       </button>
 *     </div>
 *   );
 * };
 * ```
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}
