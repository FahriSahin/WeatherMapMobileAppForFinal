//kullanılacak kütüphane ve bileşenlerin eklenmesi 
import { View, Text , StyleSheet} from 'react-native'
import React from 'react'

//footer componentinin oluşturulması
const Footer = () => {
  return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 WeatherMAP. All rights reserved.</Text>
          <Text style={styles.footerText}>Developed by Fahri Şahin</Text>
          <Text style={styles.footerText}>Powered by OpenWeatherMap API</Text>
          <Text style={styles.footerText}></Text>
        </View>
  )
}

//footer componentinde kullanılacak stil sınıflarının tanımlanması
const styles = StyleSheet.create({
  footer: {
    backgroundColor:'#393e46',
    padding: 20,
    marginTop: 30,
  },
  footerText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  
})
export default Footer