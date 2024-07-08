"use client";

import { Prisma, TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";
import Link from "next/link";

const MyTrips = () => {
  const [reservations, setReservations] =
    useState<Prisma.TripReservationGetPayload<{ include: { trip: true } }>[]>();
  const { status, data } = useSession();
  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(
      `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
    );

    const res = await response.json();

    setReservations(res);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-primaryDarker font-semibold text-xl">
        Minhas viagens:
      </h1>
      <div>
        {reservations?.length! > 0 ? (
          reservations?.map((reservation) => (
            <UserReservationItem
              key={reservation.id}
              reservation={reservation}
              fetchReservations={fetchReservations}
            />
          ))
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-primaryDarker text-xl">
              Você ainda não tem nenhuma reserva =(
            </p>
            <Link href="/">
              <Button variant="outlined" className="w-full">
                Fazer reserva
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
