import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
  mapLocation: string;
}

const TripLocation = ({
  location,
  mapLocation,
  locationDescription,
}: TripLocationProps) => {
  return (
    <div className="p-5">
      <h2 className="text-primaryDarker font-semibold mb-5">Localização:</h2>
      <div className="overflow-hidden relative h-0 pb-[50vh]">
        <iframe
          className="absolute left-0 top-0 border-0 h-[100%] w-[100%]"
          src={mapLocation}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Responsive Google Map"
        ></iframe>
      </div>

      <p className="text-sm text-primaryDarker font-semibold mt-7">
        {location}
      </p>
      <p className="text-xs text-primaryDarker mt-2 leading-5">
        {locationDescription}
      </p>
    </div>
  );
};

export default TripLocation;
