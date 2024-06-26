import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator();

function HomeStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='MovieDetail'
        component={MovieDetail}
        options={{ title: 'Movie Detail' }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigation