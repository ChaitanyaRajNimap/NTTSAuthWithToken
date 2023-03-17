import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import {GLOBALSTYLES} from '../utils/Theme';
import {COLORS} from '../utils/Theme';
import CustomLongBtn from '../components/CustomLongBtn';
import CustomTextInput from '../components/CustomTextInput';
import axios from 'axios';
import {AuthContext} from '../../App';

const SignInScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState({
    emailError: null,
    passwordError: null,
  });
  const {signIn} = useContext(AuthContext);

  const handleSignIn = async () => {
    let formData = {
      email: inputs.email,
      password: inputs.password,
    };
    try {
      const res = await axios.post(
        'http://144.91.79.237:8905/api/auth/signIn',
        formData,
      );

      if (res.data) {
        console.log('Sign in successfully');
        signIn(res.data.token);
      }
    } catch (err) {
      console.log('Login Error : ', err);
      alert(`Credential dosen't matched! \nPlease check your credentials.`);
    }
  };

  return (
    <SafeAreaView style={[GLOBALSTYLES.container, styles.SafeAreaView]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={GLOBALSTYLES.container}>
          <View style={styles.textContainer}>
            <Text style={[GLOBALSTYLES.heading, styles.heading]}>
              Hello Again!
            </Text>
            <Text style={styles.subHeading}>
              Wellcome back you've {'\n'}been missed!
            </Text>
          </View>
          <KeyboardAvoidingView enabled style={styles.form}>
            <View style={styles.inputContainer}>
              <CustomTextInput
                value={inputs.email}
                placeholder="Enter email"
                onChangeText={text => {
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      email: text,
                    };
                  });
                }}
              />
              <Text style={styles.error}>{errors.emailError}</Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                value={inputs.password}
                placeholder="Enter password"
                onChangeText={text => {
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      password: text,
                    };
                  });
                }}
                secureTextEntry={true}
                maxLength={15}
              />
              <Text style={styles.error}>{errors.passwordError}</Text>
            </View>
            <CustomLongBtn
              title="Sign In"
              onPress={handleSignIn}
              customBtnStyle={styles.btn}
            />
            <View style={styles.notAMember}>
              <Text>Not a member? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: COLORS.blue100}}>Register now</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  SafeAreaView: {backgroundColor: COLORS.grey200},
  textContainer: {alignItems: 'center'},
  heading: {
    marginTop: 60,
    marginBottom: 10,
  },
  subHeading: {
    color: COLORS.grey100,
    fontSize: 20,
    lineHeight: 25,
    textAlign: 'center',
  },
  form: {
    marginVertical: 60,
  },
  inputContainer: {
    marginBottom: 5,
  },
  error: {
    marginLeft: 25,
    color: COLORS.red100,
    fontSize: 15,
  },
  btn: {
    marginTop: 50,
    alignSelf: 'center',
  },
  notAMember: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.grey100,
    fontSize: 10,
    lineHeight: 25,
    textAlign: 'center',
  },
});
