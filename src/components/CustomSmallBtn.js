import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../utils/Theme';

const CustomSmallBtn = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.btn, props.customBtnStyle]}>
      <Text style={[styles.btnText, props.customBtnTextStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomSmallBtn;

const styles = StyleSheet.create({
  btn: {
    width: 170,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: COLORS.orange100,
  },
  btnText: {
    color: COLORS.white100,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
