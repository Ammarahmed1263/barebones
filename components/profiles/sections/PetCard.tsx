import { Pet } from "@/types";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface PetCardProps {
  pet: Pet
}

const PetCard: FC<PetCardProps> = ({ pet }) => (
  <View style={styles.card}>
    <Text style={styles.name}>{pet.name}</Text>
    <Text>Species: {pet.species}</Text>
    <Text>Age: {pet.age} years</Text>
  </View>
);

export default PetCard;

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});