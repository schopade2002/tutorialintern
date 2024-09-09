
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyProduct } from './MyProduct';
import { FlatlistDemo } from './FlatlistDemo';
const Stack = createNativeStackNavigator();
export function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          name="Poduct"
          component={FlatlistDemo}

        />
        <Stack.Screen
          name="MyPoducts"
          component={MyProduct}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};