import Image from "next/image";
import React from "react";

const PurchaseSuccess = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-5 p-5 text-center">
      <h1 className="text-primaryDarker text-2xl font-semibold">
        Sua viagem foi reservada com sucesso =)
      </h1>
      <h2 className="text-grayPrimary text-xl font-semibold">
        Tenha um bom proveito!
      </h2>
      <Image
        src="/checkED.png"
        alt="check icon, for purchase success"
        width={100}
        height={100}
        objectFit="cover"
      />
    </div>
  );
};

export default PurchaseSuccess;
