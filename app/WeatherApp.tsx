//kullanılacak kütüphane ve bileşenlerin importu
import { Text, View , StyleSheet , FlatList , TextInput , ScrollView , TouchableOpacity} from "react-native";
import { useState , useEffect , useRef } from "react";
import colors from '@/components/colors';
import React from 'react'
import WeatherIcon from "@/components/WeatherIcon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Helper } from "@/components/Helpers"


//global günler array'i
const daysOfWeek = [
  'Pazar', 
  'Pazartesi', 
  'Salı', 
  'Çarşamba', 
  'Perşembe', 
  'Cuma', 
  'Cumartesi',
];
 
export default function weatherApp() {
  //weatherdatanın tutulcağı state
  const [weatherdata, setWeatherData] = useState<any>([])
 
  //loading durumuyla ilgili state
  const [loading, setLoading] = useState(true)

  //arama çubuğundaki verileri tutan state
  const [searchText, setSearchText] = useState<string>(''); 

  //arama olup olmadıgı bilgisi
  const [isSearching, setIsSearching] = useState(false);
 
  //Günü tutar (global state için useRef)
  const dayIndexRef = useRef<number>(0); 

  //api keyinin değişkene atanması
  const OPENWEATHERMAP_API_KEY = "" //TODO WRİTE YOUR APİ KEY

 //apinin fetch ile çekilmesi
 const fetchWeatherData = async (city: string) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&lang=tr`
    );
    if (!response.ok) {
      throw new Error("Şehir bulunamadı");
    }
    const data = await response.json();
    setWeatherData([data]);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    try {
      // Hata durumunda İstanbul verisini almayı dene
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=istanbul&appid=${OPENWEATHERMAP_API_KEY}&lang=tr`
      );
      if (!response.ok) {
        throw new Error("İstanbul verisi de alınamadı");
      }
      const data = await response.json();
      setWeatherData([data]);
      console.log("İstanbul verisi:", data); // İstanbul verisini konsola yazdır
      setLoading(false);
    } catch (err) {
      console.error("Error fetching İstanbul weather data:", err);
      setLoading(false); // İstanbul verisi de alınamazsa, yükleme durumu sonlandırılır
    }
  }
};

 
  //sadece uygulama çalıştıgında atama yapması için (yalnızca bir kere çalışır)
  useEffect(() => {
    fetchWeatherData("istanbul");
    // bulundugumuz günden 1 öncesini tutan global değişken
    dayIndexRef.current = Helper.getDayName(); 
  }, []); 
   
  //şehir arama fonksiyonu
  const handleSearch = () => {
    setLoading(true) 
    setIsSearching(true);
  };

  //arama yapıldıktan sonra çalışacak
  useEffect(() => {
    if (isSearching) {
        fetchWeatherData(searchText);
        setIsSearching(false); // Arama bittiğinde, isSearching'i false yap
        setSearchText('');
        setLoading(true)
    }
  }, [isSearching]); 


  return (  
    <ScrollView style={style.container}>
    <View>
      {/* apiden çekme işlemi tamamlanana kadar loading yazısının gelmesi */}
      {loading ? (<Text>Loading ...</Text>) : (
        <View style={{backgroundColor : '#d1d1d1'}}>
          {/* header */}
          <Header></Header>

        {/* arama kısmı */}
        <View style={style.containerSearch}>
          <TextInput
            style={style.searchBox}
            placeholder="Şehir Arama..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          {/* Ara Butonu */}
          <TouchableOpacity style={style.searchButton} onPress={handleSearch}>
            <Text style={style.searchButtonText}>Ara</Text>
          </TouchableOpacity>
        </View>

        {/* genel hava durumu ve şehir bilgisi */}
        <View style={style.elemanKapsayici}>
          <Text style={style.kapsayiciYazi}>WeatherMAP</Text>
          <View style={style.genelDurum}>
            <View>
              <WeatherIcon icon ={weatherdata[0].list[0].weather[0].icon} wh={150} /> 
            </View>
            {/* apiden bilgilerin çekilmesi */}
            <View style={style.genelDurumPart}>
              <Text style={style.genelDurumItem}>{weatherdata[0].city.name}</Text>
              <Text style={style.genelDurumItem}>{Helper.kelvinToCelsius(weatherdata[0].list[0].main.temp)} °C</Text>
              <Text style={style.genelDurumItem}>{weatherdata[0].list[0].weather[0].description.charAt(0).toUpperCase() +weatherdata[0].list[0].weather[0].description.slice(1) }</Text> 
              <Text style={style.genelDurumItem}>D : {Helper.kelvinToCelsius(weatherdata[0].list[0].main.temp_min)} °C | Y : {Helper.kelvinToCelsius(weatherdata[0].list[0].main.temp_max)} °C</Text> 
            </View>
          </View>
        </View>

        {/* saatlere göre hava durumu bilgisi */}
        <View style={style.elemanKapsayici}>
          <Text style={style.kapsayiciYazi}>Saatlere Göre Hava Durumu</Text>
          <View style={style.saatlereGore}>
          {/* flatlist ile istenen elemanların hepsinin ekrana yazılması */}
         <FlatList
          data={weatherdata[0].list} // Liste verisi
          keyExtractor={(item) => item.dt_txt} // Her öğe için benzersiz bir anahtar
          style = {style.saatlereGoreItemFlat}
          horizontal = {true}
          renderItem={({ item }) => (
            //eleman şablonu
            <View style={style.saatlereGoreItem}> 
              <Text >{(item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1)).split(" ")[0]}</Text> 
              <WeatherIcon icon ={item.weather[0].icon} wh={40}/> 
              <Text >{Helper.kelvinToCelsius(item.main.temp)}°C</Text> 
              <Text>{Helper.extractHourAndMinute(item.dt_txt)}</Text>
            </View>
            )}
          /> 
          </View>
        </View>

        {/* günlere göre hava durumu bilgisi */}
        <View style={style.elemanKapsayici}>
          <Text style={style.kapsayiciYazi}>Günlere Göre Hava Durumu</Text>
          <View style={style.gunlereGore}>
            <FlatList
              data={weatherdata[0].list.filter((_: any, index: number) => index % 8 === 0)} // 8'in katı olan öğeleri filtrele
              keyExtractor={(item) => item.dt_txt} // Her öğe için benzersiz bir anahtar
              style={style.gunlereGoreItemFlat}
              renderItem={({ item }) => {
                const currentDay = daysOfWeek[dayIndexRef.current]; // Geçerli günü al
                dayIndexRef.current==6 ? dayIndexRef.current =0 : dayIndexRef.current++
                return (  
                  <View style={style.gunlereGoreItem}>
                    <Text style={{width : 100}}> {currentDay}</Text>
                    <WeatherIcon icon={item.weather[0].icon} wh={70} />
                    <View>
                      <Text>{Helper.kelvinToCelsius(item.main.temp)}°C</Text> 
                      <Text>
                        {(
                          item.weather[0].description.charAt(0).toUpperCase() +
                          item.weather[0].description.slice(1)
                        ).split(" ")[0]}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>

      
        {/* UV rüzgar hissedilen nem gibi ekstra bilgiler */}
        <View style={style.elemanKapsayici}>
          <Text style={style.kapsayiciYazi}>Ekstra Bilgiler</Text>
          <View style={style.ekstraBilgiler}>

            {/* havadaki nem yüzdesi */}
            <View style={style.ekstraBilgiEleman}>
              <Text style={{marginBottom : 7}}>Nem</Text>
              <Text>{weatherdata[0].list[0].main.humidity}%</Text>
            </View>

            {/* hPa cinsinden basınç miktarı */}
            <View style={style.ekstraBilgiEleman}>
              <Text style={{marginBottom : 7}}>Basınç</Text>
              <Text>{weatherdata[0].list[0].main.pressure}hPa</Text>
            </View>

            {/* Havanın bulutluluk yüzdesi */}
            <View style={style.ekstraBilgiEleman}>
              <Text style={{marginBottom : 7}}>Havanın bulutluluk yüzdesi</Text>
              <Text>{weatherdata[0].list[0].clouds.all}%</Text> 
            </View>

            {/* Görüş mesafesi */}
            <View style={style.ekstraBilgiEleman}> 
              <Text style={{marginBottom : 7}}>Görüş mesafesi</Text>
              <Text>{weatherdata[0].list[0].visibility} metre</Text>           
            </View>

            {/* Gündoğumu ve günbatımı saatleri  */}
            <View style={style.ekstraBilgiEleman}>
              <Text style={{marginBottom : 7}}>Gündoğumu ve günbatımı</Text>
              <Text>{Helper.convertUnixToTime(weatherdata[0].city.sunrise)} - {Helper.convertUnixToTime(weatherdata[0].city.sunset)}</Text> 
            </View>

            {/* Rüzgar hızı */}
            <View style={style.ekstraBilgiEleman}>
              <Text style={{marginBottom : 7}}>Rüzgar Hızı</Text>
              <Text>{weatherdata[0].list[0].wind.speed}</Text>           
            </View>
          </View> 
        </View>

        {/* footer */}
        <Footer></Footer>
      </View>
      )}    
    </View>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerSearch: {
    flexDirection: "row",
    alignItems: "center",
    width : '89%',
    marginHorizontal : '5.5%',
    marginBottom : 20,
    padding: 10,
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor : colors.white,
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  elemanKapsayici:{
    display : 'flex',
    flexDirection : 'column',
    width : '86%',
    padding : 9,
    marginHorizontal : '7%',
    backgroundColor : colors.primary,
    borderRadius: 8, 
    marginBottom : 50     
  },

  kapsayiciYazi:{
    color : colors.white,
    fontSize : 24,
    textAlign : 'center',
    padding : 5,
    marginBottom : 10,
    borderBottomColor : colors.secondary,
    borderBottomWidth : 3,
    borderRadius : 10,
    backgroundColor : colors.mediumGray
  },

  genelDurum : {
    width : '90%',
    marginLeft : '5%',
    borderRadius : 20,
    backgroundColor : colors.primary,
    height : 200,
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    marginBottom : 50
  },

  genelDurumPart:{
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center',
  },

  genelDurumItem:{
    margin : 10,
    fontSize : 16,
    color : colors.white,
    backgroundColor : colors.mediumGray,
    width : 120,
    padding : 3,
    paddingHorizontal : 15,
    borderRadius : 5
  },

  saatlereGore:{
    width : '90%',
    margin : '5%',
    height : 130,
    display : 'flex',
    flexDirection : 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',       
    flexWrap: 'wrap',    
    backgroundColor: colors.mediumGray ,
    borderRadius : 10
  },

  saatlereGoreItemFlat:{
    width : 110,
    height : 110,
    borderRadius: 8, 
    margin : 10,
    backgroundColor : colors.mediumGray  
  },

  saatlereGoreItem:{
    width : 90,
    height : 90,
    margin : 9.5,
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : colors.gray,
    borderRadius : 10,
  },
 
  gunlereGore:{
    width : '90%',
    marginHorizontal : '5%',
    height : 350,
    display : 'flex',
    flexDirection : 'row',
    flexWrap: 'wrap',
  },

  gunlereGoreItemFlat:{
    width : 100,
    height : 300,
    borderRadius: 8, 
    margin : 10,
    backgroundColor : colors.mediumGray  
  },

  gunlereGoreItem:{
    width : '97%',
    height : 90,
    margin : '1.5%',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    backgroundColor : colors.gray,
    borderRadius : 10,
  },

  ekstraBilgiler:{
    display : 'flex',
    flexDirection : 'row',
    flexWrap : 'wrap',
    justifyContent : 'space-evenly',
    alignItems : 'center',
    backgroundColor : colors.mediumGray,
    width : '90%',
    marginLeft : '5%',
    borderRadius: 10
  },

  ekstraBilgiEleman:{
    width : 100,
    height : 100,
    backgroundColor : colors.gray,
    padding : 5,
    margin :15,
    borderRadius : 8
  },

});
