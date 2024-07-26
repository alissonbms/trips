"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import TripItem from "@/components/TripItem";
import { Trip } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface TripSearchForm {
  text: string;
  startDate: Date;
  endDate: Date;
  budget?: string;
  guests?: string;
}

const Trips = () => {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>();

  const onSubmit = async (data: TripSearchForm) => {
    const response = await fetch(
      `/api/trips/search?text=${
        data.text
      }&startDate=${data.startDate.toISOString()}&endDate=${data.endDate.toISOString()}&budget=${
        data.budget
      }&guests=${data.guests}`
    );

    const res = await response.json();

    if (res?.error) {
      router.push("/");
      return toast.error("Ocorreu um erro ao tentar buscar as viagens!", {
        position: "bottom-center",
      });
    }

    setTripsFound(res);
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const [tripsFound, setTripsFound] = useState<Trip[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTrips = async () => {
      const response = await fetch(
        `/api/trips/search?${
          searchParams.get("quick") && "quick=true"
        }&text=${searchParams.get("text")}&startDate=${searchParams.get(
          "startDate"
        )}&endDate=${searchParams.get("endDate")}&budget=${searchParams.get(
          "budget"
        )}&guests=${searchParams.get("guests")}`
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
    <div className="container mx-auto p-5 flex flex-col items-center">
      <div className="flex flex-col gap-4 mt-5 lg:max-w-[948px] lg:mx-auto lg:p-4 lg:bg-primary lg:bg-opacity-20 lg:rounded-xl">
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4">
          <div className="col-span-2 lg:col-span-1">
            <Input
              error={!!errors.text}
              errorMessage={errors.text?.message}
              placeholder="Onde você quer ir?"
              {...register("text", {
                required: {
                  value: true,
                  message: "Local é obrigatório",
                },
              })}
            />
          </div>

          <Input
            placeholder="Hóspedes?"
            {...register("guests")}
            type="number"
            className="w-full"
          />

          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                placeholder="Preço por noite"
                onValueChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                className="w-full"
              />
            )}
          />
          <Controller
            name="startDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Data de Check-in é obrigatória",
              },
            }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Check-in "
                onChange={field.onChange}
                selected={field.value}
                className="w-full"
                error={!!errors.startDate}
                errorMessage={errors.startDate?.message}
                selectsStart
                minDate={new Date()}
                startDate={startDate}
                endDate={endDate}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Data de Checkout é obrigatória",
              },
            }}
            render={({ field }) => (
              <DatePicker
                placeholderText="Checkout"
                onChange={field.onChange}
                selected={field.value}
                className="w-full"
                error={!!errors.endDate}
                errorMessage={errors.endDate?.message}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate ?? new Date()}
                disabled={startDate ? false : true}
              />
            )}
          />
          <Button
            onClick={() => handleSubmit(onSubmit)()}
            className="col-span-2 lg:col-span-1 lg:h-fit"
          >
            Buscar
          </Button>
        </div>
      </div>
      <h1 className="text-primaryDarker font-semibold text-xl mb-2 mt-12 lg:text-3xl lg:mt-24 ">
        Viagens encontradas:
      </h1>
      <h2 className="text-grayPrimary font-medium mb-5 text-center lg:mt-3 lg:text-base">
        {tripsFound.length > 0
          ? "Listamos as melhores viagens pra você!"
          : "Não encontramos nenhuma viagem de acordo com seus parâmetros =("}
      </h2>
      <div className="flex flex-col gap-5 md:flex-row flex-wrap lg:gap-10 lg:mt-1 justify-center">
        {tripsFound.map((trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default Trips;
