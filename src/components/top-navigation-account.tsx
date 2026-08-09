"use client";

import { use, useEffect, useState } from "react";
import { UserSession } from "../types/auth.types";
import Image from "next/image";
import { useSessionStore } from "../app/stores/auth.store";

export function TopNavigationAccount() {
  const status = useSessionStore((state) => state.status);
  const session = useSessionStore((state) => state.session);

  return <div className="flex items-center gap-2">{status}</div>;
}
