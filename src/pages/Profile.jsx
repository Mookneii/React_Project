import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://pteahbay-api.cheatdev.online";

export default function Profile() {
  const nav = useNavigate();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const getToken = () => {
    try {
      return localStorage.getItem("token");
    } catch (_) {
      return null;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
    } catch (_) {}
    delete axios.defaults.headers.common.Authorization;
    nav("/login");
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setMsg("");

        const token = getToken();
        if (!token) {
          nav("/login");
          return;
        }

        const res = await axios.get(`${API_BASE}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 15000,
        });

        setMe(res.data);
      } catch (err) {
        console.log("ME ERROR:", err?.response?.data || err);

        // token invalid / expired
        if (err?.response?.status === 401) {
          logout();
          return;
        }

        setMsg("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div className="max-w-6xl mx-auto px-6 py-10">Loading...</div>;

  if (msg) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-red-600 font-semibold">{msg}</div>
      </div>
    );
  }

  const avatar =
    me?.profile_image ||
    "https://wallpapers.com/images/hd/placeholder-profile-icon-8qmjk1094jhbem9j.jpg";

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your account settings and preferences</p>
      </div>

      <div className="border rounded-2xl p-6 bg-white shadow-sm flex items-center gap-6">
        <img
          src={avatar}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold">{me?.full_name || me?.username || "User"}</h2>
            <span className="text-xs px-2 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-100">
              {me?.role || "user"}
            </span>
          </div>

          <div className="text-sm text-gray-600 mt-2 space-y-1">
            <div>Username: <span className="font-semibold">{me?.username}</span></div>
            <div>Email: <span className="font-semibold">{me?.email}</span></div>
            <div>User ID: <span className="font-semibold">{me?.id}</span></div>
            <div>
              Active:{" "}
              <span className={`font-semibold ${me?.is_active ? "text-green-600" : "text-red-600"}`}>
                {me?.is_active ? "Yes" : "No"}
              </span>
            </div>
            <div>Created: <span className="font-semibold">{me?.created_at || "-"}</span></div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
