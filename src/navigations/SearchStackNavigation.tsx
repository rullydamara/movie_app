import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

export default function HomeStackNavigation(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={Search}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="MovieDetail" 
        component={MovieDetail}
        options={{ title: 'Movie Detail' }}
      />
    </Stack.Navigator>
  )
}