import AddVisitModal from "@/components/AddVisitModal";
import AppIcon from "@/components/AppIcon";
import EmptyList from "@/components/EmptyList";
import { petService } from "@/services/petService";
import { Pet, VetVisitLog } from "@/types";
import formatDate from "@/utils/formatDate";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface VetVisitLogProps {
  pet: Pet | null;
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
}

const VetVisitsTab: FC<VetVisitLogProps> = ({ pet, setPet }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {!pet || !pet.logs_vet_visits || pet.logs_vet_visits?.length === 0 ? (
        <EmptyList />
      ) : (
        pet.logs_vet_visits.map((visit) => (
          <View key={visit.id} style={styles.visitRecord}>
            <Text style={{width: '65%'}}>{visit.notes}</Text>
            <Text >Date: {formatDate(visit.date)}</Text>
          </View>
        ))
      )}
      <AppIcon style={styles.addVisit} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </AppIcon>

      <AddVisitModal pet={pet} setPet={setPet} visible={modalVisible} handleClose={() => setModalVisible(false)} />
    </View>
  );
};

export default VetVisitsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  visitRecord: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  addVisit: {
    width: 60,
    aspectRatio: 1 / 1,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: 'flex-end',
    marginTop: 12,
  },
});
