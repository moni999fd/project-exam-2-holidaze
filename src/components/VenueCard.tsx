import { Link } from "react-router-dom";
import type { Venue } from "../types/venue";

interface Props {
  venue: Venue;
}

function VenueCard({ venue }: Props) {
  const image = venue.media?.[0]?.url;

  return (
  <Link
    to={`/venue/${venue.id}`}
    className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-300 transition hover:shadow-lg"
  >
    {/* Image */}
    <div className="h-56 w-full bg-stone-300">
      {image ? (
        <img
          src={image}
          alt={venue.name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-stone-500">
          No image
        </div>
      )}
    </div>

    {/* Content */}
    <div className="p-5 space-y-2">
      <h2 className="text-base font-medium tracking-tight text-stone-900">
        {venue.name.replace(/^z+/i, "")}
      </h2>

      <p className="text-sm text-stone-500 leading-relaxed">
        {venue.location?.city || "Unknown city"},{" "}
        {venue.location?.country || "Unknown country"}
      </p>

      <p className="text-sm font-medium text-stone-700">
        ${venue.price} / night
      </p>
    </div>
  </Link>
);
}

export default VenueCard;