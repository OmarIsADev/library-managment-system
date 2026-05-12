import { ApiService } from "./api";
import type { User } from "../models/types";

class AuthService extends ApiService {
  private get currentUser(): User | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  private set currentUser(user: User | null) {
    if (typeof window !== 'undefined') {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  }

  async login(id: string, password?: string): Promise<User> {
    const response = await this.fetchData<{ token: string; id: string; name: string; role: User["role"] }>(
      "api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ id, password }),
      }
    );

    if (response?.success && response.data) {
      this.token = response.data.token;
      this.currentUser = {
        id: response.data.id,
        name: response.data.name,
        role: response.data.role,
      };
      return this.currentUser;
    }

    throw new Error(response?.message || "Login failed");
  }

  async register(id: string, firstName: string, lastName: string, password?: string): Promise<void> {
    const response = await this.fetchData<{ token: string }>(
      "api/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ id, firstName, lastName, password }),
      }
    );

    if (response?.success && response.data) {
      this.token = response.data.token;
    } else {
      throw new Error(response?.message || "Registration failed");
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.token = null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export const authService = new AuthService();
