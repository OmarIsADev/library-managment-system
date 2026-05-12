import { useState, useCallback } from "react";
import { authService } from "../services/authService";
import type { User } from "../models/types";
import { useNavigate } from "react-router";

export function useAuth() {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (id: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.login(id, password);
      setUser(loggedInUser);
      if (loggedInUser.role === "ADMIN" || loggedInUser.role === "HEAD_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
      return loggedInUser;
    } catch (err: any) {
      setError(err.message || "Failed to login");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (id: string, firstName: string, lastName: string, password?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.register(id, firstName, lastName, password);
      // Backend returns a token but not full user details for register. 
      // We route to login so they can authenticate and get the full user object.
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Failed to register");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading, error, login, register, logout };
}
