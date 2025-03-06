import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { WeightLog } from '@/types'

interface WeightLogsTabProps {
  weightLogs: WeightLog[]
}

const WeightLogsTab: FC<WeightLogsTabProps> = ({weightLogs}) => {
  return (
    <View style={styles.container}>
      <Text>WeightLogsTab</Text>
      {weightLogs.map((visit) => (
        <View key={visit.id}>
          <Text>{visit.weight}</Text>
          <Text>{visit.date}</Text>
        </View>
      ))}
    </View>
  )
}

export default WeightLogsTab

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})