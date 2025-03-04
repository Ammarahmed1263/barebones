import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import AppButton from './AppButton'
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
    borderTopWidth: 3,
    borderColor: '#1E90FF'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderColor: '#1E90FF'
  },
  title: {
    fontSize: 14,
  },
  activeTitle: {
    color: '#1E90FF',
    fontWeight: '700'
  }
})