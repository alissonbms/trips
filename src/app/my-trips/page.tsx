"use client";

import { TripReservation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyTrips = () => {
  const [reservations, setReservations] = useState<TripReservation[]>([]);
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !data?.user) {
      return router.push("/");
    }

    const fetchReservations = async () => {
      const response = await fetch(
        `http://localhost:3000/api/user/${(data?.user as any)?.id}/reservations`
      );

      const res = await response.json();

      setReservations(res);
    };

    fetchReservations();
  }, [status]);

  return <div>MyTrips</div>;
};

export default MyTrips;
