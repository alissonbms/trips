"use client";

import { Prisma, TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserReservationItem from "./UserReservationItem";

const MyTrips = () => {
  const [reservations, setReservations] =
    useState<Prisma.TripReservationGetPayload<{ include: { trip: true } }>[]>();
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
      );

      const res = await response.json();

      setReservations(res);
    };

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-primaryDarker font-semibold text-xl">
        Minhas reservas:
      </h1>
      <div>
        {reservations?.map((reservation) => (
          <UserReservationItem key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
