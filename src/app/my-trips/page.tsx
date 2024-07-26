"use client";

import { Prisma, TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserReservationItem from "./components/UserReservationItem";
import Button from "@/components/Button";
import Link from "next/link";
import { toast } from "react-toastify";

const MyTrips = () => {
  const [reservations, setReservations] =
    useState<Prisma.TripReservationGetPayload<{ include: { trip: true } }>[]>();
  const { status, data } = useSession();
  const router = useRouter();

  const fetchReservations = async () => {
    const response = await fetch(
      `/api/user/${(data?.user as any)?.id}/reservations`
    );

    const res = await response.json();

    setReservations(res);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      toast.warning("Você precisa estar logado para realizar tal ação!", {
        position: "bottom-center",
      });
      return router.push("/");
    }

    fetchReservations();
  }, [status]);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-primaryDarker font-semibold text-xl md:text-center lg:text-2xl">
        Minhas viagens:
      </h1>
      <div>
        {reservations?.length! > 0 ? (
          <div className="gap-5 flex flex-col md:flex-row flex-wrap  lg:gap-10 lg:mt-6 justify-center">
            {reservations?.map((reservation) => (
              <div key={reservation.id} className="md:w-[347.8px]">
                <UserReservationItem
                  reservation={reservation}
                  fetchReservations={fetchReservations}
                />
              </div>
            ))}
          </div>
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
