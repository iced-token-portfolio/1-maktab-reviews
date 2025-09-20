import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const removeWhiteSpace = content => 
  (content ?? '')
    .replace(/[\s\u200B-\u200D\uFEFF\u200E]+/g, "") // remove invisble characters
    .trim()

export const apiFetch = (path, config) => {
  if(config?.body)
    config.body = JSON.stringify(config.body)
  return new Promise((resolve, reject) => fetch(import.meta.env.VITE_BACKEND + path, config)
    .then(async response => ({
      status: response.status,
      body: await response.json(),
      headers: response.headers
    }))
    .then(resolve)
  )
}