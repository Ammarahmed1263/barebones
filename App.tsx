import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SingleProfileScreen } from './screens/profiles/SingleProfile.screen';
import { useEffect } from 'react';
import { petService } from './services/petService';

export type RootStackParamList = {
  SingleProfile: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  useEffect(() => {
    petService.getPets();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="SingleProfile" 
          component={SingleProfileScreen}
          options={{ title: 'Pet Profile' }}
          initialParams={{ id: '1' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 