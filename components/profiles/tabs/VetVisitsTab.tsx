import AddVisitModal from "@/components/AddVisitModal";
import AppIcon from "@/components/AppIcon";
import EmptyList from "@/components/EmptyList";
import { Pet, VetVisitLog } from "@/types";
import formatDate from "@/utils/formatDate";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface VetVisitLogProps {
  vetVisitLogs: VetVisitLog[];
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>;
}

const VetVisitsTab: FC<VetVisitLogProps> = ({ vetVisitLogs, setPet }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {vetVisitLogs?.length === 0 ? (
        <EmptyList />
      ) : (
        vetVisitLogs.map((visit) => (
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
    marginBottom: 20,
  },
  visitRecord: {
    flexDirection: "row",
    justifyContent: "space-between",
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
