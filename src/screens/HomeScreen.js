import React, {useContext} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {GLOBALSTYLES} from '../utils/Theme';
import {COLORS} from '../utils/Theme';
import CustomLongBtn from '../components/CustomLongBtn';
import {AuthContext} from '../../App';

const HomeScreen = () => {
  const {signOut} = useContext(AuthContext);

  const handleSignOut = () => signOut();

  return (
    <SafeAreaView style={[GLOBALSTYLES.rootContainer, styles.SafeAreaView]}>
      <Text style={[GLOBALSTYLES.heading, styles.heading]}>Welcome User!!</Text>
      <CustomLongBtn
        title="Sign Out"
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
