import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, FlatList } from 'react-native';
import { API_ACCESS_TOKEN } from '@env'; // Pastikan Anda telah mengonfigurasi dotenv untuk mengimpor akses token
import MovieItem from '../movies/MovieItem'; // Sesuaikan path ini jika perlu

const API_URL = 'https://api.themoviedb.org/3/search/movie';

const KeywordSearch = (): JSX.Element => {
  const [keyword, setKeyword] = useState<string>('');
  const [movies, setMovies] = useState<any[]>([]);

  const handleSearch = () => {
    console.log('Searching for keyword:', keyword);
    if (keyword.trim() === '') {
      return;
    }

    const url = `${API_URL}?query=${keyword}&language=en-US&page=1`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        console.log(response.results);
        setMovies(response.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const renderItem = ({ item }: { item: any }) => (
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
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Input title movie here"
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
      />
      {movies.length === 0 ? (
        <Text style={styles.noResults}>No movies found. Try a different keyword.</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          columnWrapperStyle={styles.row}
          numColumns={3}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius:100,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 18,
  },
  noResults: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default KeywordSearch;
