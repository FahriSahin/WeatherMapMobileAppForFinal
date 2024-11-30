import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Sayfalar
import Login from './Login';
import Register from './Register';
import WeatherApp from './WeatherApp';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  WeatherApp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="WeatherApp" component={WeatherApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
