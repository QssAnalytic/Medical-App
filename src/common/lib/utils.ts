import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Role, TFormValues } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clearUndefinedValues(obj: TFormValues) {
  return Object.entries(obj)
    ?.map(([key, value]) => {
      if (
        (value !== undefined && typeof value !== "object") ||
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === "object" && Object.keys(value).length > 0)
      ) {
        return {
          [key]: value,
        };
      }
    })
    .filter((item) => item !== undefined);
}

export function mergeObjects(obj1: any, obj2: any) {
  const merged = { ...obj1 };
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === "object" && !Array.isArray(obj2[key])) {
        merged[key] = mergeObjects(obj1[key] || {}, obj2[key]);
      } else {
        merged[key] = obj2[key];
      }
    }
  }
  return merged;
}

export const checkPermission = (role: string | undefined) => {
  let type = "price";
  if (role === Role.SuperUser || role === Role.Admin) {
    type = "price";
  } else if (role === Role.Manager) {
    type = "count";
  } else if (role === Role.Financer) {
    type = "price";
  }
  return type;
};
