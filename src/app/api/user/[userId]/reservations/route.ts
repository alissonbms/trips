import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params: { userId } }: { params: { userId: string } }
) {
  if (!userId) {
    return {
      status: 400,
      body: {
        message: "Missing user id",
      },
    };
  }

  const reservations = await prisma.tripReservation.findMany({
    where: {
      userId: userId,
    },
    include: {
      trip: true,
    },
  });

  return new NextResponse(JSON.stringify(reservations), { status: 200 });
}
