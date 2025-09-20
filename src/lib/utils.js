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
  if(!config)
    config = {}
  if(!config.headers) 
    config.headers = {}
  if(config.body)
    config.body = JSON.stringify(config.body)

  config.headers['Content-Type'] = 'application/json'

  return new Promise((resolve, reject) => fetch(import.meta.env.VITE_BACKEND + path, config)
    .then(async response => {
      let body = null;
      try { body = await response.json() }
      catch(err) {}
      return {
        status: response.status,
        body: body,
        headers: response.headers
      }
    })
    .then(resolve)
  )
}