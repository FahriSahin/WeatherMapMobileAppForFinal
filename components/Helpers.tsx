// HelperClass.tsx
import React from 'react'
import { useState , useEffect , useRef } from "react";
export class Helper {

// zaman çevirici fonksiyon
static convertUnixToTime = (timestamp : number) => {
    const date = new Date(timestamp * 1000); // Unix zaman damgasını milisaniyeye çeviriyoruz
    const hours = date.getUTCHours();  // Saat (UTC)
    const minutes = date.getUTCMinutes();  // Dakika (UTC)
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;  // Saat:Dakika formatında döndürüyoruz
};

//bulundugumuz günü yazan fonksiyon
static getDayName = () => {
    const today = new Date();
    return today.getDay(); // 0-6 arasında bir sayı döner 0-> pazar 
};

//saat ve dakika bilgisi almak için gereken fonksiyon
static extractHourAndMinute(dt : string) {
  // Tarih ve saat bilgisini ayırıyoruz
  const time = dt.split(" ")[1]; 
  const [hour, minute] = time.split(":");  
  return `${hour}:${minute}`; // Saat ve dakikayı birleştirip döndür
}

//apiden gelen kelvin değerini celciusa çeviren fonksiyon
static kelvinToCelsius(kelvin : number) {
  // Kelvin'den Celsius'a dönüşüm
  const celsius = kelvin - 273.15;

  // Tam sayı ve ondalık kısmı almak
  const celsiusInt = Math.floor(celsius);
  const celsiusDecimal = (celsius - celsiusInt).toFixed(1).slice(2); // Ondalık kısmı alıp, sadece 2 basamağa yuvarla
  return `${celsiusInt},${celsiusDecimal}`;
}
  
}
  