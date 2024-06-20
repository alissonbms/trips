import { prisma } from "@/lib/prisma";
import React from "react";
import TripHeader from "./components/TripHeader";

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
    </div>
  );
};

export default TripDetails;
