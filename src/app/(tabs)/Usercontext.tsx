import React, { createContext, useContext, useState } from 'react';

// 1. Define the User data structure
interface User {
  fullName: string;
  email: string;
  pan: string;
  mobile: string;
  initials: string;
}

// 2. Define what the Context provides to the app
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void; // Added for easier navigation logic
}

// 3. Create the Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Create the Provider (Wrap your _layout.tsx with this)
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial state is null (not logged in)
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 5. Create the Hook for easy access in your pages
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider. Check your _layout.tsx!');
  }
  return context;
};