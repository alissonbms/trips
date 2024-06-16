import Image from "next/image";
import React from "react";

interface SearchIconProps {
  url: string;
  title: string;
}
const SearchIcon = ({ url, title }: SearchIconProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Image width={35} height={35} src={url} alt={title} />
      <p className="text-sm text-grayPrimary">{title}</p>
    </div>
  );
};

export default SearchIcon;
