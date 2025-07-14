import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors } from "../constants/Colors";
import { fontSizes } from "../constants/Fonts";
import { spacing } from "../constants/Spacing";

const InputPicker = ({ items, label, selectedValue, setSelectedValue }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          {items.map((option, itemIndex) => (
            <Picker.Item
              key={itemIndex}
              style={styles.pickerItem}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 18,
    marginVertical: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  picker: {
    minheight: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    zIndex: 0,
  },
  pickerItem: {
    fontFamily: "Inter-Normal",
    fontSize: fontSizes.medium,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: fontSizes.medium,
    color: colors.black,
    position: 'absolute',
    left: 6,
    top: -10,
    borderRadius: 8,
    paddingHorizontal: 5,
    zIndex: 0,
  }
});
export default InputPicker;
