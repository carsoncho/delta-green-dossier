import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface ModeContextType {
  mode: "edit" | "view";
  toggleMode: () => void;
}

// Create the context with a default value
const ModeContext = createContext<ModeContextType | undefined>(undefined);

// Define the props for the provider component
interface ModeProviderProps {
  children: ReactNode;
}

// Create a provider component
export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<"edit" | "view">("view");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "view" ? "edit" : "view"));
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

// Custom hook to use the ModeContext
export const useMode = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
};
