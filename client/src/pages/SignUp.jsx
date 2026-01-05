import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, UserPlus, Github, Globe } from "lucide-react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordStrength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[a-z]/.test(password)) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^a-zA-Z0-9]/.test(password)) s++;
    return s;
  })();

  const passwordsMatch = password && confirm && password === confirm;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!agree) return setError('You must agree to the Terms of Service');
    if (password !== confirm) return setError("Passwords do not match");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || 'Sign up failed');
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
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm text-gray-500">Join us to start managing your watchlist</p>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <div className="text-sm text-red-600">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="sr-only">Full name</label>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><User className="w-4 h-4" /></div>
            <input
              placeholder="Full name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full pl-11 pr-3 py-2 border rounded bg-white"
            />
          </div>

          <div className="relative">
            <label className="sr-only">Email</label>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-4 h-4" /></div>
            <input
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full pl-11 pr-3 py-2 border rounded bg-white"
            />
            <p className="text-xs text-gray-400 mt-1">We'll never share your email.</p>
          </div>

          <div className="relative">
            <label className="sr-only">Password</label>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-4 h-4" /></div>
            <input
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full pl-11 pr-12 py-2 border rounded bg-white"
            />
            <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 bg-white p-2 rounded shadow-sm">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {password && (
              <div className="mt-2 text-xs">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded ${passwordStrength >= i ? (passwordStrength <= 2 ? 'bg-red-500' : passwordStrength === 3 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-gray-200'}`} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <label className="sr-only">Confirm password</label>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-4 h-4" /></div>
            <input
              placeholder="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              className="w-full pl-11 pr-12 py-2 border rounded bg-white"
            />
            <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 bg-white p-2 rounded shadow-sm">
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {confirm && (
              <div className={`mt-2 text-xs ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                {passwordsMatch ? (
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" />Passwords match</div>
                ) : (
                  <div className="flex items-center gap-2"><AlertCircle className="w-4 h-4" />Passwords do not match</div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input id="agree" type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="w-4 h-4 bg-white border rounded" />
            <label htmlFor="agree" className="text-sm text-gray-600">I agree to the <Link to="/terms" className="text-indigo-600 underline">Terms of Service</Link></label>
          </div>

          <button type="submit" disabled={loading || !agree} className={`w-full py-2 rounded text-white font-semibold ${!agree ? 'opacity-60 cursor-not-allowed' : ''}`} style={{ background: 'linear-gradient(90deg,#6366f1,#2563eb)' }}>
            {loading ? 'Creating...' : (
              <div className="flex items-center justify-center gap-2"><UserPlus className="w-4 h-4" />Create Account</div>
            )}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500">Or continue with</div>
        <div className="mt-3 flex gap-3 justify-center">
          <button className="flex items-center gap-2 px-4 py-2 border rounded bg-white text-gray-800 hover:bg-gray-100">
            <Github className="w-4 h-4" /> GitHub
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border rounded bg-white text-gray-800 hover:bg-gray-100">
            <Globe className="w-4 h-4" /> Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          Already have an account? <Link to="/sign-in" className="text-indigo-600 font-medium">Sign in</Link>
        </div>
      </div>
    </div>
  );
}