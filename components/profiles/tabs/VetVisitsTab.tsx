import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import AppButton from "@/components/AppButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppIcon from "@/components/AppIcon";
import { Pet, VetVisitLog } from "@/types";
import formatDate from "@/utils/formatDate";

interface VetVisitLogProps {
  pet: Pet | null;
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
}

const VetVisitsTab: FC<VetVisitLogProps> = ({ pet, setPet }) => {
  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>VetVisitsTab</Text>
      {!pet.logs_vet_visits || pet.logs_vet_visits?.length === 0 ? (
        <Text>Oops...no vet visit records</Text>
      ) : (
        pet.logs_vet_visits.map(visit => (
          <View key={visit.id} style={styles.visitRecord}>
            <Text>{visit.notes}</Text>
            <Text>{formatDate(visit.date)}</Text>
          </View>
      )))
    }
      {/* <FlatList
        data={pet.logs_vet_visits}
        renderItem={({ item }) => (
        )}
        ListEmptyComponent={() => (
          // <View style={styles.container}>
            <Text>Oops...no vet visit records</Text>
          // </View>
        )}
      /> */}
      <AppIcon style={styles.addVisit} onPress={() => {}}>
        <Ionicons name="add" size={30} color="white" />
      </AppIcon>
    </View>
  );
};

export default VetVisitsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  addVisit: {
    position: "absolute",
    bottom: 40,
    right: 25,
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  visitRecord: {
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
