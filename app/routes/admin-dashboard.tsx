import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { useBooks } from "../hooks/useBooks";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { BooksTable } from "../components/BooksTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { BookPlus, LogOut, Settings } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { books, isLoading, createBook, updateBook, deleteBook, toggleBookStatus } = useBooks();
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    price: 0,
  });

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBook(newBook);
    setOpen(false);
    setNewBook({ id: "", title: "", price: 0 });
  };

  return (
    <ProtectedRoute allowedRole="ADMIN">
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <header className="bg-white border-b border-slate-200 px-8 py-4 mb-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                  Admin Portal
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  Signed in as {user?.name}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={logout}
              className="border-slate-200 text-slate-600 hover:bg-slate-50 font-medium bg-white"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Library Catalog
              </h2>
              <p className="text-sm text-slate-500">
                Manage your institution's book inventory.
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm h-10 flex items-center justify-center rounded-lg px-4">
                <BookPlus className="w-4 h-4 mr-2" /> Add Book
              </DialogTrigger>
              <DialogContent className="bg-white border-slate-200 text-slate-900 shadow-lg rounded-xl sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-900 font-semibold mb-2">
                    Add New Book
                  </DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleAddBook}
                  className="flex flex-col gap-4 mt-2"
                >
                  <Input
                    placeholder="Book ID"
                    value={newBook.id}
                    onChange={(e) =>
                      setNewBook({ ...newBook, id: e.target.value })
                    }
                    className="border-slate-200 focus-visible:ring-blue-500 rounded-lg text-slate-900 shadow-sm"
                    required
                  />
                  <Input
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                    className="border-slate-200 focus-visible:ring-blue-500 rounded-lg text-slate-900 shadow-sm"
                    required
                  />
                  <Input
                    placeholder="Price"
                    type="number"
                    step="0.01"
                    value={newBook.price || ""}
                    onChange={(e) =>
                      setNewBook({ ...newBook, price: parseFloat(e.target.value) })
                    }
                    className="border-slate-200 focus-visible:ring-blue-500 rounded-lg text-slate-900 shadow-sm"
                    required
                  />
                  <Button
                    type="submit"
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm rounded-lg h-10"
                  >
                    Save Book
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <BooksTable
            books={books}
            isLoading={isLoading}
            onUpdate={updateBook}
            onDelete={deleteBook}
            onToggleStatus={toggleBookStatus}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
}
