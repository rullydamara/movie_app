import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, ImageBackground, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import { LinearGradient } from 'expo-linear-gradient'
import type { Movie } from '../types/app'
import MovieItem from '../components/movies/MovieItem'
import { format } from 'date-fns'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieDetail = ({ route }: any): JSX.Element => {
  const [movieDetail, setMovieDetail] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<any[]>([])
  const { id } = route.params
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  useEffect(() => {
    fetchMovieDetail()
    fetchRecommendations()
    checkFavoriteStatus()
  }, [id])

  const fetchMovieDetail = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setMovieDetail(data)
    } catch (error) {
      console.log(error)
    }
  };

  const fetchRecommendations = async (): Promise<void> => {
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      setRecommendations(data.results)
    } catch (error) {
      console.log(error)
    }
  };

  const addFavorite = async (movie: Movie): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");
      let favMovieList: Movie[] = initialData ? JSON.parse(initialData) : [];
      favMovieList.push(movie);
      await AsyncStorage.setItem("@FavoriteList", JSON.stringify(favMovieList));
      console.log("Added to favorites:", movieDetail);
      setIsFavorite(true);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFavorite = async (id: number): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem("@FavoriteList");
      if (initialData) {
        const favMovieList: Movie[] = JSON.parse(initialData).filter(
          (movie: Movie) => movieDetail.id !== id
        );
        await AsyncStorage.setItem(
          "@FavoriteList",
          JSON.stringify(favMovieList)
        );
        setIsFavorite(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkIsFavorite = async (id: number): Promise<boolean> => {
    let convertJSON: Movie[] = []
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')

      convertJSON = JSON.parse(initialData || '[]')
    } catch (error) {
      console.error(error)
    }

    return convertJSON.some((movieDetail) => movieDetail.id === id)
  }

  const checkFavoriteStatus = async (): Promise<void> => {
    const favoriteStatus = await checkIsFavorite(id);
    setIsFavorite(favoriteStatus);
  };

  if (!movieDetail) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const formattedMovieDate = format(movieDetail.release_date, 'EEE MMM dd yyyy')

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`,
          }}
          style={styles.backdrop}
        >
          <LinearGradient
            colors={["#00000000", "rgba(0, 0, 0, 0.7)"]}
            locations={[0.6, 1]}
            style={styles.gradient}
          >
            <Text style={styles.movieTitle}>{movieDetail.title}</Text>
            <View style={styles.flexrowTitle}>
              <Text style={styles.movieRating}>⭐ {movieDetail.vote_average}</Text>
              <FontAwesome.Button
                name={isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color="white"
                iconStyle={styles.favoriteMovie}
                backgroundColor="transparent"
                onPress={() => {
                  isFavorite ? removeFavorite(movieDetail.id) : addFavorite(movieDetail)
                }}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.movieOverview}>{movieDetail.overview}</Text>
        <View style={styles.flexrow}>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Original Language: </Text>
            <Text>{movieDetail.spoken_languages[0].english_name}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Popularity: </Text>
            <Text>{movieDetail.popularity}</Text>
          </View>
        </View>
        <View style={styles.flexrow}>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Release date: </Text>
            <Text>{formattedMovieDate}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.detailLabel}>Vote Count: </Text>
            <Text>{movieDetail.vote_count}</Text>
          </View>
        </View>
        <View style={styles.header}>
          <View style={styles.purpleLabel}></View>
          <Text style={styles.movieTitleRecommendation}>Recommendation</Text>
        </View>
        <FlatList
          style={styles.recommendationList}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recommendations}
          renderItem={({ item }) => (
            <MovieItem
              movie={item}
              size={{ width: 100, height: 160 }}
              coverType="poster"
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  movieRating: {
    fontSize: 16,
    color: '#fff',
  },
  movieOverview: {
    paddingHorizontal: 20,
    fontSize: 16,
    marginVertical: 8,
    color: '#000',
    textAlign: "justify",
  },
  movieTitleRecommendation: {
    fontSize: 20,
    fontWeight: '900',
  },
  backdrop: {
    width: '100%',
    height: 250,
    overflow: 'hidden',
    marginBottom: 16,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  recommendationList: {
    paddingLeft: 8,
    marginTop: 8,
  },
  purpleLabel: {
    width: 20,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8978A4',
    marginRight: 12,
    marginLeft: 8,
  },
  favoriteMovie: {
    marginLeft: 'auto',
  },
  flex: {
    flex: 1,
    marginHorizontal: 8,
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginVertical: 8,
    paddingLeft: 14,
  },
  flexrowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default MovieDetail