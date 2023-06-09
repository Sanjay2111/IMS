import React, { createContext, useState } from "react";

const AlertContext = createContext();

const AlertProvider = ({ children }) => {
  const [alertCount, setAlertCount] = useState(0);

  return (
    <AlertContext.Provider value={{ alertCount, setAlertCount }}>
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertProvider };
