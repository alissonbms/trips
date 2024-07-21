import { prisma } from "@/lib/prisma";
import React from "react";
import TripHeader from "./components/TripHeader";
import TripReservation from "./components/TripReservation";
import TripDescription from "./components/TripDescription";
import TripHighlights from "./components/TripHighlights";
import TripLocation from "./components/TripLocation";

const getTripDetails = async (tripId: string) => {
  const tripDetails = prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  return tripDetails;
};

const getTripReservationRange = async (tripId: string) => {
  const tripRange = prisma.tripReservation.findMany({
    where: {
      tripId: tripId,
    },
    select: {
      start: true,
      end: true,
    },
  });

  return tripRange;
};

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);
  const range = await getTripReservationRange(params.tripId);

  if (!trip) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation
        tripId={trip.id}
        maxGuests={trip.maxGuests}
        tripStartDate={trip.startDate}
        tripEndDate={trip.endDate}
        pricePerDay={trip.pricePerDay as any}
        range={range}
      />
      <TripDescription description={trip.description} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        location={trip.location}
        mapLocation={trip.mapLocation}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
