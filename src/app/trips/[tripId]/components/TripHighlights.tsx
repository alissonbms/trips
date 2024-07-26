import Image from "next/image";
import React from "react";

interface TripHighlightsProps {
  highlights: string[];
}
const TripHighlights = ({ highlights }: TripHighlightsProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0 lg:mt-12">
      <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">
        Destaques:
      </h2>

      <div className="flex flex-wrap gap-y-3 lg:gap-y-5">
        {highlights.map((highlight) => (
          <div
            key={highlight}
            className="flex  items-center w-1/2 gap-2 lg:gap-3"
          >
            <Image
              src="/check-icon.png"
              alt={highlight}
              width={15}
              height={15}
            />
            <p className="text-xs text-grayPrimary lg:text-base">{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripHighlights;
