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
  transactionId: string;
  book: Book;
  studentId: string;
  dueDate: string;
}
