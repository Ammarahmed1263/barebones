import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'


interface EmptyListProps {
  text?: string
}
const EmptyList: FC<EmptyListProps> = ({text = "Oops...no vet visit records"}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  }
})