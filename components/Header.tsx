//kullanılacak kütüphane ve bileşenlerin eklenmesi 
import { Text, View , StyleSheet } from "react-native";
import colors from '@/components/colors';
import React from 'react'
import WeatherIcon from "./WeatherIcon";

//Header componentinin oluşturulması
const Header = () => {
  return (
    <View style={styles.header}> 
        <WeatherIcon icon ={"02d"} wh={130} /> 
        <Text style={styles.logoText}>WeatherMAP</Text>
    </View>
  )
}

//Header componentinde kullanılacak stil sınıflarının tanımlanması
const styles = StyleSheet.create({
    header:{
        width :'100%',
        height :150,
        backgroundColor : colors.secondary,
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginBottom : 50
      },
      logoText : {
        fontSize : 32,
        color : colors.white
      },
})
export default Header