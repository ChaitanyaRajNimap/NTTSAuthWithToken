import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {GLOBALSTYLES} from '../utils/Theme';
import {COLORS} from '../utils/Theme';
import CustomLongBtn from '../components/CustomLongBtn';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const HomeScreen = ({navigation, onSignOut}) => {
  //For removing userData from async storage
  // removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem('userData');
  //   } catch (e) {
  //     // remove error
  //     alert('Error in removing users infomation', e.message);
  //   }

  //   console.log('userData removed.');
  // };

  const handleSignOut = async () => {
    try {
      await Keychain.resetGenericPassword();
      onSignOut();
    } catch (error) {
      console.log('Error in signing out', error);
    }
  };

  return (
    <SafeAreaView style={[GLOBALSTYLES.rootContainer, styles.SafeAreaView]}>
      <Text style={[GLOBALSTYLES.heading, styles.heading]}>Welcome User!!</Text>
      <CustomLongBtn
        title="Sign Out"
        // onPress={() => {
        //   // removeValue();
        //   // onSignOut();
        // }}
        onPress={handleSignOut}
        customBtnStyle={styles.btn}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  SafeAreaView: {backgroundColor: COLORS.grey200},
  heading: {
    marginBottom: 20,
    textAlign: 'center',
  },
  btn: {
    marginTop: 50,
    alignSelf: 'center',
  },
});
