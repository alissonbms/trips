"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { status, data: session } = useSession();

  const handleLoginClick = () => signIn();
  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);
  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  };

  return (
    <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
      <Link href="/">
        <div className="relative w-[183px] h-[32px]">
          <Image src="/logo.png" alt="Full Stack Week" fill />
        </div>
      </Link>

      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold border p-3 rounded-lg"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}

      {status === "authenticated" && session.user && (
        <div className="flex items-center gap-5 border border-solid border-grayLighter rounded-full p-2 px-3 relative">
          <AiOutlineMenu
            size={18}
            onClick={handleMenuClick}
            className="cursor-pointer"
          />
          <Image
            width={30}
            height={30}
            src={session.user.image!}
            alt={session.user.name!}
            className="rounded-full shadow-md"
          />

          {menuIsOpen && (
            <div className="z-50 absolute top-12 left-0 bg-white shadow-md w-full h-[90px] flex flex-col items-center justify-center rounded-2xl border border-solid border-grayLighter ">
              <div className="flex flex-col gap-2">
                <Link href="/my-trips">
                  <button
                    onClick={() => setMenuIsOpen(false)}
                    className="text-primary text-sm font-semibold pb-2 border-b border-solid border-grayLighter"
                  >
                    Minhas viagens
                  </button>
                </Link>

                <button
                  className="text-primary text-sm font-semibold"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
