import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { BodyConditionLog } from "@/types";

interface BodyConditionTabProps {
  bodyConditionLogs: BodyConditionLog[];
}

const BodyConditionTab: FC<BodyConditionTabProps> = ({ bodyConditionLogs }) => {
  return (
    <View style={styles.container}>
      <Text>BodyConditionTab</Text>
      {bodyConditionLogs.map((visit) => (
        <View key={visit.id}>
          <Text>{visit.body_condition}</Text>
          <Text>{visit.date}</Text>
        </View>
      ))}
    </View>
  );
};

export default BodyConditionTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
