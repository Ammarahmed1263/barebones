import React, { FC } from 'react';
import { Platform, Pressable, StyleProp, StyleSheet, TouchableOpacityProps, View, ViewStyle } from 'react-native';

interface AppIconProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>;
}

const AppIcon: FC<AppIconProps> = ({style, ...props}) => {
  return (
    <View style={[styles.button, style]}>
      <Pressable android_ripple={{color: 'rgba(77, 166, 255, 0.8)'}} style={({pressed}) => [styles.pressable, pressed && Platform.OS === 'ios' && {opacity: 0.5}]} {...props}>
        {props.children}
      </Pressable>
    </View>
  )
}

export default AppIcon

const styles = StyleSheet.create({
  button: {
    width: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})