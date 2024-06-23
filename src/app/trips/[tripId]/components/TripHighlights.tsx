import Image from "next/image";
import React from "react";

interface TripHighlightsProps {
  highlights: string[];
}
const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-2">Destaques:</h2>

      <div className="flex flex-wrap gap-y-3">
        {highlights.map((highlight) => (
          <div key={highlight} className="flex  items-center w-1/2 gap-2">
            <Image
              src="/check-icon.png"
              alt={highlight}
              width={15}
              height={15}
            />
            <p className="text-xs text-grayPrimary">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
