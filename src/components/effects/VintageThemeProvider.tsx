"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

type VintageThemeContextType = {
  isVintage: boolean;
  toggleVintage: () => void;
};

const VintageThemeContext = createContext<VintageThemeContextType | undefined>(undefined);

export function VintageThemeProvider({ children }: { children: React.ReactNode }) {
  const [isVintage, setIsVintage] = useState(false);
  const { theme, setTheme } = useTheme();

  // Initialize from local storage if available
  useEffect(() => {
    const storedVintage = localStorage.getItem("vintage-mode");
    if (storedVintage) {
      setIsVintage(storedVintage === "true");
    }
  }, []);

  const toggleVintage = () => {
    const newValue = !isVintage;
    setIsVintage(newValue);
    localStorage.setItem("vintage-mode", String(newValue));
    
    // Optional: force a specific theme when vintage is active
    // if (newValue) setTheme('dark'); 
  };

  return (
    <VintageThemeContext.Provider value={{ isVintage, toggleVintage }}>
      <div className={isVintage ? "vintage-effect sepia-[.3]" : ""}>
        {children}
      </div>
    </VintageThemeContext.Provider>
  );
}

export function useVintageTheme() {
  const context = useContext(VintageThemeContext);
  if (context === undefined) {
    throw new Error("useVintageTheme must be used within a VintageThemeProvider");
  }
  return context;
}
