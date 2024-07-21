"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { HiCurrencyDollar, HiLogout } from "react-icons/hi";

import { useRouter } from "next/navigation";

const Header = () => {
  const { status, data: session } = useSession();

  const handleLoginClick = () => signIn("google");
  const handleLogoutClick = () => {
    signOut();
  };

  const router = useRouter();
  const handleMyTripsClick = () => {
    router.push("/my-trips");
  };

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center gap-12">
      <Link href="/">
        <div className="flex flex-col items-center justify-center leading-tight">
          <h2 className="text-3xl text-primary font-bold">TRIPSTASH</h2>
          <span className="text-grayPrimary text-sm">
            let the details with us
          </span>
        </div>
      </Link>

      {status === "unauthenticated" && (
        <button
          onClick={handleLoginClick}
          className="px-2 py-2 border border-slate-200 rounded-xl text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        >
          <div className="flex items-center justify-center gap-2">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google logo"
              width={20}
              height={20}
            />
            <span className="text-sm text-grayPrimary">Login com o Google</span>
          </div>
        </button>
      )}

      {status === "authenticated" && session.user && (
        <Dropdown
          label=""
          renderTrigger={() => (
            <div className="flex items-center gap-5 border border-solid border-grayLighter rounded-full p-2 px-3">
              <AiOutlineMenu size={18} className="cursor-pointer" />
              <Image
                width={30}
                height={30}
                src={session?.user?.image!}
                alt={session?.user?.name!}
                className="rounded-full shadow-md"
              />
            </div>
          )}
        >
          <div>
            <DropdownHeader>
              <span className="block text-sm">{session?.user?.name!}</span>
              <span className="block truncate text-sm font-medium">
                {session?.user?.email!}
              </span>
            </DropdownHeader>
            <DropdownItem icon={HiCurrencyDollar} onClick={handleMyTripsClick}>
              Minhas viagens
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem icon={HiLogout} onClick={handleLogoutClick}>
              Logout
            </DropdownItem>
          </div>
        </Dropdown>
      )}
    </div>
  );
};

export default Header;
