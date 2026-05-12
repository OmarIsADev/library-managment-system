import { ApiService, delay } from "./api";
import type { Transaction } from "../models/types";
import { bookService } from "./bookService";

let mockTransactions: Transaction[] = [];

class TransactionService extends ApiService {
  async reserveBook(id: string, studentId: string): Promise<Transaction> {
    const updatedBook = await bookService.reserveBook(id);

    const transaction: Transaction = {
      transactionId: `tx-${Date.now()}`,
      book: updatedBook,
      studentId,
      dueDate: updatedBook.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    };
    mockTransactions.push(transaction);

    return transaction;
  }
  
  async getTransactions(studentId?: string): Promise<Transaction[]> {
    await delay(300);
    if (studentId) {
      return mockTransactions.filter(t => t.studentId === studentId);
    }
    return [...mockTransactions];
  }
}

export const transactionService = new TransactionService();
