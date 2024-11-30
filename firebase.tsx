// Firebase modüllerini ve işlevlerini içe aktar
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Firebase'i başlat
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // Zaten başlatılmışsa mevcut uygulamayı kullan
}

// Firebase Authentication'ı al
const auth = firebase.auth();

export { auth };
