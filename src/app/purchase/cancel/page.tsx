import Image from "next/image";
import React from "react";

const PurchaseCancel = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-5 p-5 text-center">
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
    </div>
  );
};

export default PurchaseCancel;
