import { ApiService } from "./api";

class AdminService extends ApiService {
  async addAdmin(id: string, firstName: string, lastName: string, password?: string): Promise<void> {
    const response = await this.fetchData<{ id: string; name: string; role: string }>(
      "api/admin/add-admin",
      {
        method: "POST",
        body: JSON.stringify({ id, firstName, lastName, password }),
      }
    );

    if (!response?.success) {
      throw new Error(response?.message || "Failed to add admin");
    }
  }
}

export const adminService = new AdminService();
