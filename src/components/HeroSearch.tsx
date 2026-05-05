interface HeroSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

function HeroSearch({ searchQuery, onSearchChange }: HeroSearchProps) {
  return (
    <section className="relative mb-10 overflow-hidden rounded-3xl px-6 py-20 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
          alt="Luxury stay"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <h1 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl">
          Find your next stay
        </h1>

        <form className="mx-auto grid max-w-4xl gap-3 rounded-3xl bg-white p-4 text-left text-stone-900 shadow-xl md:grid-cols-[1.5fr_1fr_1fr_auto]">
          <label className="rounded-xl border border-stone-300 px-4 py-3">
            <span className="block text-xs font-semibold text-stone-500">
              Where
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search destination"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <label className="rounded-xl border border-stone-300 px-4 py-3">
            <span className="block text-xs font-semibold text-stone-500">
              Dates
            </span>
            <input
              type="text"
              placeholder="Select dates"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <label className="rounded-xl border border-stone-300 px-4 py-3">
            <span className="block text-xs font-semibold text-stone-500">
              Guests
            </span>
            <input
              type="text"
              placeholder="2 guests"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <button
            type="submit"
            className="rounded-xl bg-[#02101f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#162036]"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default HeroSearch;