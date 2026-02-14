import { Link } from "react-router-dom";
import { useFavoriteStore } from "../../store/favoriteStore";

export default function FoodCard({ food }) {
  const toggleFav = useFavoriteStore((s) => s.toggleFav);
  const isFav = useFavoriteStore((s) => s.isFav);

  const id = food?.id ?? food?._id;
  const name = food?.name ?? "Unnamed";
  const desc = food?.description ?? food?.desc ?? "No description";
  const price = food?.price ?? "—";
  const image = food?.image || food?.thumbnail || food?.photo || "";

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-soft transition">
      <Link to={`/food/${id}`}>
        <div className="h-40 bg-gray-100 overflow-hidden">
          {image ? (
            <img className="w-full h-full object-cover" src={image} alt={name} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold text-sm">{name}</h3>

          <button
            onClick={() => toggleFav(id)}
            className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition"
            aria-label="Favorite"
            type="button"
          >
            <span className="text-primary text-lg leading-none">
              {isFav(id) ? "❤" : "♡"}
            </span>
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{desc}</p>

        <div className="mt-4 flex items-end justify-between">
          <div className="text-sm font-extrabold">
            {typeof price === "number" ? `$${price.toFixed(2)}` : price}
          </div>

          {/* rating UI (optional) */}
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className="text-amber-400">★</span>
            <span>{food?.rating ?? "4.8"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
