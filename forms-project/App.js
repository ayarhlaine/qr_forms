
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import FormScreen from './src/screens/Form';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'SUSTENIR AGRICULTURE' }}/>
          <Stack.Screen name="Form" component={FormScreen} options={({ route }) => ({ title: route.params.title })}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}