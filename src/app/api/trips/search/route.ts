import { prisma } from "@/lib/prisma";
import { endOfDay, isBefore, startOfDay } from "date-fns";
import { NextResponse } from "next/server";
import { Trip } from "@prisma/client";

export async function GET(request: Request) {
  const generateSearchQuery = (
    text: string,
    budget?: string | null,
    guests?: string | null
  ) => {
    let searchQuery: any = {
      OR: [
        {
          name: {
            search: text,
          },
        },
        {
          description: {
            search: text,
          },
        },
        {
          location: {
            search: text,
          },
        },
      ],
      AND: [],
    };

    if (budget !== "undefined" && budget !== "null") {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            pricePerDay: {
              lte: Number(budget),
            },
          },
        ],
      };
    }

    if (guests !== "undefined" && guests !== "null") {
      searchQuery = {
        ...searchQuery,
        AND: [
          ...searchQuery.AND,
          {
            maxGuests: {
              gte: Number(guests),
            },
          },
        ],
      };
    }

    return searchQuery;
  };

  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const budget = searchParams.get("budget") as string;
  const guests = searchParams.get("guests") as string;

  if (!text) {
    return new NextResponse(
      JSON.stringify({
        message: "MISSING TEXT PARAMETER",
      }),
      { status: 400 }
    );
  }

  const trips = await prisma.trip.findMany({
    where: generateSearchQuery(text, budget, guests),
  });

  if (isBefore(new Date(startDate), startOfDay(new Date()))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_START_DATE",
        },
      }),
      {
        status: 400,
      }
    );
  }

  if (isBefore(endOfDay(new Date(endDate)), new Date(startDate))) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "INVALID_END_DATE",
        },
      }),
      {
        status: 400,
      }
    );
  }

  if (trips) {
    let reservs: Trip[] = [];

    for (let i = 0; i < trips.length; i++) {
      const reservations = await prisma.tripReservation.findMany({
        where: {
          tripId: trips[i].id,
          start: {
            lte: new Date(endDate),
          },
          end: {
            gte: new Date(startDate),
          },
        },
      });

      if (reservations.length === 0) {
        reservs.push(trips[i]);
      }
    }

    return new NextResponse(JSON.stringify(reservs), { status: 200 });
  }
}
