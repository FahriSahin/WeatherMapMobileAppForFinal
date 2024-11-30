//kullanılacak kütüphanelerin ve bileşenlerin importu
import React from 'react'
import {  View  , Image } from "react-native";

//iconların kullanılabilmesi için gerekli fonksiyonun react component olarak kullanılabilmesi için gereken parametrelerin interfacei
interface WeatherIconProps {
    icon: string; // OpenWeatherMap'ten alınan ikon adı (örneğin: '10d')
    wh : number ; //Gösterim width ve height değerleri
  }

  // icon gösterme fonksiyonu
  const WeatherIcon: React.FC<WeatherIconProps> = ({ icon , wh }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return (
      <View>
        <Image
          source={{ uri: iconUrl }} 
          style={{ width: wh, height: wh }}
          resizeMode="contain" 
        />
      </View>
    );
  };
export default WeatherIcon
  
