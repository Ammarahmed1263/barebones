import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import { MonthSummaryLogs } from '@/types'
import { getBodyConditionLabel } from '@/utils/getBodyConditionLabel'

interface MonthSummaryProps {
  monthLogs: MonthSummaryLogs  
}

const MonthSummary: FC<MonthSummaryProps> = ({monthLogs}) => {
  return (
    <View style={styles.monthSummary}>
    <Text style={styles.tableHeader}>This Month's Summary</Text>
    <Text>
      Latest Weight: {monthLogs.latestWeightLog?.weight + " kg" || "No weight data"} 
    </Text>
    <Text>
      Body Condition:{" "}
      {getBodyConditionLabel(monthLogs.latestBodyConditionLog?.body_condition || "No data") }
    </Text>
  </View>
  )
}

export default MonthSummary;

const styles = StyleSheet.create({
  monthSummary: {
    padding: 16,
    backgroundColor: "#e6f3ff",
    borderRadius: 8,
    marginBottom: 16,
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
})