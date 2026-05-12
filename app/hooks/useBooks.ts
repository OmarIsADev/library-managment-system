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

  return { books, isLoading, error, createBook, refetch: fetchBooks };
}
