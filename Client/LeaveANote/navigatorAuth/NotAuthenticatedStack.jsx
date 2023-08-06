import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SplashScreen from '../pages/SplashScreen';
const Stack = createStackNavigator();
// Create a stack navigator instance
export default function NotAuthenticatedStack() {
  // Define the component for the not authenticated stack
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
}
