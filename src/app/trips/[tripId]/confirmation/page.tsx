"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import ptBR from "date-fns/locale/pt-BR";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import Button from "@/components/Button";
import { Trip } from "@prisma/client";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const TripConfirmation = ({ params }: { params: { tripId: string } }) => {
  const { status, data } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [trip, setTrip] = useState<Trip | null>();
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const fetchTrip = async () => {
      const response = await fetch("/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          guests: searchParams.get("guests"),
        }),
      });

      const res = await response.json();

      if (res?.error) {
        return router.push("/");
      }

      setTrip(res.trip);
      setTotalPrice(res.totalPrice);
    };

    if (status === "unauthenticated") {
      toast.warning("Você precisa estar logado para realizar tal ação!", {
        position: "bottom-center",
      });
      return router.push("/");
    }

    fetchTrip();
  }, [status, searchParams, params, router]);

  if (!trip) {
    return null;
  }

  const handleBuyClick = async () => {
    const res = await fetch("/api/payment", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId: params.tripId,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          guests: Number(searchParams.get("guests")),
          totalPaid: totalPrice,
          coverImage: trip.coverImage,
          name: trip.name,
          description: trip.description,
        })
      ),
    });

    if (!res.ok) {
      toast.error("Ocorreu um erro ao tentar realizar a reserva!", {
        position: "bottom-center",
      });

      return router.push("/");
    }

    const { sessionId } = await res.json();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_KEY as string
    );

    await stripe?.redirectToCheckout({ sessionId });
  };

  const startDate = new Date(searchParams.get("startDate") as string);
  const endDate = new Date(searchParams.get("endDate") as string);
  const guests = searchParams.get("guests");

  return (
    <div className="container mx-auto p-5 lg:max-w-[600px]">
      <h1 className="font-semibold text-xl text-primaryDarker">Sua viagem:</h1>
      <div className="flex-flex-col p-5 mt-5 border border-solid border-grayLighter shadow-lg rounded-lg">
        <div className="flex items-center gap-3 pb-5 border-b border-solid border-grayLighter">
          <div className="relative h-[106px] w-[123px]">
            <Image
              src={trip?.coverImage}
              alt={trip?.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-primaryDarker">
              {trip.name}
            </h2>
            <div className="flex items-center gap-1 my-1">
              <ReactCountryFlag countryCode={trip.countryCode} svg />
              <p className="text-xs text-grayPrimary underline">
                {trip.location}
              </p>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-primaryDarker mt-3">
          Informações do preço:
        </h3>
        <div className="flex justify-between mt-1">
          <p className="text-primaryDarker">Total: </p>
          <p className="font-medium">R${totalPrice} </p>
        </div>
      </div>

      <div className="flex flex-col text-primaryDarker mt-5">
        <h3 className="font-semibold">Data:</h3>
        <div className="flex items-center gap-2 mt-1">
          <p>{format(startDate, "dd 'de' MMMM", { locale: ptBR })}</p>
          {"-"}
          <p>{format(endDate, "dd 'de' MMMM", { locale: ptBR })}.</p>
        </div>

        <h3 className="font-semibold mt-5">Hóspedes:</h3>
        <p className="mt-1">{guests} hóspede(s).</p>

        <Button className="mt-5" onClick={handleBuyClick}>
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};

export default TripConfirmation;
