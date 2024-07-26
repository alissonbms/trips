"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";
const PurchaseSuccess = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
    toast.success("Reserva realizada com sucesso!", {
      position: "bottom-center",
    });
  };
  return (
    <div className="container mx-auto h-[100%] px-5">
      <div className="flex items-center justify-center flex-col gap-5 text-center h-[100%]">
        <h1 className="text-primaryDarker text-2xl font-semibold lg:text-[2.5rem]">
          Sua viagem foi reservada com sucesso =)
        </h1>
        <h2 className="text-grayPrimary text-xl font-semibold lg:text-3xl">
          Tenha um bom proveito!
        </h2>
        <Image
          src="/checked.png"
          alt="check icon, for purchase success"
          width={100}
          height={100}
          objectFit="cover"
        />
        <Button className="p-3" onClick={handleButtonClick}>
          <p className="text-base">Voltar para página inicial</p>
        </Button>
      </div>
    </div>
  );
};

export default PurchaseSuccess;
