import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SearchIconProps {
  url: string;
  title: string;
}
const SearchIcon = ({ url, title }: SearchIconProps) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <Link
        href={`/trips/search?quick=true&text=${title}`}
        className="flex flex-col items-center "
      >
        <Image width={35} height={35} src={url} alt={title} />
        <p className="text-sm lg:text-base text-grayPrimary hover:text-primary hover:transition-all duration-200 ">
          {title}
        </p>
      </Link>
    </div>
  );
};

export default SearchIcon;
