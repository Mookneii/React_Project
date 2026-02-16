import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import FoodCard from "../components/food/FoodCard";

const FOODS_URL = "https://pteahbay-api.cheatdev.online/food-items";

const norm = (v) =>
  String(v ?? "").trim().toLowerCase().replace(/\s+/g, " ");

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await axios.get(FOODS_URL, { timeout: 15000 });
        const list = Array.isArray(res.data) ? res.data : [];

        if (!cancelled) {
          setFoods(list);

          // default cuisine (first one) if exists
          const firstCuisine = list.find((x) => String(x?.cuisine ?? "").trim())?.cuisine;
          if (firstCuisine) setActiveCuisine(firstCuisine);
          else setActiveCuisine("All");
        }
      } catch (e) {
        console.log("Home load error:", e);
        if (!cancelled) setErr(e?.message || "Failed to load foods.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ make cuisine chips from foods (unique cuisines)
  const cuisines = useMemo(() => {
    const set = new Set();
    for (const f of foods) {
      const c = String(f?.cuisine ?? "").trim();
      if (c) set.add(c);
    }
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [foods]);

  // ✅ filter + search + sort
  const filteredFoods = useMemo(() => {
    const text = norm(q);
    const targetCuisine = norm(activeCuisine);

    let list = Array.isArray(foods) ? foods : [];

    // filter by cuisine
    if (activeCuisine !== "All") {
      list = list.filter((f) => norm(f?.cuisine) === targetCuisine);
    }

    // search by name
    if (text) {
      list = list.filter((f) => norm(f?.name).includes(text));
    }

    // sort
    list = [...list].sort((a, b) => {
      if (sort === "price_asc") return (a?.price ?? 0) - (b?.price ?? 0);
      if (sort === "price_desc") return (b?.price ?? 0) - (a?.price ?? 0);
      if (sort === "popularity")
        return (b?.popularity_score ?? 0) - (a?.popularity_score ?? 0);

      // newest
      const da = new Date(a?.created_at ?? 0).getTime();
      const db = new Date(b?.created_at ?? 0).getTime();
      return db - da;
    });

    return list;
  }, [foods, activeCuisine, q, sort]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  if (err) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 text-red-600 font-semibold">
        {err}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      

      {/* Top Row: chips + sort */}
      <div className="flex items-start justify-between gap-6 mb-6 flex-wrap">
        {/* Cuisine chips */}
        <div className="flex gap-3 flex-wrap">
          {cuisines.map((c) => {
            const isActive = c === activeCuisine;
            
          })}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      </div>

      

      {/* Grid */}
      {filteredFoods.length === 0 ? (
        <div className="border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-500">
          No foods found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard key={food?.id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
}
