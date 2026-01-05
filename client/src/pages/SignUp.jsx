import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sign up failed");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/my-list");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Confirm Password</label>
          <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none" />
        </div>
        <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors mb-4">
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="text-center text-gray-400">
          Already have an account? <Link to="/sign-in" className="text-blue-400 hover:underline">Sign In</Link>
        </div>
      </form>
    </div>
  );
}
