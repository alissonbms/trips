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

const TripDetails = async ({ params }: { params: { tripId: string } }) => {
  const trip = await getTripDetails(params.tripId);

  if (!trip) {
    return null;
  }

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation trip={trip} />
      <TripDescription description={trip.description} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation
        location={trip.location}
        locationDescription={trip.locationDescription}
      />
    </div>
  );
};

export default TripDetails;
