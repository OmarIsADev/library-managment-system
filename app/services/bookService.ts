import { ApiService } from "./api";
import type { Book } from "../models/types";

class BookService extends ApiService {
  async getBooks(): Promise<Book[]> {
    const response = await this.fetchData<Book[]>("api/books/all", { method: "GET" });
    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to fetch books");
  }

  async getBook(id: string): Promise<Book> {
    const response = await this.fetchData<Book>(`api/books/${id}`, { method: "GET" });
    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to fetch book");
  }

  async createBook(book: { id: string; title: string; price: number }): Promise<Book> {
    const response = await this.fetchData<Book>("api/books", {
      method: "POST",
      body: JSON.stringify(book),
    });

    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to create book");
  }

  async updateBook(id: string, title: string): Promise<Book> {
    const response = await this.fetchData<Book>(`api/books/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title }),
    });

    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to update book title");
  }

  async deleteBook(id: string): Promise<void> {
    const response = await this.fetchData(`api/books/${id}`, { method: "DELETE" });
    if (!response?.success) {
      throw new Error(response?.message || "Failed to delete book");
    }
  }

  async reserveBook(id: string): Promise<Book> {
    const response = await this.fetchData<Book>(`api/books/${id}/reserve`, { method: "POST" });
    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to reserve book");
  }

  async returnBook(id: string): Promise<Book> {
    const response = await this.fetchData<Book>(`api/books/${id}/return`, { method: "POST" });
    if (response?.success && response.data) {
      return response.data;
    }
    throw new Error(response?.message || "Failed to return book");
  }
}

export const bookService = new BookService();
