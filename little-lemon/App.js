import { StyleSheet } from 'react-native';
import Onboarding from "./screens/Onboarding";
import SplashScreen from './screens/SplashScreen';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './screens/Home';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from './AuthContext';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();


export default function App() {
 
  

  const [isLoading, setLoading] =  useState(true);
  const [isLogIn , setLogIn] = useState(false);
  
  useEffect(() => {
    const _retrieveData = async () => {
      console.log('app entry ');
      try {
        const value = await AsyncStorage.getItem('USER');
        if (value !== null) {
          console.log("not null" +value)
          setLogIn(true);
          setLoading(false);
        } else {
        
          setLogIn(false);
          setLoading(false);
        }
      } catch (error) {
        // Error retrieving data
        console.log('error in retrieve data '+error);
      }
    };
  
    _retrieveData();
  }, []);



    if (isLoading) {
      
      return (
        <SafeAreaProvider>
          <SplashScreen />
        </SafeAreaProvider>);
    }

  return (
    
    <SafeAreaProvider>
      <AuthContext.Provider value={{ isLogIn, setLogIn }}>
        
        <NavigationContainer >
            <Stack.Navigator screenOptions={{
              headerShown: false
            }}>
              {isLogIn ? (
                <>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Profile" component={Profile} />            
                  
                </>                
              )            
              :  <Stack.Screen name="Onboarding" component={Onboarding} /> 
              }
            </Stack.Navigator>
          </NavigationContainer>
            
      </AuthContext.Provider>
    </SafeAreaProvider>
        
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
    paddingLeft: 60,
    paddingRight: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
