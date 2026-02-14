import { create } from "zustand";

export const useFavoriteStore = create((set, get) => ({
  favs: [],
  toggleFav: (id) => {
    const current = get().favs;
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    set({ favs: next });
  },
  isFav: (id) => get().favs.includes(id),
}));
