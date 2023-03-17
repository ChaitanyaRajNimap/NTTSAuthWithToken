import React, {useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomSmallBtn from '../components/CustomSmallBtn';
import {GLOBALSTYLES} from '../utils/Theme';
import {COLORS} from '../utils/Theme';
import * as Keychain from 'react-native-keychain';

const LandingScreen = ({navigation, onAppStateChange}) => {
  handleRegister = () => navigation.navigate('SignUp');
  handleSignIn = () => navigation.navigate('SignIn');

  useEffect(() => {
    console.log('Called!');
    const updateAppState = async () => {
      try {
        const creds = await Keychain.getGenericPassword();
        console.log('CREDSSS : ===>', creds);
        if (creds) {
          onAppStateChange(true);
        }
      } catch (err) {
        console.log("Keychain couldn't be accessed!", err);
      }
    };
    updateAppState();
  }, []);

  return (
    <SafeAreaView style={[GLOBALSTYLES.rootContainer, styles.SafeAreaView]}>
      <Text style={[GLOBALSTYLES.heading, styles.heading]}>
        Discover your {'\n'}Dream job Here{' '}
      </Text>
      <Text style={styles.subHeading}>
        Explore all the most exiting jobs roles {'\n'} based on your interest
        And study major
      </Text>
      <View style={styles.btnContainer}>
        <CustomSmallBtn title="Register" onPress={handleRegister} />
        <CustomSmallBtn title="Sign In" onPress={handleSignIn} />
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  SafeAreaView: {backgroundColor: COLORS.grey200},
  heading: {
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    color: COLORS.grey100,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
  btnContainer: {
    width: 345,
    marginTop: 80,
    padding: 1,
    backgroundColor: COLORS.white100,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
