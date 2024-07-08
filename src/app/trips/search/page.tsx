"use client";

import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Trips = () => {
  const [tripsFound, setTripsFound] = useState<Trip[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `http://localhost:3000/api/trips/search?text=${
          searchParams.get("text") ?? ""
        }&startDate=${searchParams.get("startDate")}&endDate=${searchParams.get(
          "endDate"
        )}&budget=${searchParams.get("budget")}&guests=${searchParams.get(
          "guests"
        )}`
      );

      const data = await response.json();

      if (data?.error) {
        router.push("/");
        return toast.error("Ocorreu um erro ao tentar buscar as viagens!", {
          position: "bottom-center",
        });
      }

      setTripsFound(data);
    };
    fetchTrips();
  }, []);

  return (
    <div className="container mx-auto p-5 flex flex-col items-center ">
      <h1 className="text-primaryDarker font-semibold text-xl">
        Viagens Encontradas
      </h1>
      <h2 className="text-grayPrimary font-medium mb-5 text-center">
        {tripsFound.length > 0
          ? "Listamos as melhores viagens pra você!"
          : "Não encontramos nenhuma viagem de acordo com seus parâmetros =("}
      </h2>
      <div className="flex flex-col gap-5">
        {tripsFound.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
