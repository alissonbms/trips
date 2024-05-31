"use client";

import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <div>
      <button onClick={() => signIn()}>Login</button>
      <p> Hello {data?.user?.name}</p>
    </div>
  );
}
