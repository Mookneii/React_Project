import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://pteahbay-api.cheatdev.online/food-items";

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");

        const res = await axios.get(`${BASE_URL}/${id}`);
        setItem(res.data);
      } catch (e) {
        console.log("Detail load error:", e);
        setErr("Failed to load food detail.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (err || !item) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="text-red-600 font-semibold">{err || "Food not found."}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Image */}
        <div>
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full rounded-2xl shadow-md"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {item.name}
          </h1>

          <p className="text-orange-500 text-2xl font-semibold mb-4">
            ${item.price}
          </p>

          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <p className="text-gray-600 mb-6">
            {item.description}
          </p>

          {/* Ingredients */}
          {item.ingredients?.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <div className="grid grid-cols-2 gap-3">
                {item.ingredients.map((ing, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-xl px-4 py-2 text-sm text-gray-700"
                  >
                    {ing}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
              ❤️ Add to Favorites
            </button>

            <button
              onClick={() => navigate(-1)}
              className="border border-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
