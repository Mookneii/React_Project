export default function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-[#2b2b2b] to-[#1f1f1f] text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + tagline + socials */}
          <div className="space-y-5">
            <h2 className="text-2xl font-extrabold text-primary">PteahBay</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Discover the best food experiences in Cambodia
            </p>

            <div className="flex gap-6 pt-6">
              <SocialPill icon="facebook" />
              <SocialPill icon="instagram" />
              <SocialPill icon="twitter" />
            </div>
          </div>

          {/* Explore */}
          <FooterCol
            title="Explore"
            items={["Categories", "Restaurants", "Popular Dishes", "New Arrivals"]}
          />

          {/* Company */}
          <FooterCol
            title="Company"
            items={["About Us", "Contact", "Careers", "Blog"]}
          />

          {/* Support */}
          <FooterCol
            title="Support"
            items={["Help Center", "Terms of Service", "Privacy Policy", "FAQ"]}
          />
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <ul className="space-y-3 text-sm text-gray-400">
        {items.map((t) => (
          <li key={t} className="hover:text-gray-200 cursor-pointer transition">
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialPill({ icon }) {
  return (
    <button
      type="button"
      className="h-16 w-14 rounded-xl bg-white/10 hover:bg-white/15 transition flex items-center justify-center"
      aria-label={icon}
      title={icon}
    >
      {icon === "facebook" && (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white/90"
          fill="currentColor"
        >
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1V12h2.1V9.8c0-2.1 1.2-3.3 3.1-3.3.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.4 2.9h-1.8v7A10 10 0 0 0 22 12z" />
        </svg>
      )}

      {icon === "instagram" && (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white/90"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )}

      {icon === "twitter" && (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white/90"
          fill="currentColor"
        >
          <path d="M18.3 2H21l-6.6 7.6L22 22h-6.9l-5.4-7-6.1 7H1l7.1-8.2L2 2h7l4.9 6.4L18.3 2zm-1.2 18h1.9L7 3.9H5L17.1 20z" />
        </svg>
      )}
    </button>
  );
}
