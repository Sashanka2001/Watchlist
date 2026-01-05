import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  // Simple auth check: presence of token in localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
