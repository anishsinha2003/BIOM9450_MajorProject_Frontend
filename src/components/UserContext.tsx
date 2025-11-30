"use client"
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface LoggedInUser {
  name: string;
  lastName: string;
  email: string;
  role: string;
}

interface UserContextType {
  user: LoggedInUser | null;
  setUser: (user: LoggedInUser | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUserState] = useState<LoggedInUser | null>(null);

    // Load user from localStorage on first load
    useEffect(() => {
        const stored = localStorage.getItem("loggedInUser");
        if (stored) {
        setUserState(JSON.parse(stored));
        }
    }, []);

    // Save user to localStorage every time it changes
    const setUser = (newUser: LoggedInUser | null) => {
        if (newUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        } else {
        localStorage.removeItem("loggedInUser");
        }
        setUserState(newUser);
    };

    const logout = () => {
        router.push("/login");
        localStorage.removeItem("loggedInUser");
        setUserState(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
        </UserContext.Provider>
    );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside a UserProvider");
  return ctx;
}
