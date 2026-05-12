import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { LibraryBig } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const { register, isLoading, error } = useAuth();
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    
    await register(id, firstName, lastName, password);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 p-8 shadow-sm rounded-xl relative">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-blue-50 p-3 rounded-full mb-4">
            <LibraryBig className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">Create an Account</h1>
          <p className="text-slate-500 text-sm">Sign up as a new student</p>
        </div>

        {(error || localError) && (
          <div className="mb-4 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {localError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Student ID</label>
            <Input 
              type="text" 
              placeholder="e.g. s12345" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              required 
              className="h-11 shadow-sm rounded-lg"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-slate-700">First Name</label>
              <Input 
                type="text" 
                placeholder="John" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required 
                className="h-11 shadow-sm rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-sm font-medium text-slate-700">Last Name</label>
              <Input 
                type="text" 
                placeholder="Doe" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required 
                className="h-11 shadow-sm rounded-lg"
              />
            </div>
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

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
            <Input 
              type="password" 
              placeholder="••••••••" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
              className="h-11 shadow-sm rounded-lg"
            />
          </div>

          <Button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm h-11 rounded-lg font-medium transition-colors"
          >
            {isLoading ? "Creating Account..." : "Sign up"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500">Already have an account? </span>
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
