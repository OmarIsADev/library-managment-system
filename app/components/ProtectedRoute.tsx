import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: "ADMIN" | "STUDENT";
}

export function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRole) {
    const isAdmin = user.role === "ADMIN" || user.role === "HEAD_ADMIN";
    
    if (allowedRole === "ADMIN" && !isAdmin) {
      return <Navigate to="/student/dashboard" replace />;
    }
    
    if (allowedRole === "STUDENT" && isAdmin) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
