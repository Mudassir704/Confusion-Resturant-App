import React, { useEffect } from "react";
import { View, ToastAndroid } from "react-native";
import MenuComponent from "./MenuComponent";
import DishDetailComponent from "./DishDetailComponent";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeComponent from "./HomeComponent";
import AboutUsComponent from "./AboutUsComponent";
import ContactUsComponent from "./ContactUsComponent";
import { Icon } from "react-native-elements";
import CustomDrawerContentCopmponent from "./CustomDrawerComponent";
import { useDispatch } from "react-redux";
import {
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromos,
} from "../redux/ActionCreators";
import ReservationComponent from "./ReservationComponent";
import Favrouites from "./Favrouites";
import Login from "./Login";
import NetInfo from "@react-native-community/netinfo";

const Stack = createStackNavigator();

const MenuNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    }}
  >
    <Stack.Screen
      name="Menu"
      component={MenuComponent}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
    <Stack.Screen
      name="DishDetail"
      component={DishDetailComponent}
      options={({ navigation }) => ({
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const HomeNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeComponent}
      options={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const AboutusNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="About Us"
      component={AboutUsComponent}
      options={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const ContactusNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Contact Us"
      component={ContactUsComponent}
      options={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);
const FavrouiteNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="My Favrouite"
      component={Favrouites}
      options={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);
const ReservationNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Reserve Table"
      component={ReservationComponent}
      options={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const LoginNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Login}
      options={({ navigation }) => ({
        headerStyle: {
          backgroundColor: "#512DA8",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

const MainNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContentCopmponent {...props} />}
  >
    <Drawer.Screen
      name="Login"
      component={LoginNavigator}
      options={{
        title: "Login",
        drawerLabel: "Login",
        drawerIcon: ({ color }) => (
          <Icon name="sign-in" type="font-awesome" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ color }) => (
          <Icon name="home" type="font-awesome" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="AboutUs"
      component={AboutusNavigator}
      options={{
        title: "About Us",
        drawerLabel: "About Us",
        drawerIcon: ({ color }) => (
          <Icon
            name="info-circle"
            type="font-awesome"
            size={22}
            color={color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Menu"
      component={MenuNavigator}
      options={{
        title: "Menu",
        drawerLabel: "Menu",
        drawerIcon: ({ color }) => (
          <Icon name="list" type="font-awesome" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Contactus"
      component={ContactusNavigator}
      options={{
        title: "Contact Us",
        drawerLabel: "Contact Us",
        drawerIcon: ({ color }) => (
          <Icon
            name="address-card"
            type="font-awesome"
            size={22}
            color={color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Reservation Table"
      component={FavrouiteNavigator}
      options={{
        title: "My Favrouite",
        drawerLabel: "My Favrouite",
        drawerIcon: ({ color }) => (
          <Icon name="heart" type="font-awesome" size={22} color={color} />
        ),
      }}
    />
    <Drawer.Screen
      name="Reservation"
      component={ReservationNavigator}
      options={{
        title: "Reservation Table",
        drawerLabel: "Reservation Table",
        drawerIcon: ({ color }) => (
          <Icon name="cutlery" type="font-awesome" size={22} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
);

function MainComponent(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchDishes());
    dispatch(fetchLeaders());
    dispatch(fetchPromos());

    NetInfo.fetch().then((connectionInfo) => {
      ToastAndroid.show(
        "Initial Network Connectivity Type: " +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType,
        ToastAndroid.LONG
      );
    });

    NetInfo.addEventListener("connectionChange", handleConnectivityChange);
    return () => {
      NetInfo.removeEventListener(
        "connectionChange",
        this.handleConnectivityChange
      );
    };
  }, []);

  const handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case "none":
        ToastAndroid.show("You are now offline!", ToastAndroid.LONG);
        break;
      case "wifi":
        ToastAndroid.show("You are now connected to wifi!", ToastAndroid.LONG);
        break;
      case "cellular":
        ToastAndroid.show(
          "You are now connected to cellular data!",
          ToastAndroid.LONG
        );
        break;
      case "unknown":
        ToastAndroid.show(
          "You are now connected to unknown!",
          ToastAndroid.LONG
        );
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </View>
  );
}

export default MainComponent;
