import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import FoodCard from "../components/food/FoodCard";
import { Link } from "react-router-dom";

const FOODS_URL = "https://pteahbay-api.cheatdev.online/food-items";

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCat, setActiveCat] = useState(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await axios.get(FOODS_URL, { timeout: 15000 });

        // Swagger example shows array directly
        const fs = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.items)
          ? res.data.items
          : Array.isArray(res.data?.data?.items)
          ? res.data.data.items
          : [];

        setFoods(fs);

        // Build cuisine categories from foods
        const cuisines = Array.from(
          new Set(fs.map((f) => f?.cuisine).filter(Boolean))
        );

        const cats = cuisines.map((name) => ({
          id: name, // use name as id
          name,
        }));

        setCategories(cats);
        if (cats.length > 0) setActiveCat(cats[0]);
      } catch (e) {
        console.log("Foods load error:", e);
        setErr(
          e?.response
            ? `Request failed: ${e.response.status} ${e.response.statusText}`
            : e?.message || "Failed to load foods."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const safeCategories = Array.isArray(categories) ? categories : [];
  const safeFoods = Array.isArray(foods) ? foods : [];

  const filteredFoods = useMemo(() => {
    const text = q.trim().toLowerCase();

    return safeFoods.filter((f) => {
      const name = String(f?.name ?? "").toLowerCase();
      const matchText = !text || name.includes(text);

      if (!activeCat) return matchText;

      const cuisine = f?.cuisine;
      const matchCuisine = cuisine ? cuisine === activeCat.name : true;

      return matchText && matchCuisine;
    });
  }, [safeFoods, q, activeCat]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-red-600 font-semibold">{err}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Discover Food
      </h1>

      

      {/* Category chips (from cuisine) */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {safeCategories.map((c) => {
          const isActive = activeCat?.id === c.id;

          return (
            <button
              key={c.id}
              onClick={() => setActiveCat(c)}
              className={
                isActive
                  ? "bg-orange-500 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-sm"
                  : "bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition"
              }
              type="button"
            >
              {c.name}
            </button>
          );
        })}

        {/* All */}
        <button
          onClick={() => setActiveCat(null)}
          className={
            !activeCat
              ? "bg-orange-500 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-sm"
              : "bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition"
          }
          type="button"
        >
          All
        </button>
      </div>

      {/* Foods grid */}
      {filteredFoods.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-500">
          No foods found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food?.id ?? Math.random()} food={food} />
          ))}
        </div>
      )}

      
    </div>
  );
}
