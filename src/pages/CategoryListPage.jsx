import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const FOODS_URL = "https://pteahbay-api.cheatdev.online/food-items";

export default function CategoryListPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await axios.get(FOODS_URL, { timeout: 15000 });
        const list = Array.isArray(res.data) ? res.data : [];
        setFoods(list);
      } catch (e) {
        console.log(e);
        setErr("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cuisines = useMemo(() => {
    const set = new Set(
      foods.map((f) => f?.cuisine).filter((x) => typeof x === "string" && x.trim() !== "")
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [foods]);

  if (loading) return <div className="max-w-6xl mx-auto px-6 py-10 text-gray-500">Loading...</div>;
  if (err) return <div className="max-w-6xl mx-auto px-6 py-10 text-red-600 font-semibold">{err}</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-2">Categories</h1>
      <p className="text-sm text-gray-500 mb-8">Choose a cuisine to explore foods.</p>

      {cuisines.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-500">
          No cuisines found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cuisines.map((name) => (
            <Link
              key={name}
              to={`/category/${encodeURIComponent(name)}`}
              className="border rounded-2xl p-5 hover:shadow-sm transition bg-white"
            >
              <div className="font-semibold text-gray-900">{name}</div>
              <div className="text-sm text-gray-500 mt-1">View foods in this cuisine</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
