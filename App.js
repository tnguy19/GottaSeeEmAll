import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import SelectionScreen from './screens/SelectionScreen';
import Home from './screens/mainApp/Home';
import Discover from './screens/mainApp/Discover';
import HomeHeader from './components/HomeHeader/HomeHeader';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';
import { Foundation, Entypo } from '@expo/vector-icons';
import DiscoverHeader from './components/Discover/DiscoverHeader';
import SeeAll from './screens/mainApp/SeeAll';
import Search from './screens/mainApp/Search';
import { LocationProvider } from './context/LocationContext';
import LandmarkProvider from './context/LandmarkContext';

const getFonts = () =>
  Font.loadAsync({
    'figtree-regular': require("./assets/fonts/Figtree-Regular.ttf"),
    'figtree-medium': require("./assets/fonts/Figtree-Medium.ttf"),
    'figtree-bold': require("./assets/fonts/Figtree-Bold.ttf"),
  });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainAppTab() {
  return (
    <Tab.Navigator screenOptions={{
      tabBarLabelStyle: {
        color: 'black',
        fontFamily: 'figtree-medium',
        fontSize: 12
      }
    }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          header: () => <HomeHeader />,
          tabBarIcon: ({ focused, size }) => <Foundation name="home" size={size} color={focused ? 'black' : '#808080'} />,
        }}
      />
      <Tab.Screen
        name='Discover'
        component={Discover}
        options={{
          header: () => <DiscoverHeader />,
          tabBarIcon: ({ focused, size }) => <Entypo name="compass" size={size} color={focused ? 'black' : '#808080'} />,
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await getFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <LocationProvider>
      <LandmarkProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='MainApp'
              component={MainAppTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SeeAll'
              component={SeeAll}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name='Search'
              component={Search}
              options={{
                headerShown: false,
                animation: 'slide_from_bottom'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LandmarkProvider>
    </LocationProvider>
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