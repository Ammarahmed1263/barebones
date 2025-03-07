import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SingleProfileScreen } from "./screens/profiles/SingleProfile.screen";
import { useEffect, useLayoutEffect, useState } from "react";
import { petService } from "./services/petService";
import { Pet } from "./types";
import { StatusBar } from "expo-status-bar";

export type RootStackParamList = {
  SingleProfile: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [pet, setPet] = useState<Pet | null>(null);


  useLayoutEffect(() => {
    (async () => {
      try {
        const pets = await petService.getPets();
        setPet(pets[0]);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    })();
  }, []);

  if (!pet) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SingleProfile"
            component={SingleProfileScreen}
            options={{ title: "Pet Profile" }}
            initialParams={{ id: pet.id }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
