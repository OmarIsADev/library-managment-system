import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { useBooks } from "../hooks/useBooks";
import { useTransactions } from "../hooks/useTransactions";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { LogOut, Search, Library, BookMarked } from "lucide-react";
import { BookCard } from "../components/BookCard";
import { Link } from "react-router";

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const { books, isLoading: loadingBooks, refetch: refetchBooks } = useBooks();
  const { reserveBook, isLoading: acting } = useTransactions(user?.id);
  const [search, setSearch] = useState("");

  const handleReserve = async (id: string) => {
    if (!user) return;
    await reserveBook(id, user.id);
    await refetchBooks();
  };

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <ProtectedRoute allowedRole="STUDENT">
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
        <header className="bg-white border-b border-slate-200 px-8 py-4 mb-8 shadow-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Library className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-slate-900">Student Portal</h1>
                <p className="text-sm text-slate-500 font-medium">Welcome back, {user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/student/reservations">
                <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50 font-medium bg-white">
                  <BookMarked className="w-4 h-4 mr-2" /> My Reservations
                </Button>
              </Link>
              <Button variant="outline" onClick={logout} className="border-slate-200 text-slate-600 hover:bg-slate-50 font-medium bg-white">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-8">
          <div className="max-w-lg mb-8 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books by title..." 
              className="pl-10 bg-white border-slate-200 rounded-lg shadow-sm text-slate-900 h-11 focus-visible:ring-blue-500" 
            />
          </div>

          {loadingBooks ? (
            <div className="text-slate-500 mt-12 text-center text-sm font-medium">Loading catalog data...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onReserve={handleReserve} 
                  isReserving={acting} 
                />
              ))}
              {filteredBooks.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-500 bg-white border border-dashed border-slate-200 rounded-xl">
                  <Library className="w-8 h-8 mx-auto text-slate-300 mb-3" />
                  <p className="font-medium text-sm">No books found matching your search.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
