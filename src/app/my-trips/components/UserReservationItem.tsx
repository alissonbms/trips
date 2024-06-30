import Button from "@/components/Button";
import { Prisma } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-toastify";

interface UserReservationProps {
  reservation: Prisma.TripReservationGetPayload<{
    include: {
      trip: true;
    };
  }>;
}

const UserReservationItem = ({ reservation }: UserReservationProps) => {
  const router = useRouter();

  const { trip } = reservation;

  const handleDeleteClick = async () => {
    const response = await fetch(
      `http://localhost:3000/api/trips/reservation/${reservation.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao tentar cancelar a reserva!", {
        position: "bottom-center",
      });
    }

    toast.success(
      <div className="flex flex-col items-center justify-center">
        <p>Reserva de viagem até:</p>
        <span className="font-semibold">{reservation.trip.name}</span>
        <p> cancelada com sucesso</p>
      </div>,
      {
        position: "bottom-center",
      }
    );

    router.refresh();
  };
  return (
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

      <div className="flex flex-col text-primaryDarker mt-5 pb-5 border-b border-solid border-grayLighter">
        <h3 className="text-sm">Data:</h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm">
            {format(new Date(reservation.start), "dd 'de' MMMM", {
              locale: ptBR,
            })}
          </p>
          {"-"}
          <p className="text-sm">
            {format(new Date(reservation.end), "dd 'de' MMMM", {
              locale: ptBR,
            })}
            .
          </p>
        </div>

        <h3 className="text-sm mt-5">Hóspedes:</h3>
        <p className="text-sm mt-1">{reservation.guests} hóspedes.</p>
      </div>

      <h3 className="font-semibold text-primaryDarker mt-3">
        Informações do preço:
      </h3>
      <div className="flex justify-between mt-2 text-sm">
        <p className="text-primaryDarker text-sm">Total: </p>
        <p className="font-medium text-sm">R${Number(reservation.totalPaid)}</p>
      </div>

      <Button
        variant="danger"
        className=" w-full mt-5"
        onClick={handleDeleteClick}
      >
        Cancelar
      </Button>
    </div>
  );
};

export default UserReservationItem;
