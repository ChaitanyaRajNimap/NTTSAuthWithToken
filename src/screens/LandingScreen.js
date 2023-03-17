import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomSmallBtn from '../components/CustomSmallBtn';
import {GLOBALSTYLES} from '../utils/Theme';
import {COLORS} from '../utils/Theme';

const LandingScreen = ({navigation}) => {
  handleSignIn = () => navigation.navigate('SignIn');

  return (
    <SafeAreaView style={[GLOBALSTYLES.rootContainer, styles.SafeAreaView]}>
      <Text style={[GLOBALSTYLES.heading, styles.heading]}>
        Discover your {'\n'}Dream job Here{' '}
      </Text>
      <Text style={styles.subHeading}>
        Explore all the most exiting jobs roles {'\n'} based on your interest
        And study major
      </Text>
      <CustomSmallBtn title="Sign In" onPress={handleSignIn} />
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
    marginBottom: 10,
    color: COLORS.grey100,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
  },
});
