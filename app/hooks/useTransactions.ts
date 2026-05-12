import { useState, useCallback, useEffect } from "react";
import { transactionService } from "../services/transactionService";
import type { Transaction } from "../models/types";

export function useTransactions(studentId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await transactionService.getTransactions(studentId);
      setTransactions(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setIsLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const reserveBook = useCallback(async (id: string, studId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await transactionService.reserveBook(id, studId);
      await fetchTransactions();
    } catch (err: any) {
      setError(err.message || "Failed to reserve book");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions]);

  return { transactions, isLoading, error, reserveBook, refetch: fetchTransactions };
}
