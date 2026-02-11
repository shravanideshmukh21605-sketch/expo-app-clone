import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Define the User data structure
// This matches the KYC credentials collected in your registration flow
export interface User {
  fullName: string;
  email: string;
  mobile: string;
  pan: string;
  dob: string;
  gender: string;
  income: string;
  residentialStatus: string;
  bankAccount?: string;
  ifsc?: string;
}

// 2. Define Context capabilities
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  isLoading: boolean; // Crucial for Session Guarding in _layout.tsx
  login: (userData: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 3. PERSISTENCE LOGIC: Check for existing session on app start
  // This ensures Gayatri doesn't have to log in every time she opens the app
  useEffect(() => {
    const loadSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user_data');
        const token = await AsyncStorage.getItem('user_token');
        
        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to load user session:", e);
      } finally {
        // Set loading to false only after checking storage
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  // 4. LOGIN LOGIC: Save data to storage and state
  const login = async (userData: User, token: string) => {
    try {
      // Storing credentials securely on the device
      await AsyncStorage.setItem('user_token', token);
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
      await AsyncStorage.setItem('isLoggedIn', 'true');
      
      setUser(userData);
      setIsLoggedIn(true);
    } catch (e) {
      console.error("Error saving login session:", e);
    }
  };

  // 5. LOGOUT LOGIC: Clear all local storage and reset state
  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['user_token', 'user_data', 'isLoggedIn']);
      setUser(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.error("Error during logout:", e);
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      isLoggedIn, 
      setIsLoggedIn, 
      isLoading, 
      login, 
      logout 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user data throughout the app
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider. Check your _layout.tsx!');
  }
  return context;
};