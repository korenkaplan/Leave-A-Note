import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import SplashScreen from '../pages/SplashScreen';
const Stack = createStackNavigator();

export default function NotAuthenticatedStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
    </Stack.Navigator>
  );
}
