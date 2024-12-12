import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function isPWA() {
  if (typeof navigator === "undefined") return false;
  return await navigator.getInstalledRelatedApps();
}