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
    <div className="container mx-auto p-5 mt-4">
      <h1 className="text-primaryDarker font-semibold text-xl text-center md:text-2xl">
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
          <div className="container mx-auto">
            <div className="flex items-center justify-center flex-col gap-5 text-center h-[50vh]">
              <h1 className="text-primaryDarker text-2xl font-semibold lg:text-[1.8rem]">
                Você ainda não tem nenhuma reserva...
              </h1>
              <h2 className="text-grayPrimary text-lg font-semibold lg:text-xl">
                Não perca tempo! Desfrute de nossas viagens incríveis!
              </h2>
              <Button
                className="p-3 w-[400px]"
                onClick={() => router.push("/")}
              >
                <p className="text-base">Fazer reserva</p>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;
