import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export function getErrorMessage(error: unknown): string {

  if (typeof error === "object" && error !== null) {
    if ("data" in error) {
      const err = error as FetchBaseQueryError;
      const data = err.data as {
        error?: string;
        message?: string;
      };

      return data?.error || data?.message || "Помилка сервера";
    }

    if ("message" in error)
      return (error as SerializedError).message || "Невідома помилка";

  }
  return "Невідома помилка";
}
