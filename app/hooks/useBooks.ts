import { useState, useCallback, useEffect } from "react";
import { bookService } from "../services/bookService";
import type { Book } from "../models/types";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await bookService.getBooks();
      setBooks(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch books");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const createBook = useCallback(async (book: { id: string; title: string; price: number }) => {
    setIsLoading(true);
    try {
      await bookService.createBook(book);
      await fetchBooks();
    } catch (err: any) {
      setError(err.message || "Failed to create book");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchBooks]);

  const updateBook = useCallback(async (id: string, fields: { title?: string; price?: number; lateFee?: number }) => {
    setIsLoading(true);
    setError(null);
    try {
      await bookService.updateBook(id, fields);
      await fetchBooks();
    } catch (err: any) {
      setError(err.message || "Failed to update book");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchBooks]);

  const deleteBook = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await bookService.deleteBook(id);
      await fetchBooks();
    } catch (err: any) {
      setError(err.message || "Failed to delete book");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchBooks]);

  const toggleBookStatus = useCallback(async (id: string, currentlyReserved: boolean) => {
    setIsLoading(true);
    setError(null);
    try {
      if (currentlyReserved) {
        await bookService.returnBook(id);
      } else {
        await bookService.reserveBook(id);
      }
      await fetchBooks();
    } catch (err: any) {
      setError(err.message || "Failed to toggle book status");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchBooks]);

  return { books, isLoading, error, createBook, updateBook, deleteBook, toggleBookStatus, refetch: fetchBooks };
}
