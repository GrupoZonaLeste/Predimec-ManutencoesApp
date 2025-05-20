import { Picker } from '@react-native-picker/picker';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, fontFamily } from '../utils/fonts';
import { colors } from '../constants/Colors';
import { spacing } from '../constants/Spacing';
import { fontSizes } from '../constants/Fonts';

const PickerInput = ({ items, selectedValue, setSelectedValue }) => {
  // const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
          {items.map((option) => (
            <Picker.Item
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
    paddingTop: 18,
    marginVertical: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  picker: {
    minheight: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 0,
    backgroundColor: colors.branco,
    zIndex: 0,
  },
  pickerItem: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.md,
  },
  label: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSizes.md,
    color: colors.preto,
    position: 'absolute',
    left: 12,
    top: -10,
    borderRadius: 8,
    paddingHorizontal: 5,
    zIndex: 0,
  }
});
export default PickerInput;
