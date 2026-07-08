export function getStorageItem<T>(key: string, fallback: T | null = null): T | null {
    try {
        const item = localStorage.getItem(key);
        if (!item) return fallback;
        try {
            return JSON.parse(item) as T;
        } catch {
            // Fallback to returning raw string if JSON parsing fails
            return item as unknown as T;
        }
    } catch (error) {
        console.error(`Error parsing localStorage key "${key}":`, error);
        return fallback;
    }
}

export function setStorageItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch (error) {
        console.error(`Error writing localStorage key "${key}":`, error);
    }
}
