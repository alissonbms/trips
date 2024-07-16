import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-walterWhite p-5 ">
      <Image src="/logo.png" alt="tripstash" width={155} height={23} />
      <p className="text-sm font-medium text-primaryDarker mt-1">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
