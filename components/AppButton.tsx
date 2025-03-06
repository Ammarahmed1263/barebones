import { Platform, Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'

interface AppButtonProps extends PressableProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

const AppButton: FC<AppButtonProps> = ({ title, titleStyle, style, ...props }) => {
  return (
    <Pressable 
      android_ripple={{ color: 'rgba(77, 166, 255, 0.8)' }} 
      style={({ pressed }) => [
        styles.button, 
        pressed && Platform.OS === 'ios' && { opacity: 0.5 }, 
        style
      ]} 
      {...props}
    >
      <Text style={[styles.text, titleStyle]}>{title}</Text>
    </Pressable>
  );
};

export default AppButton

const styles = StyleSheet.create({
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
