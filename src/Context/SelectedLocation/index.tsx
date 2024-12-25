import React from "react";

/**
 * Type representing a location with optional address and coordinates.
 */
interface Location {
  SEARCHVAL: string;
  ADDRESS?: string;
  LATTITUDE: string;
  LONGTITUDE: string;
}

/**
 * Interface defining the shape of the context value for managing selected location.
 */
interface SelectedLocationType {
  selectedLocation: Location;
  setSelectedLocation: (location: Location) => void;
}

/**
 * Context instance for managing the selected location state.
 * Provides the selected location and a function to update it.
 */
const SelectedLocation = React.createContext<SelectedLocationType | undefined>(
  undefined
);

/**
 * Props interface for the SelectedLocationProvider component.
 * Accepts children as a ReactNode to wrap other components.
 */
interface SelectedLocationProviderProps {
  children: React.ReactNode;
}

/**
 * SelectedLocationProvider component manages the state of the selected location.
 * It provides the current selected location and a function to update it to any
 * descendant component wrapped in this provider.
 *
 * @param {SelectedLocationProviderProps} props - The properties object containing children.
 * @returns {JSX.Element} The SelectedLocationProvider component with context values.
 */
const SelectedLocationProvider: React.FC<SelectedLocationProviderProps> = ({
  children,
}: SelectedLocationProviderProps): JSX.Element => {
  const [selectedLocation, setSelectedLocation] = React.useState<Location>(
    {} as Location
  );

  return (
    <SelectedLocation.Provider
      value={{ selectedLocation, setSelectedLocation }}
    >
      {children}
    </SelectedLocation.Provider>
  );
};

export default SelectedLocationProvider;

/**
 * Custom hook to consume the SelectedLocation context.
 * Throws an error if used outside of a SelectedLocationProvider.
 *
 * @returns {SelectedLocationType} The current selected location context value.
 * @throws Will throw an error if used outside of a SelectedLocationProvider.
 */
export const useSelectedLocation = (): SelectedLocationType => {
  const context = React.useContext(SelectedLocation);
  if (!context) {
    throw new Error(
      "useSelectedLocation must be used within a SelectedLocationProvider"
    );
  }
  return context;
};
