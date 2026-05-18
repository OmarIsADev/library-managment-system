import { ApiService } from "./api";
import type { Transaction } from "../models/types";

class TransactionService extends ApiService {
  async reserveBook(bookId: string, studentId: string): Promise<void> {
    // The reserve endpoint is on the book controller, not transactions.
    // The backend automatically records the transaction when a book is reserved.
    const { bookService } = await import("./bookService");
    await bookService.reserveBook(bookId);
  }

  async getMyActiveReservations(): Promise<Transaction[]> {
    const response = await this.fetchData<Transaction[]>("api/transactions/my/active", {
      method: "GET",
    });
    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to fetch reservations");
  }

  async getMyTransactions(): Promise<Transaction[]> {
    const response = await this.fetchData<Transaction[]>("api/transactions/my", {
      method: "GET",
    });
    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to fetch transactions");
  }

  async getTransactions(studentId?: string): Promise<Transaction[]> {
    if (studentId) {
      return this.getMyActiveReservations();
    }
    return this.getMyTransactions();
  }
}

export const transactionService = new TransactionService();
