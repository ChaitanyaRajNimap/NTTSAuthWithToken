import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GLOBALSTYLES} from '../utils/Theme';

const SignUpScreen = ({navigation, onSignUp}) => {
  return (
    <View style={GLOBALSTYLES.rootContainer}>
      <Text style={GLOBALSTYLES.heading}>Sign Up Screen</Text>
      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
