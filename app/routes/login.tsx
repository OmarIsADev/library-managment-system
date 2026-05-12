import { useAuth } from "../hooks/useAuth";
import { Navigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { LibraryBig } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const { user, login, isLoading, error } = useAuth();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    // Navigate based on role
    const dashboardPath = user.role.toLowerCase() === "admin" || user.role.toLowerCase() === "head_admin" 
      ? "/admin/dashboard" 
      : "/student/dashboard";
    return <Navigate to={dashboardPath} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(id, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 p-8 shadow-sm rounded-xl relative">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <LibraryBig className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm">Please sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">User ID</label>
            <Input 
              type="text" 
              placeholder="e.g. student1 or admin" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              required 
              className="h-11 shadow-sm rounded-lg"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="h-11 shadow-sm rounded-lg"
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-11 rounded-lg font-medium transition-colors"
          >
            {isLoading ? "Authenticating..." : "Sign in"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">Don't have an account? </span>
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
}
