import Button from "@/components/Button";
import Image from "next/image";
import React from "react";

interface TripLocationProps {
  location: string;
  locationDescription: string;
}

const TripLocation = ({ location, locationDescription }: TripLocationProps) => {
  return (
    <div className="p-5">
      <h2 className="text-primaryDarker font-semibold mb-5">Localização</h2>
      <div className="relative w-full h-[280px]">
        <Image
          src="/map-mobile.png"
          alt={location}
          fill
          className="object-cover rounded-lg shadow-md"
        />
      </div>

      <p className="text-sm text-primaryDarker font-semibold mt-3">
        {location}
      </p>
      <p className="text-xs text-primaryDarker mt-2 leading-5">
        {locationDescription}
      </p>

      <Button variant="outlined" className="w-full mt-5">
        Ver no Google Maps
      </Button>
    </div>
  );
};

export default TripLocation;
