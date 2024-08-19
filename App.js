import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import SelectionScreen from './screens/SelectionScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/mainApp/Home';
import Discover from './screens/mainApp/Discover';
import HomeHeader from './components/HomeHeader/HomeHeader';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect, useCallback } from 'react';

//SplashScreen.preventAutoHideAsync();

const getFonts = () => 
  Font.loadAsync({
    'figtree-regular': require("./assets/fonts/Figtree-Regular.ttf"),
    'figtree-medium': require("./assets/fonts/Figtree-Medium.ttf"),
  });

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainAppTab(){
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <HomeHeader/>
      }}
    >
      <Tab.Screen name='Home' component={Home}/>
      <Tab.Screen name='Discover' component={Discover} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await getFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name='MainApp'
            component={MainAppTab}
            options={{ headerShown: false }}
          />
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
