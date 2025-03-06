import { BodyConditionLog, WeightLog } from "@/types";
import formatDate from "@/utils/formatDate";
import { StyleSheet, View, Text } from "react-native";

const LogsTable = ({
  weightLogs,
  bodyConditionLogs,
}: {
  weightLogs: WeightLog[];
  bodyConditionLogs: BodyConditionLog[];
}) => (
  <View style={styles.table}>
    <Text style={styles.tableHeader}>Recent Logs</Text>
    {weightLogs.map((log, index) => (
      <View key={index} style={styles.tableRow}>
        <Text>Weight: {log.weight}kg</Text>
        <Text>Date: {formatDate(log.date)}</Text>
      </View>
    ))}
  </View>
);

export default LogsTable;

const styles = StyleSheet.create({
  table: {
    marginTop: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
