import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import type { Book } from "../models/types";

interface BooksTableProps {
  books: Book[];
  isLoading: boolean;
  onUpdate: (id: string, fields: { title?: string; price?: number; lateFee?: number }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggleStatus: (id: string, currentlyReserved: boolean) => Promise<void>;
}

interface EditForm {
  title: string;
  price: number;
  reserved: boolean;
  lateFee: number;
}

export function BooksTable({ books, isLoading, onUpdate, onDelete, onToggleStatus }: BooksTableProps) {
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editForm, setEditForm] = useState<EditForm>({ title: "", price: 0, reserved: false, lateFee: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [acting, setActing] = useState(false);

  const openEdit = (book: Book) => {
    setEditingBook(book);
    setEditForm({
      title: book.title,
      price: book.price,
      reserved: book.reserved,
      lateFee: book.lateFee,
    });
  };

  const closeEdit = () => {
    setEditingBook(null);
  };

  const handleSave = async () => {
    if (!editingBook || !editForm.title.trim()) return;
    setActing(true);
    try {
      // Update fields via PUT
      await onUpdate(editingBook.id, {
        title: editForm.title.trim(),
        price: editForm.price,
        lateFee: editForm.lateFee,
      });

      // Toggle status if it changed
      if (editForm.reserved !== editingBook.reserved) {
        await onToggleStatus(editingBook.id, editingBook.reserved);
      }

      closeEdit();
    } finally {
      setActing(false);
    }
  };

  const handleDelete = async (id: string) => {
    setActing(true);
    try {
      await onDelete(id);
      setDeleteConfirm(null);
    } finally {
      setActing(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-12">
        <Table>
          <TableHeader className="bg-slate-50 border-b border-slate-200">
            <TableRow className="hover:bg-slate-50 border-none">
              <TableHead className="text-slate-600 font-medium h-11">ID</TableHead>
              <TableHead className="text-slate-600 font-medium h-11">Title</TableHead>
              <TableHead className="text-slate-600 font-medium h-11">Price</TableHead>
              <TableHead className="text-slate-600 font-medium h-11">Status</TableHead>
              <TableHead className="text-slate-600 font-medium h-11">Late Fee</TableHead>
              <TableHead className="text-slate-600 font-medium h-11 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-slate-500 py-8">Loading data...</TableCell>
              </TableRow>
            )}
            {books.map((book) => (
              <TableRow key={book.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium text-slate-700">{book.id}</TableCell>
                <TableCell className="text-slate-900 font-medium">{book.title}</TableCell>
                <TableCell className="text-slate-500">${book.price.toFixed(2)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      !book.reserved
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {book.reserved ? (
                      <ToggleRight className="w-3.5 h-3.5" />
                    ) : (
                      <ToggleLeft className="w-3.5 h-3.5" />
                    )}
                    {!book.reserved ? "AVAILABLE" : "RESERVED"}
                  </span>
                </TableCell>
                <TableCell className="text-slate-500">
                  {book.overdue ? (
                    <span className="text-red-600 font-medium">${book.lateFee.toFixed(2)}</span>
                  ) : (
                    "$0.00"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(book)}
                      className="h-8 w-8 p-0 border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 rounded-md"
                      title="Edit book"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setDeleteConfirm(book.id)}
                      className="h-8 w-8 p-0 border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200 rounded-md"
                      title="Delete book"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!isLoading && books.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-slate-500 py-12">No books found in the catalog.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Book Modal */}
      <Dialog open={editingBook !== null} onOpenChange={(open) => { if (!open) closeEdit(); }}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 shadow-lg rounded-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-slate-900 font-semibold text-lg">
              Edit Book
            </DialogTitle>
            <p className="text-sm text-slate-500 mt-0.5">
              ID: <span className="font-mono font-medium text-slate-600">{editingBook?.id}</span>
            </p>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-3">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Title</label>
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                placeholder="Book title"
                className="border-slate-200 focus-visible:ring-blue-500 rounded-lg text-slate-900 shadow-sm"
                disabled={acting}
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Price ($)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={editForm.price || ""}
                onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className="border-slate-200 focus-visible:ring-blue-500 rounded-lg text-slate-900 shadow-sm"
                disabled={acting}
              />
            </div>

            {/* Late Fee */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Late Fee ($/day)</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={editForm.lateFee || ""}
                onChange={(e) => setEditForm({ ...editForm, lateFee: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className="border-slate-200 focus-visible:ring-blue-500 rounded-lg text-slate-900 shadow-sm"
                disabled={acting}
              />
            </div>

            {/* Status Toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <button
                type="button"
                onClick={() => setEditForm({ ...editForm, reserved: !editForm.reserved })}
                disabled={acting}
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                  editForm.reserved
                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                    : "bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                } disabled:opacity-50`}
              >
                <span className="flex items-center gap-2">
                  {editForm.reserved ? (
                    <ToggleRight className="w-4 h-4" />
                  ) : (
                    <ToggleLeft className="w-4 h-4" />
                  )}
                  {editForm.reserved ? "Reserved" : "Available"}
                </span>
                <span className="text-xs opacity-70">Click to toggle</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-2 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                onClick={closeEdit}
                disabled={acting}
                className="border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={acting || !editForm.title.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm"
              >
                {acting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirm !== null} onOpenChange={(open) => { if (!open) setDeleteConfirm(null); }}>
        <DialogContent className="bg-white border-slate-200 text-slate-900 shadow-lg rounded-xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-slate-900 font-semibold">Delete Book</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-500 mt-1">
            Are you sure you want to delete <span className="font-semibold text-slate-700">
              {books.find(b => b.id === deleteConfirm)?.title}
            </span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
              disabled={acting}
              className="border-slate-200 text-slate-600 hover:bg-slate-50 font-medium rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
              disabled={acting}
              className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
            >
              {acting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
