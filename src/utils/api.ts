import { API_METHODS } from "@/constants/api";

type apiMethods = typeof API_METHODS[keyof typeof API_METHODS];
interface apiCallOptions {
    method?: apiMethods,
    body?: Record<string, any>
}
export async function apiCall(url: string, { method = API_METHODS.GET, body = {} }: apiCallOptions = {}) {
    const resp = await fetch(url, {
        method,
        ...(Object.keys(body || {}).length ? { body: JSON.stringify(body) } : {}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    const json = await resp.json();
    if (!resp.ok) throw new Error(json.message);

    return json;
}