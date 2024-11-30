//kullanılacak kütüphane ve bileşenlerin import edilmesi
import { View, Text  , StyleSheet , TextInput , TouchableOpacity , ScrollView} from 'react-native'
import React , {useState} from 'react'
import { auth } from '../firebase'; 
import Footer from '@/components/Footer';
import colors from '@/components/colors';
import Header from '@/components/Header'; 

//login componentinin tsx'e uygun şekilde parametre alabilir halde oluşturulması
const Login : React.FC<{navigation : any}> = ({navigation}) => {

    //login için gereken bilgileri tutacak statelerin tanımlanması
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Giriş yap butonuna tıklandıgında çalışacak fonksiyon
    const loginFunc = async ()=>{
        try{
            await auth.signInWithEmailAndPassword(email,password)
            console.log('Login başarılı, WeatherApp yönlendiriliyor...');
            setEmail("");
            setPassword("");
            navigation.navigate('WeatherApp');
        }
        catch(err){
            alert(err)
        }
    }
  return (
    <ScrollView style={style.container}>
        <View style={style.loginPage}>

            {/* header kısmı */}
            <Header></Header>

            <View style={style.loginMenu}>
                <View style={style.loginInputDiv}>
                {/* email ve şifre girme alanları */}
                    <Text style={style.loginText}>Giriş Sayfası</Text>
                    <TextInput
                        placeholder='Email'
                        onChangeText={(newval) => (setEmail(newval))}
                        value={email}
                        style={style.loginInput} 
                        textContentType='emailAddress'
                    />

                    <TextInput
                        placeholder='Password'
                        onChangeText={(pass) => (setPassword(pass))}
                        value={password}
                        style={style.loginInput} 
                        textContentType='password'
                        secureTextEntry={true}  
                    />
                </View>

                {/* Giriş yap ve kayıt ol sayfasına yönlenme kısmındakş butonlar */}
                <View style={style.buttonsDiv}>
                    <TouchableOpacity style={style.button} onPress={loginFunc}>
                        <Text style={style.buttonsText}>Giriş Yap</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button} onPress={() => navigation.navigate('Register')}>
                        <Text style={style.buttonsText}>Kayıt Ol</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* footer */}
            <Footer></Footer>
            
        </View>
    </ScrollView>
  )
}

//login sayfasında kullanılacak stil sınıflarının tanımlanması
const style = StyleSheet.create({
    container : {
        flex : 1
    },
    loginInput :{
        width : '100%',
        height : 70,
        borderRadius : 10,
        backgroundColor : colors.gray,
        marginBottom:25,
        padding:10
    },
    loginPage : { 
        width : '100%',
        backgroundColor:colors.gray
    },
    loginInputDiv : {
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
        fontSize : 16
    },
    loginText : {
        width: '100%',
        textAlign : 'center',
        color : 'white',
        backgroundColor : colors.primary,
        padding : 20,
        fontSize : 24,
        marginBottom : 10
    },
    loginMenu : {
        backgroundColor : colors.mediumGray,
        width : '80%',
        padding : '5%',
        marginLeft:'10%',
        borderRadius : 10,
    }

})

export default Login
