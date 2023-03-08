import React from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../utils/Theme';

const CustomTextInput = props => {
  const handleChange = value => {
    props.onChangeText(value);
  };
  return (
    <TextInput
      {...props}
      style={[styles.textInput, props.customStyle]}
      value={props.value}
      placeholder={props.placeholder}
      onChangeText={handleChange}
      ref={props.ref}
      returnKeyType="Next"
      onSubmitEditing={props.onSubmitEditing}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  textInput: {
    width: 350,
    padding: 15,
    borderRadius: 10,
    margin: 5,
    marginBottom: 0,
    alignSelf: 'center',
    backgroundColor: COLORS.white100,
    color: COLORS.black200,
    fontSize: 16,
  },
});
