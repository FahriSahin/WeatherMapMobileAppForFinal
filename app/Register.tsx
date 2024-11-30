//kullanılacak kütüphane ve bileşenlerim import edilmesi
import { View, Text  , TextInput , StyleSheet , ScrollView , TouchableOpacity} from 'react-native'
import React , {useState} from 'react'
import { auth } from '../firebase';
import colors from '@/components/colors';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

//register componentinin tsx'e uygun şekilde parametre alabilir halde oluşturulması
const Register : React.FC<{navigation : any}> = ({navigation}) => { 

  //kayıt için gereken bilgileri tutacak statelerin tanımlanması
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkpassword , setCheckpassword] = useState("");
  const [showAlert, setShowAlert] = useState(false)
 
  //kayıt ol butonuna tıklandıgında çalışacak fonksiyon
  const registerFunc = ()=>{
    //iki şifre eşleşiyor mu diye kontrol eder
      if (password !=checkpassword) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 4000);
      }
      else{
        auth.createUserWithEmailAndPassword(email,password)
        .then(()=>navigation.navigate('Login'))
          .catch(err => alert(err));
      }
  }

return (
  <ScrollView style={style.container}>
    <View style={style.registerPage}>
      {/* şifrelerin eşleşmemesi durumunda alert çıkması */}
      {showAlert && <View style={style.myAlert}>Şifreler eşleşmiyor</View>} 
      <Header></Header>
        <View style={style.registerMenu}>

        <View style={style.registerInputDiv}>
        {/* email ve şifre girme alanları */}
        <Text style={style.registerText}>Kayıt Sayfası</Text>
        <TextInput
            placeholder='Email'
            onChangeText={(newval) => (setEmail(newval))}
            value={email}
            style={style.registerInput} 
            textContentType='emailAddress'
        />
        <TextInput
            placeholder='Password'
            onChangeText={(pass) => (setPassword(pass))}
            value={password}
            style={style.registerInput} 
            textContentType='password'
            secureTextEntry={true}  
        />
          <TextInput
            placeholder='Check password'
            onChangeText={(pass) => (setCheckpassword(pass))}
            value={checkpassword} 
            style={style.registerInput} 
            textContentType='password'
            secureTextEntry={true}  
        />
        </View>

        {/* kayıt olma ve giriş sayfasına gitme butonlarının oldugu kısım */}
        <View style={style.buttonsDiv}>
            <TouchableOpacity style={style.button} onPress={registerFunc}>
                <Text style={style.buttonsText}>Kayıt Ol</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.button} onPress={() => navigation.navigate('Login')}>
                <Text style={style.buttonsText}>Giriş Sayfasına Git</Text>
            </TouchableOpacity>
        </View>
        </View>

        {/* footer */}
        <Footer></Footer>

    </View>
  </ScrollView>
)
}

//register sayfasında kullanılacak stil sınıflarının tanımlanması
const style = StyleSheet.create({
  container : {
    flex : 1
  },
  registerInput :{
      width : '100%',
      height : 70,
      borderRadius : 10,
      backgroundColor : colors.gray,
      marginBottom:25,
      padding:10
  },
  registerPage : { 
      width : '100%',
      backgroundColor:colors.gray
  },
  registerInputDiv : {
      width : '100%',
  },
  buttonsDiv :{
      width : '100%',
  },
  button : {
    width : '100%',
    backgroundColor : colors.primary,
    padding : 10,
    marginBottom : 10
  },
  buttonsText : {
      textAlign : 'center',
      color : colors.white,
      fontSize : 16,
  },
  registerText : {
      width: '100%',
      textAlign : 'center',
      color : 'white',
      backgroundColor : colors.primary,
      padding : 20,
      fontSize : 24,
      marginBottom : 10
  },
  registerMenu : {
      backgroundColor : colors.mediumGray,
      width : '80%',
      padding : '5%',
      marginLeft:'10%',
      borderRadius : 10,
  },
  myAlert : {
    display : 'flex',
    backgroundColor : 'yellow',
    padding : 10,
    width : '80%',
    marginLeft : '10%',
    borderRadius : 10
  }
})

export default Register
