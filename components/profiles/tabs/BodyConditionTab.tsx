import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { BodyConditionLog } from "@/types";
import formatDate from "@/utils/formatDate";
import { getBodyConditionLabel } from "@/utils/getBodyConditionLabel";
import EmptyList from "@/components/EmptyList";

interface BodyConditionTabProps {
  bodyConditionLogs: BodyConditionLog[];
}

const BodyConditionTab: FC<BodyConditionTabProps> = ({ bodyConditionLogs }) => {
  return (
    <View style={styles.container}>
      {bodyConditionLogs?.length === 0 ? (
        <EmptyList text="Sorry...No body condition records available" />
      ) : (
        bodyConditionLogs.map((visit) => (
          <View key={visit.id} style={styles.tableRow}>
            <Text style={{width: '60%'}}>
              Condition: {getBodyConditionLabel(visit.body_condition)}
            </Text>
            <Text>Date: {formatDate(visit.date)}</Text>
          </View>
        ))
      )}
    </View>
  );
};

export default BodyConditionTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
