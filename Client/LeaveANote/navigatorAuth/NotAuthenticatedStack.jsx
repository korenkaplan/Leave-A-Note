import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
const Stack = createStackNavigator();

export default function NotAuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}