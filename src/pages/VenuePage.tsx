import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVenueById } from "../services/venueService";
import type { Venue } from "../types/venue";

function VenuePage() {
  const { id } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

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

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = venue ? nights * venue.price : 0;

  if (loading) return <p>Loading venue...</p>;
  if (error) return <p>{error}</p>;
  if (!venue) return <p>No venue found</p>;

  return (
    <section className="mx-auto max-w-5xl space-y-10 px-4 py-10">
      <div className="h-80 w-full overflow-hidden rounded-3xl bg-stone-200">
        {venue.media?.[0]?.url && (
          <img
            src={venue.media[0].url}
            alt={venue.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <div className="space-y-4">
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

            <p className="max-w-2xl text-base leading-relaxed text-stone-700">
              {venue.description}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-stone-900">Amenities</h2>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span>{venue.meta?.wifi ? "✔" : "✕"}</span>
                <span className={venue.meta?.wifi ? "text-stone-800" : "text-stone-400"}>
                  WiFi
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>{venue.meta?.parking ? "✔" : "✕"}</span>
                <span className={venue.meta?.parking ? "text-stone-800" : "text-stone-400"}>
                  Parking
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>{venue.meta?.breakfast ? "✔" : "✕"}</span>
                <span className={venue.meta?.breakfast ? "text-stone-800" : "text-stone-400"}>
                  Breakfast
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>{venue.meta?.pets ? "✔" : "✕"}</span>
                <span className={venue.meta?.pets ? "text-stone-800" : "text-stone-400"}>
                  Pets allowed
                </span>
              </div>
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-stone-300 backdrop-blur lg:sticky lg:top-28">
          <p className="mb-5 text-2xl font-semibold text-stone-900">
            ${venue.price}{" "}
            <span className="text-sm font-normal text-stone-500">/ night</span>
          </p>

          <form className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-stone-500">
                Check-in
              </span>
              <input
                type="date"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#02101f]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-medium text-stone-500">
                Check-out
              </span>
              
              <input
                type="date"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#02101f]"
              />
            </label>

            <label className="block">
  <span className="mb-1 block text-xs font-medium text-stone-500">
    Guests
  </span>

  <input
    type="number"
    min="1"
    max={venue.maxGuests}
    value={guests}
    onChange={(event) => {
      const value = Number(event.target.value);

      if (value < 1) {
        setGuests(1);
      } else if (value > venue.maxGuests) {
        setGuests(venue.maxGuests);
      } else {
        setGuests(value);
      }
    }}
    className="w-full rounded-xl border border-stone-300 bg-white px-3 py-3 text-sm outline-none focus:border-[#02101f]"
  />
</label>

{nights > 0 && (
  <div className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-700">
    <div className="flex justify-between">
      <span>
        ${venue.price} × {nights} night{nights > 1 ? "s" : ""}
      </span>
      <span>${totalPrice}</span>
    </div>

    <p className="mt-2 text-xs text-stone-500">
      For {guests} guest{guests > 1 ? "s" : ""}
    </p>
  </div>
)}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#02101f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#162036]"
            >
              Reserve
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-stone-500">
            You won’t be charged yet
          </p>
        </aside>
      </div>
    </section>
  );
}

export default VenuePage;