import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			const data = await res.json();
			if (!res.ok) return setError(data.error || 'Sign in failed');
			if (data.token) localStorage.setItem('token', data.token);
			navigate('/home');
		} catch (err) {
			setError('Network error');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="w-full max-w-lg bg-white/95 rounded-2xl shadow-2xl p-8 mx-4 text-gray-900">
				<nav className="text-center mb-4">
					<Link to="/home" className="text-sm text-indigo-600 hover:underline mr-2">Home</Link>
					<Link to="/search" className="text-sm text-gray-600 hover:underline mr-2">Search</Link>
					<Link to="/my-list" className="text-sm text-gray-600 hover:underline">My List</Link>
				</nav>

				<div className="flex flex-col items-center mb-6">
					<div className="bg-indigo-100 rounded-full p-3 mb-3">
						<User className="w-8 h-8 text-indigo-600" />
					</div>
					<h2 className="text-2xl font-bold">Welcome back</h2>
					<p className="text-sm text-gray-500">Sign in to continue to your watchlist</p>
				</div>

				{error && (
					<div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded mb-4">
						<Lock className="w-5 h-5 text-red-500" />
						<div className="text-sm text-red-600">{error}</div>
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="relative">
						<label className="sr-only">Email</label>
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-4 h-4" /></div>
						<input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" className="w-full pl-11 pr-3 py-2 border rounded bg-white text-gray-800" />
					</div>

					<div className="relative">
						<label className="sr-only">Password</label>
						<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-4 h-4" /></div>
						<input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full pl-11 pr-12 py-2 border rounded bg-white text-gray-800" />
						<button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 bg-white p-2 rounded shadow-sm">
							{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
						</button>
					</div>

					<button type="submit" disabled={loading} className="w-full py-2 rounded text-white font-semibold" style={{ background: 'linear-gradient(90deg,#6366f1,#2563eb)' }}>
						{loading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<div className="mt-4 text-center text-sm text-gray-500">Don't have an account? <Link to="/sign-up" className="text-indigo-600 font-medium">Sign up</Link></div>
			</div>
		</div>
	);
}

