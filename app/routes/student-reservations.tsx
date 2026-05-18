import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { useTransactions } from "../hooks/useTransactions";
import { Button } from "../components/ui/button";
import { LogOut, Library, ArrowLeft, Clock, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import { Link } from "react-router";
import { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function StudentReservations() {
  const { user, logout } = useAuth();
  const { transactions, isLoading, error, refetch } = useTransactions(user?.id);

  useEffect(() => {
    if (user?.id) {
      refetch();
    }
  }, [user?.id, refetch]);

  const calculateFees = (dueDate: string, lateFee: number) => {
    const due = new Date(dueDate);
    const now = new Date();
    if (now > due) {
      const diffTime = Math.abs(now.getTime() - due.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays * lateFee;
    }
    return 0;
  };

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
                <h1 className="text-xl font-semibold tracking-tight text-slate-900">My Reservations</h1>
                <p className="text-sm text-slate-500 font-medium">{user?.name}'s Reserved Books</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/student/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Back to Dashboard
              </Link>
              <Button variant="outline" onClick={logout} className="border-slate-200 text-slate-600 hover:bg-slate-50 font-medium bg-white">
                <LogOut className="w-4 h-4 mr-2" /> Sign out
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-8">
          {isLoading ? (
            <div className="text-slate-500 mt-12 text-center text-sm font-medium">Loading reservations...</div>
          ) : error ? (
            <div className="text-red-500 mt-12 text-center text-sm font-medium">{error}</div>
          ) : transactions.length === 0 ? (
             <div className="py-16 text-center text-slate-500 bg-white border border-dashed border-slate-200 rounded-xl">
               <Library className="w-8 h-8 mx-auto text-slate-300 mb-3" />
               <p className="font-medium text-sm">You have no reserved books at the moment.</p>
               <Link to="/student/dashboard">
                 <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Browse Catalog</Button>
               </Link>
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {transactions.map(transaction => {
                const isOverdue = new Date(transaction.dueDate) < new Date();
                const fees = isOverdue ? calculateFees(transaction.dueDate, transaction.book.lateFee || 2) : 0;
                
                return (
                  <Card key={transaction.transactionId} className="bg-white border-slate-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`h-1 w-full ${isOverdue ? "bg-red-600" : "bg-emerald-500"}`} />
                    <CardHeader className="pb-3 px-5 pt-5">
                      <div className="flex justify-between items-start mb-2">
                        <div className="bg-slate-100 p-2 rounded-md">
                          <BookOpen className="w-4 h-4 text-slate-600" />
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${isOverdue ? "bg-red-50 text-red-700 border-red-200" : "bg-emerald-50 text-emerald-700 border-emerald-200"}`}>
                          {isOverdue ? "OVERDUE" : "ON TRACK"}
                        </span>
                      </div>
                      <CardTitle className="text-[17px] font-semibold leading-tight text-slate-900 line-clamp-2 mt-4">
                        {transaction.book.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-5 pb-5 mt-1">
                      <div className="flex flex-col gap-1 text-xs text-slate-500 font-medium">
                        <span className="flex items-center text-sm font-semibold text-slate-900 mb-2">
                          Price: ${transaction.book.price?.toFixed(2) || '0.00'}
                        </span>
                        
                        <div className={`flex items-center gap-1.5 mt-2 ${isOverdue ? 'text-red-600' : 'text-slate-600'}`}>
                          {isOverdue ? <AlertTriangle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          <span>Return By: {new Date(transaction.dueDate).toLocaleDateString()}</span>
                        </div>
                        
                        {isOverdue && (
                          <div className="mt-3 bg-red-50 p-3 rounded-lg border border-red-100 flex justify-between items-center text-sm">
                            <span className="text-red-800 font-semibold">Late Fees</span>
                            <span className="text-red-600 font-bold">${fees.toFixed(2)}</span>
                          </div>
                        )}
                        {!isOverdue && (
                           <div className="mt-3 bg-emerald-50 p-3 rounded-lg border border-emerald-100 flex items-center gap-2 text-sm text-emerald-700 font-medium">
                             <CheckCircle className="w-4 h-4" />
                             <span>No fees</span>
                           </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
