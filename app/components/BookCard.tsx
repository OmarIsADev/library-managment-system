import { BookOpen, DollarSign } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import type { Book } from "../models/types";

interface BookCardProps {
  book: Book;
  onReserve: (id: string) => void;
  isReserving: boolean;
}

export function BookCard({ book, onReserve, isReserving }: BookCardProps) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div
        className={`h-1 w-full ${!book.reserved ? "bg-blue-600" : "bg-red-600"}`}
      />
      <CardHeader className="pb-3 px-5 pt-5">
        <div className="flex justify-between items-start mb-2">
          <div className="bg-slate-100 p-2 rounded-md">
            <BookOpen className="w-4 h-4 text-slate-600" />
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${!book.reserved ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}
          >
            {!book.reserved ? "AVAILABLE" : "RESERVED"}
          </span>
        </div>
        <CardTitle className="text-[17px] font-semibold leading-tight text-slate-900 line-clamp-2 mt-4">
          {book.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 mt-1">
        <div className="flex flex-col gap-1 text-xs text-slate-500 font-medium">
          <span className="flex items-center text-sm font-semibold text-slate-900 mb-2">
            ${book.price.toFixed(2)}
          </span>
          <span>ID: {book.id}</span>
          {book.reserved && book.dueDate && (
            <span className={book.overdue ? "text-red-600" : ""}>
              Due: {new Date(book.dueDate).toLocaleDateString()}
              {book.overdue && ` (Late Fee: $${book.lateFee.toFixed(2)})`}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-5 py-4">
        <Button
          disabled={isReserving || book.reserved}
          onClick={() => onReserve(book.id)}
          className={`w-full rounded-lg font-medium shadow-sm h-10 ${!book.reserved ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-100 text-slate-400 border-none"}`}
          variant={!book.reserved ? "default" : "outline"}
        >
          {isReserving
            ? "Processing..."
            : !book.reserved
              ? "Reserve Book"
              : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
}
