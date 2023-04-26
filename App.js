
import React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import ListaServicios from './Paginas/ListaServicios'
import Descripcion from './Paginas/Descripcion';
import Login from './Paginas/Login'
import CreateUsers from './Paginas/CreateUsers'
import UsersDel from './Paginas/UsersDel'


const Stack = createNativeStackNavigator()

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Lista de Servicios" component={ListaServicios} />
      <Stack.Screen name="Descripcion" component={Descripcion} />
      <Stack.Screen name="Crear Usuario" component={CreateUsers} />
      <Stack.Screen name="Configurar Perfil" component={UsersDel} />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
