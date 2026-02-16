import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "https://pteahbay-api.cheatdev.online";

export default function Register() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const extractError = (err) => {
    const data = err?.response?.data;
    if (!data) return err?.message || "Register failed";

    if (typeof data.detail === "string") return data.detail;
    if (Array.isArray(data.detail)) return data.detail.map((x) => x.msg).join(", ");

    return data.message || "Register failed";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!username.trim() || !fullName.trim() || !email.trim() || !password.trim()) {
      setMsg("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_BASE}/auth/register`,
        {
          username: username.trim(),
          email: email.trim(),
          full_name: fullName.trim(), // ✅ API expects full_name
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );

      console.log("REGISTER OK:", res.data);
      nav("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err?.response?.data || err);
      setMsg(extractError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-[32px] border border-gray-200 bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-extrabold mb-2">Sign Up</h1>
        <p className="text-gray-500 mb-8">Create your PteahBay account</p>

        {msg && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
            {msg}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Full name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 transition disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-8 text-gray-600">
          Already have an account?{" "}
          <Link className="font-bold text-gray-900" to="/login">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
