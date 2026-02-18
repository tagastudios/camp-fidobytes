import React, { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const DemoContext = createContext(null);

export function DemoProvider({ children }) {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const history = useHistory();

  const enterDemo = () => {
    setIsDemoMode(true);
    history.push("/daycare");
  };

  const exitDemo = () => {
    setIsDemoMode(false);
    history.push("/");
  };

  const value = { isDemoMode, enterDemo, exitDemo };

  return (
    <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
