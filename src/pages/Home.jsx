import { useEffect, useMemo, useState } from "react";
import { getCategories } from "../api/categories.api";
import { getFoods } from "../api/foods.api";
import FoodCard from "../components/food/FoodCard";
import { Link } from "react-router-dom";

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

        // You can also pass params: getFoods({ search: "...", page: 1, limit: 20 })
        const [cRes, fRes] = await Promise.all([getCategories(), getFoods()]);

        // ---- Categories: try many possible shapes safely ----
        const rawCats = cRes?.data?.data ?? cRes?.data ?? [];
        const cats = Array.isArray(rawCats)
          ? rawCats
          : Array.isArray(rawCats?.items)
          ? rawCats.items
          : [];

        // ---- Foods: Swagger list is usually data.items ----
        const rawFoods =
          fRes?.data?.data?.items ?? fRes?.data?.items ?? fRes?.data?.data ?? fRes?.data ?? [];
        const fs = Array.isArray(rawFoods) ? rawFoods : [];

        setCategories(cats);
        setFoods(fs);

        // default active category (first one)
        if (cats.length > 0) setActiveCat(cats[0]);
      } catch (e) {
        console.log("Home load error:", e);
        setErr(e?.message || "Failed to load foods/categories.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredFoods = useMemo(() => {
  const list = Array.isArray(foods) ? foods : [];
  const text = q.trim().toLowerCase();

  return list.filter((f) => {
    const name = String(f?.name ?? "").toLowerCase();
    const matchText = !text || name.includes(text);

    if (!activeCat) return matchText;

    const catId = activeCat?.id ?? activeCat?._id;
    const foodCat =
      f?.categoryId ?? f?.category_id ?? f?.category?.id ?? f?.category?._id ?? f?.category;

    const matchCat =
      catId == null || foodCat == null ? true : String(foodCat) === String(catId);

    return matchText && matchCat;
  });
}, [foods, q, activeCat]);

  const safeCategories = Array.isArray(categories) ? categories : [];

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
        <div className="text-red-500 font-semibold">{err}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
  <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
    Discover Food
  </h1>

  {/* Category chips */}
  <div className="flex items-center gap-3 mb-8 flex-wrap">
    {safeCategories.map((c) => {
      const id = c?.id ?? c?._id ?? c?.categoryId;
      const isActive = (activeCat?.id ?? activeCat?._id) === id;

      return (
        <button
          key={id ?? Math.random()}
          onClick={() => setActiveCat(c)}
          className={
            isActive
              ? "bg-primary text-white px-5 py-2 rounded-full text-xs font-semibold shadow-sm"
              : "bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition"
          }
          type="button"
        >
          {c?.name ?? "Category"}
        </button>
      );
    })}

    {/* All */}
    <button
      onClick={() => setActiveCat(null)}
      className={
        !activeCat
          ? "bg-primary text-white px-5 py-2 rounded-full text-xs font-semibold shadow-sm"
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
        <FoodCard key={food?.id ?? food?._id ?? Math.random()} food={food} />
      ))}
    </div>
  )}

  <div className="mt-10 text-sm text-gray-500">
    Test route:{" "}
    <Link className="text-primary font-semibold" to="/category/1">
      /category/1
    </Link>
  </div>
</div>

  );
}
