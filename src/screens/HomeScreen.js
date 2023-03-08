import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {GLOBALSTYLES} from '../utils/Theme';

const HomeScreen = ({navigation, onSignOut}) => {
  return (
    <View style={GLOBALSTYLES.rootContainer}>
      <Text style={GLOBALSTYLES.heading}>Home Screen</Text>
      <Button title="Sign Out" onPress={onSignOut} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
