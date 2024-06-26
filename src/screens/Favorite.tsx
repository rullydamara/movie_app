import React, { useState, useCallback } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import type { Movie } from '../types/app'
import MovieItem from '../components/movies/MovieItem'

export default function Favorite(): JSX.Element {
  const [favoriteMovieList, setFavorites] = useState<Movie[]>([])

  useFocusEffect(
    useCallback(() => {
      getFavoriteMovie()
    }, []),
  )

  const getFavoriteMovie = async (): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        setFavorites(favMovieList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (favoriteMovieList.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.titleFavorites}>Favorite Movies</Text>
      </View>
        <Text style={styles.emptyFavorite}>No favorite movies found.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <View>
      <MovieItem
        movie={item}
        size={{
          width: 100,
          height: 160,
        }}
        coverType="poster"
        key={item.title}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.purpleLabel}></View>
        <Text style={styles.titleFavorites}>Favorite Movies</Text>
      </View>
      <FlatList
          data={favoriteMovieList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          columnWrapperStyle={styles.row}
          numColumns={3}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flex: 1,
  },
  emptyFavoriteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  titleFavorites: {
    fontSize: 20,
    fontWeight: '900',
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  emptyFavorite: {
    fontSize: 18,
    color: "#999",
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
  },
})