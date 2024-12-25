import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ThemeProvider from "../Context/Theme";
import SelectedLocationProvider from "./SelectedLocation";

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
      mutations: {
        onError: (error: any) => {
          const data = error?.response?.data;
          console.log(data);
        },
      },
    },
  });

  return (
    <ThemeProvider>
      <SelectedLocationProvider>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </SelectedLocationProvider>
    </ThemeProvider>
  );
};

export default ContextProvider;
