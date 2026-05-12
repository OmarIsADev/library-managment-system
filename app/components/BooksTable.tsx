import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import type { Book } from "../models/types";

interface BooksTableProps {
  books: Book[];
  isLoading: boolean;
}

export function BooksTable({ books, isLoading }: BooksTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-12">
      <Table>
        <TableHeader className="bg-slate-50 border-b border-slate-200">
          <TableRow className="hover:bg-slate-50 border-none">
            <TableHead className="text-slate-600 font-medium h-11">ID</TableHead>
            <TableHead className="text-slate-600 font-medium h-11">Title</TableHead>
            <TableHead className="text-slate-600 font-medium h-11">Price</TableHead>
            <TableHead className="text-slate-600 font-medium h-11">Status</TableHead>
            <TableHead className="text-slate-600 font-medium h-11 text-right">Late Fee</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableRow><TableCell colSpan={5} className="text-center text-slate-500 py-8">Loading data...</TableCell></TableRow>}
          {books.map((book) => (
            <TableRow key={book.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <TableCell className="font-medium text-slate-700">{book.id}</TableCell>
              <TableCell className="text-slate-900 font-medium">{book.title}</TableCell>
              <TableCell className="text-slate-500">${book.price.toFixed(2)}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${!book.reserved ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  {!book.reserved ? 'AVAILABLE' : 'RESERVED'}
                </span>
              </TableCell>
              <TableCell className="text-right text-slate-500">
                {book.overdue ? (
                  <span className="text-red-600 font-medium">${book.lateFee.toFixed(2)}</span>
                ) : (
                  "$0.00"
                )}
              </TableCell>
            </TableRow>
          ))}
          {!isLoading && books.length === 0 && (
            <TableRow><TableCell colSpan={5} className="text-center text-slate-500 py-12">No books found in the catalog.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
