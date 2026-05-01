import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVenueById } from "../services/venueService";
import type { Venue } from "../types/venue";

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVenue() {
      try {
        if (!id) return;

        const data = await getVenueById(id);
        setVenue(data);
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadVenue();
  }, [id]);

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p>{error}</p>;
  if (!venue) return <p>No venue found</p>;

  return (
  <section className="mx-auto max-w-5xl space-y-8 px-4 py-10">
    
    {/* Image */}
    <div className="h-80 w-full overflow-hidden rounded-3xl bg-stone-200">
      {venue.media?.[0]?.url && (
        <img
          src={venue.media[0].url}
          alt={venue.name}
          className="h-full w-full object-cover"
        />
      )}
    </div>

    {/* Content */}
   <div className="sspace-y-10">
  <h1 className="text-3xl font-medium tracking-tight text-stone-900">
    {venue.name.replace(/^z+/i, "")}
  </h1>

  <p className="text-sm text-stone-500">
    {venue.location?.city}, {venue.location?.country}
  </p>

  <div className="flex items-center gap-4 text-sm text-stone-600">
  <span>{venue.maxGuests} guests</span>
  <span>Rating: {venue.rating}</span>
</div>

  <p className="text-base leading-relaxed text-stone-700 max-w-2xl">
    {venue.description}
  </p>

  <p className="pt-2 text-lg font-medium text-stone-900">
    ${venue.price} / night
  </p>
</div>

  </section>
);
}

export default VenuePage;