import { useState, useEffect, useEffectEvent } from "react";

export const useCookie = (cookieName: string) => {
  const [cookieValue, setCookieValue] = useState("");

  const handleCookieValue = useEffectEvent(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${cookieName}=`));
    
    setCookieValue(cookie ? cookie.split("=")[1] : "");
  });

  useEffect(() => {
    handleCookieValue();
  }, []);

  const setCookie = (value: string, expirationDate: number) => {
    document.cookie = `${cookieName}=${value}; expires=${expirationDate.toString()}; path=/`;
  };

  const deleteCookie = () => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  return [cookieValue, setCookie, deleteCookie] as const;
};