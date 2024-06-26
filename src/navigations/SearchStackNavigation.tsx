import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search'
import MovieDetail from '../screens/MovieDetail'
import CategoryResults from '../screens/CategoryResults'
import CategorySearch from '../components/search/CategorySearch'

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
      <Stack.Screen 
        name="CategorySearch" 
        component={CategorySearch}
      />
      <Stack.Screen 
        name="CategoryResults" 
        component={CategoryResults}
        options={{ title: 'Movies by Categories' }}
      />
    </Stack.Navigator>
  )
}