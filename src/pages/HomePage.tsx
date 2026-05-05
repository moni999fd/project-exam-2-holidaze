import { useEffect, useState } from "react";
import { getVenues } from "../services/venueService";
import type { Venue } from "../types/venue";
import VenueCard from "../components/VenueCard";
import HeroSearch from "../components/HeroSearch";

function HomePage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadVenues() {
      try {
        const data = await getVenues();
        setVenues(data);
      } catch (err) {
        setError("Something went wrong while fetching venues.");
      } finally {
        setLoading(false);
      }
    }

    loadVenues();
  }, []);

  const filteredVenues = venues.filter((venue) => {
  const query = searchQuery.toLowerCase();

  return (
    venue.name.toLowerCase().includes(query) ||
    venue.location?.city?.toLowerCase().includes(query) ||
    venue.location?.country?.toLowerCase().includes(query)
  );
});

  if (loading) {
    return <p className="text-stone-700">Loading venues...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
  <section className="mx-auto max-w-6xl space-y-10 px-4 md:px-6 lg:px-8">
    <HeroSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredVenues.slice(0, visibleCount).map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
    {filteredVenues.length === 0 && (
      <p className="text-center text-stone-500">
        No venues found.
      </p>
    )}

    {visibleCount < filteredVenues.length && (
  <div className="flex justify-center pt-6">
    <button
      onClick={() => setVisibleCount((prev) => prev + 6)}
      className="rounded-xl bg-[#02101f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#162036] shadow-sm hover:shadow-md"
    >
      Discover more
    </button>
  </div>
)}
  </section>
);
}

export default HomePage;