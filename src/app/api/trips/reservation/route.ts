import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();

  const { startDate, endDate, tripId, userId, totalPaid, guests } = req;

  const trip = prisma.trip.findUnique({
    where: {
      id: tripId,
    },
  });

  if (!trip) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "TRIP_NOT_FOUND",
        },
      })
    );
  }

  await prisma.tripReservation.create({
    data: {
      start: new Date(startDate),
      end: new Date(endDate),
      userId,
      tripId,
      totalPaid,
      guests,
    },
  });

  return new NextResponse(
    JSON.stringify({
      success: true,
    }),
    { status: 201 }
  );
}
