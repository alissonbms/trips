import React from "react";

interface TripDescriptionProps {
  description: string;
}

const TripDescription = ({ description }: TripDescriptionProps) => {
  return (
    <div className="flex flex-col p-5 lg:p-0">
      <h2 className="font-semibold text-primaryDarker mb-5 lg:text-xl">
        Sobre a viagem:
      </h2>
      <p className="mt-1 text-xs text-primaryDarker leading-5 lg:text-base lg:leading-7">
        {description}
      </p>
    </div>
  );
};

export default TripDescription;
