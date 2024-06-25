import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

export default function Home({navigation} : any): JSX.Element {
  return (
    <View style={styles.homeContainer}>
    <Text>Home</Text>
    <Button title='Pergi ke Movie Detail' onPress={() => navigation.navigate('movieDetail')}/>
  </View>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
  }
})