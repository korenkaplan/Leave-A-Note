import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { Text, View, Divider, Box } from "native-base";
import Homepage from '../pages/Homepage';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile'
const Drawer = createDrawerNavigator();
export default function AuthenticatedStack() {
    const CustomDrawerContent = ({ navigation }) =>{
        return(
            <DrawerContentScrollView>
            <View p={2}>
              <Text fontWeight="bold" mb={2} style={styles.menuItem}>
                Menu
              </Text>
              <Divider my={2} />
                <DrawerItem
                label="Home"
                onPress={() => navigation.navigate("Homepage")}
                />
                  <DrawerItem
                label="Profile"
                onPress={() => navigation.navigate("Profile")}
                />
                  <DrawerItem
                label="Inbox"
                onPress={() => navigation.navigate("Inbox")}
                />
            </View>

        </DrawerContentScrollView>
        );
    }
    return (
        <Drawer.Navigator drawerContent={CustomDrawerContent}>
    <Drawer.Screen name="Home" component={Homepage} />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="Inbox" component={Inbox} />
    </Drawer.Navigator>
    );
}
