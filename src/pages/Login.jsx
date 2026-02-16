import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "https://pteahbay-api.cheatdev.online";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const saveAuth = (token, user) => {
    try {
      localStorage.setItem("token", token);
      if (user) localStorage.setItem("user", JSON.stringify(user));
    } catch (_) {}
  };

  const extractError = (err) => {
    const data = err?.response?.data;
    if (!data) return err?.message || "Login failed";

    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) return data.detail.map(x => x.msg).join(", ");
    return data.message || "Login failed";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email.trim() || !password.trim()) {
      setMsg("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/auth/login`,
        {
          email: email.trim(),
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );

      const { access_token, token_type, user } = res.data || {};

      if (!access_token) {
        console.log("LOGIN RESPONSE SHAPE:", res.data);
        setMsg("Login succeeded but no access_token returned.");
        return;
      }

      // save + set default header for future requests
      saveAuth(access_token, user);
      axios.defaults.headers.common.Authorization =
        `${token_type || "Bearer"} ${access_token}`;

      nav("/");
    } catch (err) {
      console.log("LOGIN ERROR:", err?.response?.data || err);
      setMsg(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl border border-black rounded-[32px] p-10 bg-white shadow-sm">
        <h1 className="text-5xl font-black mb-2">Sign In</h1>
        <p className="text-gray-500 mb-8">Welcome back</p>

        {msg && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
            {msg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full rounded-2xl border border-black px-5 py-4 outline-none"
              placeholder="user@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full rounded-2xl border border-black px-5 py-4 outline-none"
              placeholder="•••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link className="text-orange-500 font-bold" to="/register">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
