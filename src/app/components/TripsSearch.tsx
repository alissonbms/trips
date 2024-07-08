"use client";

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface TripSearchForm {
  text: string;
  startDate: Date;
  endDate: Date;
  budget?: string;
  guests?: string;
}

const TripSearch = () => {
  const router = useRouter();

  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TripSearchForm>();

  const onSubmit = async (data: TripSearchForm) => {
    router.push(
      `/trips/search?text=${
        data.text
      }&startDate=${data.startDate.toISOString()}&endDate=${data.endDate.toISOString()}&budget=${
        data.budget
      }&guests=${data.guests}`
    );
  };

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="text-2xl font-semibold text-primaryDarker text-center">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
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

        <div className="flex gap-4">
          <Input
            placeholder="Hóspedes?"
            {...register("guests")}
            type="number"
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
              />
            )}
          />
        </div>

        <div className="flex gap-4">
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
        </div>

        <Button onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>
    </div>
  );
};

export default TripSearch;
