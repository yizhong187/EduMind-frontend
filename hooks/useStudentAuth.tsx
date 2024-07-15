import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Student } from "../models/StudentModel";
import { getToken, removeToken, saveToken } from "../util/TokenHandling";
import axios from "axios";
import apiClient from "../util/apiClient";

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
          const response = await apiClient.get("/students/profile");
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
      const response = await apiClient.post("/login", {
        username,
        password,
      });
      if (response.status === 200) {
        // Assuming the API returns user data upon successful login
        const { user, token } = response.data;
        if (user.type === "student") {
          await saveToken(token);
          try {
            const profileResponse = await apiClient.get("/students/profile");
            setStudent(profileResponse.data);
          } catch (profileError) {
            console.error("Error fetching user profile:", profileError);
            return [false, "Login successful, but failed to fetch profile"];
          }
          return [true, "Login successful"];
        }
        return [false, "Incorrect user type"];
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
