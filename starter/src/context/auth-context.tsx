import React, { createContext, ReactNode, useState, useEffect } from "react";
import { User, signOut } from "firebase/auth";
import { auth } from "../firebase/index";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext<{
  user: User | null;
  signOutUser: () => void;
}>({
  user: null,
  signOutUser: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return React.useContext(AuthContext);
};
