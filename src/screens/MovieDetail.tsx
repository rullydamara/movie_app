import React from 'react'
import { View, Text } from 'react-native'
import { API_URL, API_ACCESS_TOKEN } from '@env'

const MovieDetail = ({ route }: any):
JSX.Element => {
  const { id } = route.params

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 32,
      }}
    >
      <Text style={{ fontSize: 30 }}>Movie ID: {id}</Text>
    </View>
  )

}

export default MovieDetail