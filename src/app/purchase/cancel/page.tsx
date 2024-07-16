"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const PurchaseCancel = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/");
    toast.error("Ocorreu um erro ao tentar realizar a reserva!", {
      position: "bottom-center",
    });
  };

  return (
    <div className="container mx-auto h-[100%]">
      <div className="flex items-center justify-center flex-col gap-5 text-center h-[100%]">
        <h1 className="text-primaryDarker text-2xl font-semibold">
          Parece que ocorreu um problema =(
        </h1>
        <h2 className="text-grayPrimary text-xl font-semibold">
          Não foi possível reservar sua viagem!
        </h2>
        <Image
          src="/denied.png"
          alt="denial icon, for purchase cancellation"
          width={100}
          height={100}
          objectFit="cover"
        />
        <Button variant="danger" className="p-3" onClick={handleButtonClick}>
          Voltar para página inicial
        </Button>
      </div>
    </div>
  );
};

export default PurchaseCancel;
