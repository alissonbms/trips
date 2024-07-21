import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-walterWhite p-5 ">
      <div className="flex flex-col items-center justify-center leading-tight">
        <h2 className="text-2xl text-primary font-bold">TRIPSTASH</h2>
        <span className="text-grayPrimary text-xs">
          let the details with us
        </span>
      </div>
      <p className="text-sm font-medium text-primaryDarker mt-1">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
