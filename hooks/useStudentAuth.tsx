import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Student } from "../models/StudentModel";
import { getToken, removeToken } from "../util/TokenHandling";
import axios from "axios";

interface StudentAuthContextType {
  student: Student | null;
  loading: boolean;
  register: (
    username: string,
    password: string,
    name: string,
    email: string
  ) => Promise<[boolean, string]>;
  login: (username: string, password: string) => Promise<[boolean, string]>;
  logout: () => Promise<[boolean, string]>;
}

const StudentAuthContext = createContext<StudentAuthContextType | undefined>(
  undefined
);

interface StudentAuthProviderProps {
  children: ReactNode;
}

export const StudentAuthProvider = ({ children }: StudentAuthProviderProps) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize user and token on app load
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      const token = await getToken();
      if (token) {
        try {
          // Fetch user data using the token
          const response = await axios.get(
            "https://edumind-3587039ec3f2.herokuapp.com/v1/students/profile"
          );
          setStudent(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const register = async (
    username: string,
    password: string,
    name: string,
    email: string
  ): Promise<[boolean, string]> => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://edumind-3587039ec3f2.herokuapp.com/v1/students/register",
        {
          username,
          password,
          name,
          email,
        }
      );
      if (response.status === 201) {
        setStudent(response.data);
        return [true, "Registration successful!"];
      } else {
        return [false, "Registration failed"];
      }
    } catch (err: any) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message ||
          "Registration failed due to network error"
        : err.message || "An unexpected error occurred";
      console.error("Registration error:", err);
      return [false, errorMessage];
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    username: string,
    password: string
  ): Promise<[boolean, string]> => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://edumind-3587039ec3f2.herokuapp.com/v1/login",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        // Assuming the API returns user data upon successful login
        setStudent(response.data.user);
        return [true, "Login successful"];
      } else {
        return [false, "Login failed"];
      }
    } catch (err: any) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || "Login failed due to network error"
        : err.message || "An unexpected error occurred";
      console.error("Login error:", err);
      return [false, errorMessage];
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<[boolean, string]> => {
    try {
      setStudent(null);
      await removeToken();
      return [true, "Logout successful"];
    } catch (error) {
      console.error("Error logging out:", error);
      return [false, "Logout failed"];
    }
  };

  return (
    <StudentAuthContext.Provider
      value={{ student, loading, register, login, logout }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = (): StudentAuthContextType => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error("useStudentAuth must be used within an AuthProvider");
  }
  return context;
};
