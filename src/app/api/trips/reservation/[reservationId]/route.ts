import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  {
    params: { reservationId },
  }: {
    params: { reservationId: string };
  }
) {
  if (!reservationId) {
    return new NextResponse(
      JSON.stringify({
        error: {
          code: "MISSING_RESERVATION_ID",
        },
      }),
      { status: 500 }
    );
  }

  const reservation = await prisma.tripReservation.delete({
    where: {
      id: reservationId,
    },
  });

  return new NextResponse(JSON.stringify(reservation), { status: 200 });
}
