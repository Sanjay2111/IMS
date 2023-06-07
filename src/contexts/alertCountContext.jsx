import React from "react";

export const AlertCountContext = React.createContext(0); // Create the context with a default value of 0

export const AlertCountProvider = ({ children }) => {
  const [alertCount, setAlertCount] = React.useState(0);

  return (
    <AlertCountContext.Provider value={alertCount}>
      {children}
    </AlertCountContext.Provider>
  );
};
