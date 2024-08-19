import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SelectionScreen from './screens/SelectionScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/mainApp/Home';
import Discover from './screens/mainApp/Discover';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainAppTab(){
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Discover' component={Discover} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='WelcomeScreen'
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='SelectionScreen'
            component={SelectionScreen}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
