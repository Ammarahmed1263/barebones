import { Platform, Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'

interface AppButtonProps extends PressableProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const AppButton: FC<AppButtonProps> = ({title, titleStyle, style, ...props}) => {
  return (
    <View style={[styles.container, style]}>
      <Pressable android_ripple={{color: 'rgba(77, 166, 255, 0.8)'}} style={({pressed}) => [styles.button, pressed && Platform.OS === 'ios' && {opacity: 0.5}]} {...props}>
        <Text style={[styles.text, titleStyle]}>{title}</Text>
      </Pressable>
    </View>
  )
}

export default AppButton

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: 40,
    overflow: 'hidden',
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  }
})