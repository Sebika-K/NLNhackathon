import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import FeelingsScreen from './screens/FeelingsScreen';
import SapanaScreen from './screens/SapanaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Feelings" component={FeelingsScreen} />
        <Stack.Screen name="Sapana" component={SapanaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}