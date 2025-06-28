"use client";
import { useReissueToken } from "@/store/authStore";

function ClientReissueProvider({ children }: { children: React.ReactNode }) {
  useReissueToken();
  return <>{children}</>;
}
export default ClientReissueProvider;
