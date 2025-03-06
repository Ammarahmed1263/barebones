import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import AppButton from '../AppButton'
import { LogType } from '@/types'

interface TabNavigatorProps {
  activeTab: LogType;
  setActiveTab: React.Dispatch<React.SetStateAction<LogType>>
}

const TabNavigator: FC<TabNavigatorProps> = ({activeTab, setActiveTab}) => {
  const tabs = [
    { id: 'weight', title: 'Weight' },
    { id: 'body', title: 'Body Condition' },
    { id: 'vet', title: 'Vet Visits' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <AppButton
          key={tab.id}
          style={[styles.tabItem, activeTab === tab.id && styles.activeTabItem]}
          titleStyle={[styles.title, activeTab === tab.id && styles.activeTitle]}
          title={tab.title}
          android_ripple={null}
          onPress={() => setActiveTab(tab.id)} />
      ))}
    </View>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 20,
    padding: 5,
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    overflow: 'hidden'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  activeTabItem: {
    backgroundColor: '#1E90FF',
    borderRadius: 30
  },
  title: {
    fontSize: 14,
  },
  activeTitle: {
    color: 'white',
    fontWeight: '700'
  }
})