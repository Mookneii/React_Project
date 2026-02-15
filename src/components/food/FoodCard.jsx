import { useState } from "react";
import { Link } from "react-router-dom";

export default function FoodCard({ food }) {
  const [fav, setFav] = useState(false);

  const id = food?.id ?? food?._id ?? 1;
  const name = food?.name ?? "Food Name";
  const desc =
    food?.description ??
    "Traditional Khmer curry steamed in banana leaf";
  const price = food?.price ?? 12.5;

  // image from API (if exists) else placeholder
  const img =
    food?.image_url ||
    food?.image ||
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80&auto=format&fit=crop";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/food/${id}`}>
        <div className="h-40 w-full overflow-hidden">
          <img
            src={img}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      <div className="p-4">
        {/* title + heart */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-bold text-gray-900 text-sm leading-tight">
            {name}
          </h3>

          <button
            type="button"
            onClick={() => setFav((v) => !v)}
            className="text-gray-400 hover:text-primary transition"
            aria-label="favorite"
            title="favorite"
          >
            {fav ? (
              // filled heart
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary">
                <path d="M12 21s-7.3-4.5-9.6-8.7C.7 9 .9 5.9 3.3 4.2 5.3 2.8 8 3.3 9.6 5c.9.9 1.6 2 2.4 3 .8-1 1.5-2.1 2.4-3 1.6-1.7 4.3-2.2 6.3-.8 2.4 1.7 2.6 4.8.9 8.1C19.3 16.5 12 21 12 21z" />
              </svg>
            ) : (
              // outline heart
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.8 4.6c-1.8-1.7-4.7-1.5-6.4.3L12 7.4 9.6 4.9C7.9 3.1 5 2.9 3.2 4.6c-2 1.9-2 5.1 0 7l8.8 8.7 8.8-8.7c2-1.9 2-5.1 0-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* description */}
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
          {desc}
        </p>

        {/* price */}
        <div className="mt-4 font-extrabold text-primary text-sm">
          ${Number(price).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
