// components/search/CategorySearch.tsx
import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const categories = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'];

const CategorySearch = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = () => {
    setResults([`Result for ${selectedCategory} 1`, `Result for ${selectedCategory} 2`, `Result for ${selectedCategory} 3`]);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCategory}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
      <Button title="Search" onPress={handleSearch} />
      <View style={styles.results}>
        {results.map((result, index) => (
          <Text key={index} style={styles.resultText}>
            {result}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 8,
  },
  results: {
    marginTop: 16,
  },
  resultText: {
    fontSize: 16,
    padding: 4,
  },
});

export default CategorySearch;
