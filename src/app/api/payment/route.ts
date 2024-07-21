import { authOptions } from "@/lib/configs/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function POST(request: Request) {
  const userSession = await getServerSession(authOptions);

  const req = await request.json();

  const {
    tripId,
    totalPaid,
    name,
    description,
    coverImage,
    startDate,
    endDate,
    guests,
  } = req;

  const session = await stripe.checkout.sessions.create({
    success_url: process.env.HOST_SUCCESS_URL!,
    cancel_url: process.env.HOST_CANCEL_URL!,
    metadata: {
      tripId,
      totalPaid,
      startDate,
      endDate,
      guests,
      userId: (userSession?.user as any)?.id,
    },
    line_items: [
      {
        price_data: {
          currency: "brl",
          unit_amount: totalPaid * 100,
          product_data: {
            name,
            description,
            images: [coverImage],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return new NextResponse(JSON.stringify({ sessionId: session.id }), {
    status: 201,
  });
}
