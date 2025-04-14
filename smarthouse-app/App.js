import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaInicial from './TelaInicial';
import TelaLogin from './TelaLogin';
import TelaEsqueceuSenha from './TelaEsqueceuSenha';
import TelaRegistro from './TelaRegistro';
import TelaDispositivo from './TelaDispositivo';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TelaInicial"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="TelaLogin" component={TelaLogin} />
          <Stack.Screen name="TelaDispositivo" component={TelaDispositivo} />
          <Stack.Screen name="TelaEsqueceuSenha" component={TelaEsqueceuSenha} />
          <Stack.Screen name="TelaRegistro" component={TelaRegistro} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}