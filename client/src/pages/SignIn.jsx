import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || "Login failed");
      return (
        <div className="min-h-screen flex items-center justify-center" style={{background: 'linear-gradient(135deg,#e0e7ff 0%,#f1f5f9 100%)'}}>
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
            <div className="bg-indigo-100 rounded-full p-4 mb-4">
              <Lock className="w-10 h-10 text-indigo-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h2>
            <p className="text-gray-500 mb-6 text-center">Sign in to manage your watchlist</p>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Mail className="w-5 h-5" /></span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Email Address" className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <div className="mb-6 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Lock className="w-5 h-5" /></span>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Password" className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2 rounded-lg font-semibold text-white mb-4" style={{background: 'linear-gradient(90deg,#6366f1 0%,#2563eb 100%)', boxShadow: '0 2px 8px #6366f133'}}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <div className="text-center text-gray-500 mt-2">
              Don't have an account? <Link to="/sign-up" className="text-indigo-500 hover:underline font-medium">Sign up</Link>
            </div>
          </div>
        </div>
      );
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-blue-100">Sign in to continue to your account</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 pt-6 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="text-gray-400 hover:text-gray-300 underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-gray-400 hover:text-gray-300 underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}