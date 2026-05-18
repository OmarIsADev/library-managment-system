export interface User {
  id: string;
  name: string;
  role: "HEAD_ADMIN" | "ADMIN" | "STUDENT";
}

export interface Book {
  id: string;
  title: string;
  price: number;
  reserved: boolean;
  dueDate: string | null;
  overdue: boolean;
  lateFee: number;
}

export interface Transaction {
  id: number;
  studentId: string;
  bookId: string;
  bookTitle: string | null;
  type: "RESERVE" | "RETURN";
  createdAt: string;
  dueDate: string | null;
  lateFee: number;
}
