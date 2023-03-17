import React, {useState, createRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {GLOBALSTYLES} from '../utils/Theme';
import {COLORS} from '../utils/Theme';
import CustomLongBtn from '../components/CustomLongBtn';
import CustomTextInput from '../components/CustomTextInput';
import validate from '../utils/Validation';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

const SignInScreen = ({navigation, onSignIn}) => {
  const [inputs, setInputs] = useState({
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState({
    emailError: null,
    passwordError: null,
  });

  const emailRef = createRef();
  const passwordRef = createRef();

  //For getting userData from async storage
  // const getUserData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('userData');
  //     // return jsonValue != null ? JSON.parse(jsonValue) : null;
  //     jsonValue != null ? JSON.parse(jsonValue) : null;
  //     return jsonValue;
  //   } catch (e) {
  //     // read error
  //     alert('Error in getting users infomation', e.message);
  //   }

  //   console.log('Done.');
  // };

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

        try {
          await Keychain.setGenericPassword('token', res.data.token);
          navigation.navigate('Landing');
          console.log('Reached+');
          // onSignIn();
        } catch (err) {
          console.log('Error in storing creds in keychain', err);
        }
      }
    } catch (err) {
      console.log('Login Error : ', err);
      alert(`Credential dosen't matched! \nPlease check your credentials.`);
    }
    // let emailErr = validate.validateEmail(inputs.email);
    // let passwordErr = validate.validatePassword(inputs.password);
    // if (!emailErr && !passwordErr) {
    //   const credentials = await Keychain.getGenericPassword();
    //   if (credentials) {
    //     const {emailVal, passwordVal} = JSON.parse(credentials.password);
    //     if (inputs.email === emailVal && inputs.password === passwordVal) {
    //       setInputs(prevIp => {
    //         return {
    //           ...prevIp,
    //           email: null,
    //           password: null,
    //         };
    //       });
    //       setErrors(prevErr => {
    //         return {
    //           ...prevErr,
    //           emailError: null,
    //           passwordError: null,
    //         };
    //       });
    //       onSignIn();
    //     } else {
    //       alert(`Credential dosen't matched! \nPlease check your credentials.`);
    //     }
    //   } else {
    //     alert(
    //       `No user data found for given credentials \nPlease register first if new user`,
    //     );
    //     setInputs(prevIp => {
    //       return {
    //         ...prevIp,
    //         email: null,
    //         password: null,
    //       };
    //     });
    //     setErrors(prevErr => {
    //       return {
    //         ...prevErr,
    //         emailError: null,
    //         passwordError: null,
    //       };
    //     });
    //   }
    //   // getUserData().then(res => {
    //   //   const uData = JSON.parse(res);
    //   //   let uEmail = uData.emailVal;
    //   //   let uPassword = uData.passwordVal;
    //   //   if (inputs.email === uEmail && inputs.password === uPassword) {
    //   //     setInputs(prevIp => {
    //   //       return {
    //   //         ...prevIp,
    //   //         email: null,
    //   //         password: null,
    //   //       };
    //   //     });
    //   //     setErrors(prevErr => {
    //   //       return {
    //   //         ...prevErr,
    //   //         emailError: null,
    //   //         passwordError: null,
    //   //       };
    //   //     });
    //   //     onSignIn();
    //   //   } else {
    //   //     alert(`Credential dosen't matched! \nPlease check your credentials.`);
    //   //   }
    //   // });
    // } else {
    //   setErrors(prevErr => {
    //     return {
    //       ...prevErr,
    //       emailError: emailErr,
    //       passwordError: passwordErr,
    //     };
    //   });
    // }
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
                  // let err = validate.validateEmail(text);
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      email: text,
                    };
                  });
                  // setErrors(prevErr => {
                  //   return {
                  //     ...prevErr,
                  //     emailError: err,
                  //   };
                  // });
                }}
                // ref={emailRef}
                // onSubmitEditing={
                //   passwordRef.current && passwordRef.current.focus()
                // }
              />
              <Text style={styles.error}>{errors.emailError}</Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                value={inputs.password}
                placeholder="Enter password"
                onChangeText={text => {
                  // let err = validate.validatePassword(text);
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      password: text,
                    };
                  });
                  // setErrors(prevErr => {
                  //   return {
                  //     ...prevErr,
                  //     passwordError: err,
                  //   };
                  // });
                }}
                // ref={passwordRef}
                // onSubmitEditing={Keyboard.dismiss}
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
      {/* <Text style={GLOBALSTYLES.heading}>Sign In Screen</Text> */}
      {/* <Button title="Sign In" onPress={onSignIn} />
      <Text>OR</Text>
      <Button
        title="Go To Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      /> */}
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
