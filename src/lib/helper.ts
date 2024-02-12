export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
  return null;
}

export function getFromSessionStorage(key: string): string | null {
  if (typeof sessionStorage !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}


export const getImagePathUsingBackend = (path: string | undefined) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/storage/${path}`;
}