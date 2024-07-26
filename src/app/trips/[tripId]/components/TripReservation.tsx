"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { differenceInDays } from "date-fns";
import { toast } from "react-toastify";

interface TripReservationProps {
  tripId: string;
  maxGuests: number;
  tripStartDate: Date;
  tripEndDate: Date;
  pricePerDay: number;
  range: {
    start: Date;
    end: Date;
  }[];
}

interface TripReservationForm {
  guests: number;
  endDate: Date;
  startDate: Date;
}

const TripReservation = ({
  tripId,
  maxGuests,
  pricePerDay,
  range,
}: TripReservationProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId,
          startDate: data.startDate,
          endDate: data.endDate,
        })
      ),
    });

    const res = await response.json();

    if (res?.error?.code === "TRIP_ALREADY_RESERVED") {
      setError("startDate", {
        type: "manual",
        message: "Esta data já esta reservada.",
      });

      return (
        toast.error("Ocorreu um erro ao tentar reservar a viagem!", {
          position: "bottom-center",
        }),
        setError("endDate", {
          type: "manual",
          message: "Esta data já esta reservada.",
        })
      );
    } else if (res?.error) {
      router.push("/");
      return toast.error("Ocorreu um erro ao tentar reservar a viagem!", {
        position: "bottom-center",
      });
    }

    router.push(
      `/trips/${tripId}/confirmation?startDate=${data.startDate.toISOString()}&endDate=${data.endDate.toISOString()}&guests=${
        data.guests
      }`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const guests = watch("guests");
  const dates =
    differenceInDays(endDate, startDate) * pricePerDay + 1 * pricePerDay;

  return (
    <div className="flex flex-col px-5 lg:min-w-[380px] lg:border lg:border-grayLighter lg:p-5 lg:rounded-lg lg:shadow-md">
      <p className="hidden lg:block text-xl text-primaryDarker mb-4">
        <span className="font-semibold">R${pricePerDay}</span>/dia
      </p>
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: {
              value: true,
              message: "Data Inicial é obrigatória.",
            },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              excludeDateIntervals={range}
              error={!!errors?.startDate}
              errorMessage={errors?.startDate?.message}
              placeholderText="Data de Início"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: { value: true, message: "Data Final é obrigatória" },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              excludeDateIntervals={range}
              error={!!errors?.endDate}
              errorMessage={errors?.endDate?.message}
              placeholderText="Data Final"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate ?? new Date()}
              disabled={startDate ? false : true}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório",
          },
          max: {
            value: maxGuests,
            message: `Número máximo de hóspedes é ${maxGuests}`,
          },
        })}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        type="number"
      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate ? `R$${dates * guests}` : "R$0"}
        </p>
      </div>
      <div className="pb-10 border-b border-b-grayLighter w-full lg:border-none lg:pb-0">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mt-3 w-full"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
};

export default TripReservation;
