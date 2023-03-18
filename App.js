import React, {useState, useEffect, createContext, useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import * as Keychain from 'react-native-keychain';

const Stack = createNativeStackNavigator();

//Auth context
const AuthContext = createContext();

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await Keychain.getGenericPassword();
        if (token) {
          setAuthToken(token);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log(`Keychain couldn't be accessed!`, err);
      }
    };
    getToken();
  }, []);

  const authContext = useMemo(() => {
    const signIn = async token => {
      try {
        await Keychain.setGenericPassword('token', token);
      } catch (err) {
        console.log('Error in storing creds in keychain', err);
      }
      setAuthToken(token);
      setIsAuthenticated(true);
    };

    const signOut = async () => {
      try {
        await Keychain.resetGenericPassword();
      } catch (err) {
        console.log('Error in signing out', err);
      }
      setAuthToken(null);
      setIsAuthenticated(false);
    };

    return {signIn, signOut, authToken, isAuthenticated};
  }, [authToken, isAuthenticated]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ) : (
            <>
              <Stack.Screen name="Landing" component={LandingScreen} />
              <Stack.Screen name="SignIn" component={SignInScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
export {AuthContext};
