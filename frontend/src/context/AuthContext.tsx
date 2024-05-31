import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode"; // Ensure you have jwt-decode installed
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import axios from "axios"; // Add axios import

interface UserData {
  email: string | null;
  photoURL: string | null;
}

interface AuthContextProps {
  user: UserData | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  signup: (email: string, password: string) => Promise<void>; // Add signup function to the interface
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (newToken: string) => {
    const decodedToken: any = jwtDecode(newToken); // Decode the token to get user information
    setToken(newToken);
    setUser({
      email: decodedToken.email,
      photoURL: null, // Assuming the token doesn't contain photoURL
    });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const signup = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://breatheesg.onrender.com/signup",
        {
          email,
          password,
        }
      );
      const token = response.data.token;
      login(token); // Log the user in after signing up
    } catch (error) {
      console.error("Error during signup:", error);
      throw new Error("Signup failed");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
        setUser({
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setToken(null);
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
