import React from "react";
import Routes from "./Routes";
import ContextProvider from "./Context";

const App: React.FC = () => {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
};

export default App;
