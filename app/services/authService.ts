import { ApiService } from "./api";
import type { User } from "../models/types";

class AuthService extends ApiService {
  private currentUser: User | null = null;

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
      // We don't get the user details back in register according to the spec, just the token
      // We could optionally do a subsequent call to get user details if such endpoint exists
    } else {
      throw new Error(response?.message || "Registration failed");
    }
  }

  async logout(): Promise<void> {
    this.currentUser = null;
    this.token = null;
  }

  getCurrentUser(): User | null {
    // In a real app, you might decode the JWT here to get the user
    // if the page was refreshed and currentUser is null but token exists.
    return this.currentUser;
  }
}

export const authService = new AuthService();
