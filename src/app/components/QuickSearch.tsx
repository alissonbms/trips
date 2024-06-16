import React from "react";
import SearchIcon from "./SearchIcon";

const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter" />
        <h2 className=" px-5 font-medium text-grayPrimary whitespace-nowrap">
          Tente pesquisar por
        </h2>
        <div className="w-full h-[1px] bg-grayLighter" />
      </div>

      <div className="flex w-full justify-between mt-5">
        <SearchIcon url="/hotel-icon.png" title="Hotel" />
        <SearchIcon url="/farm-icon.png" title="Fazenda" />
        <SearchIcon url="/cottage-icon.png" title="Chalé" />
        <SearchIcon url="/inn-icon.png" title="Pousada" />
      </div>
    </div>
  );
};

export default QuickSearch;
