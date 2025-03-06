import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { WeightLog } from '@/types'
import formatDate from '@/utils/formatDate'

interface WeightLogsTabProps {
  weightLogs: WeightLog[]
}

const WeightLogsTab: FC<WeightLogsTabProps> = ({weightLogs}) => {
  return (
    <View style={styles.container}>
      {weightLogs.map((visit) => (
        <View key={visit.id} style={styles.tableRow}>
          <Text>Weight: {visit.weight}</Text>
          <Text>Date: {formatDate(visit.date)}</Text>
        </View>
      ))}
    </View>
  )
}

export default WeightLogsTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableRow:  {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  }
})