"use client";

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import React from "react";
import { Controller, useForm } from "react-hook-form";

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

const today = new Date();
const { differenceInDays } = require("date-fns");

const TripReservation = ({
  tripId,
  maxGuests,
  pricePerDay,
  range,
}: TripReservationProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<TripReservationForm>();

  const onSubmit = async (data: TripReservationForm) => {
    const response = await fetch("http://localhost:3000/api/trips/check", {
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

      setError("endDate", {
        type: "manual",
        message: "Esta data já esta reservada.",
      });
    }
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col px-5">
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
              minDate={today}
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
              minDate={startDate ?? today}
              disabled={startDate ? false : true}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hospedes é obrigatório",
          },
        })}
        error={!!errors?.guests}
        errorMessage={errors?.guests?.message}
        placeholder={`Número de hospedes (max: ${maxGuests})`}
        className="mt-4"
      />
      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? `R$${
                differenceInDays(endDate, startDate) * pricePerDay +
                1 * pricePerDay
              }`
            : "R$0"}
        </p>
      </div>
      <div className="pb-10 border-b border-b-grayLighter w-full">
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
