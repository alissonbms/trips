import { Trip } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ReactCountryFlag from "react-country-flag";

interface TripHeaderProps {
  trip: Trip;
}
const TripHeader = ({ trip }: TripHeaderProps) => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full lg:hidden">
        <Image
          src={trip.coverImage}
          alt={trip.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="hidden lg:grid gap-2 lg:grid-rows-2 lg:grid-cols-[2fr,1fr,1fr] lg:order-2">
        <div className="relative row-span-2">
          <Image
            src={trip.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
          />
        </div>
        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[0]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md"
          />
        </div>
        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[1]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md rounded-tr-lg"
          />
        </div>
        <div className="relative h-[200px] w-full">
          <Image
            src={trip.imagesUrl[2]}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md"
          />
        </div>
        <div className="relative h-[200px] w-full">
          <Image
            src={trip.coverImage}
            fill
            style={{
              objectFit: "cover",
            }}
            alt={trip.name}
            className="shadow-md  rounded-br-lg"
          />
        </div>
      </div>

      <div className="flex flex-col p-5 lg:order-1 lg:px-0 lg:pb-10">
        <h1 className="text-xl lg:text-3xl font-semibold text-primaryDarker">
          {trip.name}
        </h1>
        <div className="flex items-center gap-1 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs lg:text-base text-grayPrimary underline">
            {trip.location}
          </p>
        </div>
        <p className="text-xs text-grayPrimary lg:hidden">
          <span className="text-primary font-bold">
            R${trip.pricePerDay.toString()}
          </span>{" "}
          por dia
        </p>
      </div>
    </div>
  );
};

export default TripHeader;
