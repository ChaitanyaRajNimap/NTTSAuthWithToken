import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from './src/screens/LandingScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  const handleSignUp = () => {
    setIsAuthenticated(true);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} onSignOut={handleSignOut} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{animationTypeForReplace: 'pop'}}
            />
            <Stack.Screen name="SignIn">
              {props => <SignInScreen {...props} onSignIn={handleSignIn} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {props => <SignUpScreen {...props} onSignUp={handleSignUp} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
