import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  import { useState } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, UserPlus } from "lucide-react";

  export default function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const getPasswordStrength = () => {
      if (!password) return 0;
      let s = 0;
      if (password.length >= 8) s++;
      if (/[a-z]/.test(password)) s++;
      if (/[A-Z]/.test(password)) s++;
      if (/[0-9]/.test(password)) s++;
      if (/[^a-zA-Z0-9]/.test(password)) s++;
      return s;
    };

    const strength = getPasswordStrength();
    const passwordsMatch = password && confirm && password === confirm;

    async function handleSubmit(e) {
      e.preventDefault();
      setError("");
      if (password !== confirm) return setError("Passwords do not match");
      if (password.length < 8) return setError("Password must be at least 8 characters");
      setLoading(true);
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST', headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();
        if (!res.ok) return setError(data.error || 'Sign up failed');
        localStorage.setItem('token', data.token);
        navigate('/home');
      } catch (err) {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }

    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg,#e0e7ff 0%,#f1f5f9 100%)'}}>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-6">
            import { useState } from "react";
            import { useNavigate, Link } from "react-router-dom";
            import { User, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, UserPlus } from "lucide-react";

            export default function SignUp() {
              const [username, setUsername] = useState("");
              const [email, setEmail] = useState("");
              const [password, setPassword] = useState("");
              const [confirm, setConfirm] = useState("");
              const [showPassword, setShowPassword] = useState(false);
              const [showConfirm, setShowConfirm] = useState(false);
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
                <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#e0e7ff 0%,#f1f5f9 100%)' }}>
                  <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
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
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-3 py-2 border rounded bg-gray-50" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded bg-gray-50" />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                          <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded bg-gray-50 pr-10" />
                          <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        {password && (
                          <div className="mt-2 text-xs">
                            <div className="flex gap-1 mb-1">
                              {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`h-1 flex-1 rounded ${passwordStrength >= i ? (passwordStrength <= 2 ? 'bg-red-500' : passwordStrength === 3 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-gray-200'}`} />
                              ))}
                            </div>
                            <div className={`text-xs ${passwordStrength >= 4 ? 'text-green-600' : passwordStrength === 3 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {passwordStrength <= 2 && 'Weak password'}
                              {passwordStrength === 3 && 'Medium password'}
                              {passwordStrength >= 4 && 'Strong password'}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                        <div className="relative">
                          <input type={showConfirm ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} required className="w-full px-3 py-2 border rounded bg-gray-50 pr-10" />
                          <button type="button" onClick={() => setShowConfirm(s => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
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

                      <button type="submit" disabled={loading} className="w-full py-2 rounded text-white font-semibold" style={{ background: 'linear-gradient(90deg,#6366f1,#2563eb)' }}>
                        {loading ? 'Creating...' : 'Create Account'}
                      </button>
                    </form>

                    <div className="mt-4 text-center text-sm">
                      Already have an account? <Link to="/sign-in" className="text-indigo-600 font-medium">Sign in</Link>
                    </div>
                  </div>
                </div>
              );
            }