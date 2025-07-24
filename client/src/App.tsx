import 'react-native-reanimated';
import 'react-native-worklets';
import React from 'react';
import WelcomeScreen from './screens/WelcomeScreen';
import UsernameScreen from './screens/UsernameScreen';
import '../global.css';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="username" component={UsernameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
