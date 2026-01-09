"use server";

import { TRPCError } from "@trpc/server";

export async function FallbackBoundary({
  e,
  showError = false,
}: Readonly<{
  e: TRPCError | unknown;
  showError?: boolean;
}>) {
  console.error(e);

  if (!showError) return null;

  return (
    <div className="p-3 flex flex-col gap-2">
      <p>{e instanceof TRPCError ? `Ошибка` : "Неизвестная ошибка"}</p>
      {typeof e === "object" &&
        e !== null &&
        "message" in e &&
        typeof e.message === "string" && <p>{e.message}</p>}
    </div>
  );
}