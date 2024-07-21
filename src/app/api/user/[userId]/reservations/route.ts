import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  if (!userId) {
    return {
      status: 400,
      body: {
        message: "Missing userId",
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
