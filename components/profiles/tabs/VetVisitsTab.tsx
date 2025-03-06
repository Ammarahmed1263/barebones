import { FlatList, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { FC, useState } from "react";
import AppButton from "@/components/AppButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppIcon from "@/components/AppIcon";
import { Pet, VetVisitLog } from "@/types";
import formatDate from "@/utils/formatDate";
import AddVisitModal from "@/components/AddVisitModal";

interface VetVisitLogProps {
  pet: Pet | null;
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
}

const VetVisitsTab: FC<VetVisitLogProps> = ({ pet, setPet }) => {
  const [modalVisible, setModalVisible] = useState(false);
  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!pet.logs_vet_visits || pet.logs_vet_visits?.length === 0 ? (
        <Text>Oops...no vet visit records</Text>
      ) : (
        pet.logs_vet_visits.map((visit) => (
          <View key={visit.id} style={styles.visitRecord}>
            <Text>{visit.notes}</Text>
            <Text>Date: {formatDate(visit.date)}</Text>
          </View>
        ))
      )}
      <AppIcon style={styles.addVisit} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </AppIcon>

      <AddVisitModal visible={modalVisible} handleClose={() => setModalVisible(false)} />
    </View>
  );
};

export default VetVisitsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  visitRecord: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  addVisit: {
    position: "absolute",
    bottom: 70,
    right: 10,
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
