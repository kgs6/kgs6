import { cookies } from "next/headers";
import { verifyAccess } from "@/shared/lib/jwt";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return false;

  try {
    verifyAccess(accessToken);
    return true;
  } catch {
    return false;
  }
}
