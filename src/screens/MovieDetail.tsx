import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function MovieDetail({ navigation }: any): JSX.Element {
  
  return (
    <View style={styles.movieDetailContainer}>
      <Text>Movie Detail</Text>
      <Button title="Kembali" onPress={() => navigation.pop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  movieDetailContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});