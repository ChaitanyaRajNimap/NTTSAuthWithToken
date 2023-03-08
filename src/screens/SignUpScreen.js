import React, {useState, useEffect, createRef} from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({navigation, onSignUp}) => {
  const [inputs, setInputs] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [errors, setErrors] = useState({
    nameError: null,
    emailError: null,
    passwordError: null,
  });

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();

  useEffect(() => {
    removeValue = async () => {
      try {
        await AsyncStorage.removeItem('userData');
      } catch (e) {
        // remove error
        alert('Error in removing users infomation', e.message);
      }

      console.log('userData removed.');
    };
    removeValue();
  }, []);

  //For strong new user data to async storage
  const storeData = async value => {
    if (value) {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('userData', jsonValue);
      } catch (e) {
        // saving error
        alert('Error in saving users infomation', e.message);
      }
    }
  };

  const handleSignUp = () => {
    let nameErr = validate.validateName(inputs.name);
    let emailErr = validate.validateEmail(inputs.email);
    let passwordErr = validate.validatePassword(inputs.password);

    let dataToPass = {
      emailVal: inputs.email,
      passwordVal: inputs.password,
    };

    if (!nameErr && !emailErr && !passwordErr) {
      setInputs(prevIp => {
        return {
          ...prevIp,
          name: null,
          email: null,
          password: null,
        };
      });
      setErrors(prevErr => {
        return {
          ...prevErr,
          nameError: null,
          emailError: null,
          passwordError: null,
        };
      });
      storeData(dataToPass);
      // onSignUp();
      navigation.navigate('SignIn');
    } else {
      setErrors(prevErr => {
        return {
          ...prevErr,
          nameError: nameErr,
          emailError: emailErr,
          passwordError: passwordErr,
        };
      });
    }
  };

  return (
    <SafeAreaView style={[GLOBALSTYLES.container, styles.SafeAreaView]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={GLOBALSTYLES.container}>
          <View style={styles.textContainer}>
            <Text style={[GLOBALSTYLES.heading, styles.heading]}>
              Hello New User!
            </Text>
            <Text style={styles.subHeading}>Wellcome To {'\n'}HireME!</Text>
          </View>
          <KeyboardAvoidingView enabled style={styles.form}>
            <View style={styles.inputContainer}>
              <CustomTextInput
                value={inputs.name}
                placeholder="Enter name"
                onChangeText={text => {
                  let err = validate.validateName(text);
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      name: text,
                    };
                  });
                  setErrors(prevErr => {
                    return {
                      ...prevErr,
                      nameError: err,
                    };
                  });
                }}
                ref={nameRef}
                onSubmitEditing={emailRef.current && emailRef.current.focus()}
              />
              <Text style={styles.error}>{errors.nameError}</Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                value={inputs.email}
                placeholder="Enter email"
                onChangeText={text => {
                  let err = validate.validateEmail(text);
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      email: text,
                    };
                  });
                  setErrors(prevErr => {
                    return {
                      ...prevErr,
                      emailError: err,
                    };
                  });
                }}
                ref={emailRef}
                onSubmitEditing={
                  passwordRef.current && passwordRef.current.focus()
                }
              />
              <Text style={styles.error}>{errors.emailError}</Text>
            </View>
            <View style={styles.inputContainer}>
              <CustomTextInput
                value={inputs.password}
                placeholder="Enter password"
                onChangeText={text => {
                  let err = validate.validatePassword(text);
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      password: text,
                    };
                  });
                  setErrors(prevErr => {
                    return {
                      ...prevErr,
                      passwordError: err,
                    };
                  });
                }}
                ref={passwordRef}
                onSubmitEditing={Keyboard.dismiss}
                secureTextEntry={true}
                maxLength={6}
              />
              <Text style={styles.error}>{errors.passwordError}</Text>
            </View>
            <CustomLongBtn
              title="Sign Up"
              onPress={handleSignUp}
              customBtnStyle={styles.btn}
            />
            <View style={styles.notAMember}>
              <Text>Already a member? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={{color: COLORS.blue100}}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
