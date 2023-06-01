import { AuthContext, AuthProvider } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Home from './screens/Home';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setLoading] = useState(true);

  

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppContent isLoading={isLoading} setLoading={setLoading}/>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const AppContent = ({ isLoading, setLoading  }) => {
  const { isLoggedIn, updateLoginStatus } = useContext(AuthContext);
  useEffect(() => {
    const _retrieveData = async () => {
      console.log('app entry ');
      try {
        const value = await AsyncStorage.getItem('USER');
        if (value !== null) {
          console.log('not null' + value);
          updateLoginStatus(true);
          setLoading(false);
        } else {
          updateLoginStatus(false);
          setLoading(false);
        }
      } catch (error) {
        console.log('error in retrieve data ' + error);
      }
    };

    _retrieveData();
  }, []);
  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen />
      ) : isLoggedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
