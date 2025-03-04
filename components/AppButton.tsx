import { Platform, Pressable, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const AppButton: FC<AppButtonProps> = ({title, titleStyle, style, ...props}) => {
  return (
    <Pressable android_ripple={{color: 'rgba(77, 166, 255, 0.1)'}} style={({pressed}) => [styles.button, pressed && Platform.OS === 'ios' && {opacity: 0.5}, style]} {...props}>
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </Pressable>
  )
}

export default AppButton

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  text: {
    fontSize: 16,
  }
})