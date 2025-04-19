import React, {useState} from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Alert, Modal } from "react-native";

import { LinearGradient } from 'expo-linear-gradient'
import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const ButtonFloating = ({onPress, children}) => {
  return(
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient 
        style={styles.gradiant}
        colors={colors.gradiant} 
        start={{ x: 0.3, y: 0.2 }}
        end={{ x: 0.9, y: 0.8 }}
      />
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3
  },
  gradiant: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
})

export default ButtonFloating