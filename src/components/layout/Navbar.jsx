import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6">
        <Link to="/" className="font-extrabold text-primary text-lg">
          PteahBay
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="font-semibold">Home</Link>
          <Link to="/category/1" className="text-gray-500 hover:text-gray-900">Categories</Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <input
            className="hidden sm:block border rounded-full px-3 py-1.5 text-sm w-56"
            placeholder="Search food..."
          />
          <Link
            to="/profile"
            className="w-9 h-9 rounded-full border flex items-center justify-center text-sm"
            aria-label="Profile"
          >
            👤
          </Link>
        </div>
      </div>
    </header>
  );
}
