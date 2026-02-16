import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  // optional: keep search in URL (?q=)
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (q) params.set("q", q);
      else params.delete("q");

      // only update when on home page
      if (window.location.pathname === "/") {
        navigate({ pathname: "/", search: params.toString() }, { replace: true });
      }
    }, 300);
    return () => clearTimeout(t);
  }, [q, navigate]);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-gray-900 font-semibold"
      : "text-gray-500 hover:text-gray-900 transition";

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-8">
          <div className="text-xl font-extrabold text-orange-500"><img src="" alt="" />PteahBay</div>

          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/categories" className={linkClass}>
              Categories
            </NavLink>
          </nav>
        </div>

        {/* Right: Search + Avatar */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search food..."
              className="w-80 rounded-full border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {/* search icon */}
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 21l-4.3-4.3" />
              <circle cx="11" cy="11" r="7" />
            </svg>
          </div>

          {/* Avatar (click to profile) */}
          <button
            onClick={() => navigate("/profile")}
            className="h-9 w-9 rounded-full overflow-hidden border bg-gray-100"
            title="Profile"
            type="button"
          >
            <img
              alt="profile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDGgxK15fCpe0UseaP0_ZHZaBvZl7cGxbgQ&s"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden px-6 pb-3">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search food..."
            className="w-full rounded-full border px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 21l-4.3-4.3" />
            <circle cx="11" cy="11" r="7" />
          </svg>
        </div>
      </div>
      
    </header>
  );
}
