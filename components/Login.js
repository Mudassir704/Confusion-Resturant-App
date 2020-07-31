import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Input, CheckBox, Icon, Button } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

import { baseUrl } from "../shared/baseUrl";

class LoginTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      remember: false,
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync("userinfo").then((userdata) => {
      let userinfo = JSON.parse(userdata);
      if (userinfo) {
        this.setState({ username: userinfo.username });
        this.setState({ password: userinfo.password });
        this.setState({ remember: true });
      }
    });
  }

  handleLogin() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "user-o" }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={styles.formInput}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "key" }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={styles.formInput}
        />
        <CheckBox
          title="Remember Me"
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={styles.formCheckbox}
        />
        <View style={styles.formButton}>
          <Button
            onPress={() => this.handleLogin()}
            title="Login"
            icon={
              <Icon
                name="sign-in"
                type="font-awesome"
                size={24}
                color="white"
              />
            }
            buttonStyle={{
              backgroundColor: "#512DA8",
            }}
          />
        </View>
        <View style={styles.formButton}>
          <Button
            onPress={() => this.props.navigation.navigate("Register")}
            title="Register"
            icon={
              <Icon
                name="user-plus"
                type="font-awesome"
                size={24}
                color="white"
              />
            }
            buttonStyle={{
              backgroundColor: "#512DA8",
            }}
          />
        </View>
      </View>
    );
  }
}
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      remember: false,
      imageUrl: baseUrl + "images/logo.png",
    };
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      try {
        let capturedImage = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        if (!capturedImage.cancelled) {
          console.log(capturedImage);
          this.processImage(capturedImage.uri);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  pickfromGallery = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
    } else {
      try {
        let capturedImage = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        if (!capturedImage.cancelled) {
          console.log(capturedImage);
          this.processImage(capturedImage.uri);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 400 } }],
      { format: "png" }
    );
    console.log(processedImage);
    this.setState({ imageUrl: processedImage.uri });
  };

  handleRegister() {
    console.log(JSON.stringify(this.state));
    if (this.state.remember) {
      SecureStore.setItemAsync(
        "userinfo",
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        })
      ).catch((error) => console.log("Could not save user info", error));
    } else {
      SecureStore.deleteItemAsync("userinfo").catch((error) =>
        console.log("Could not delete user info", error)
      );
    }
  }

  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: this.state.imageUrl }}
              loadingIndicatorSource={require("../shared/images/logo.png")}
              style={styles.image}
            />
            <Button
              title="Camera"
              onPress={this.getCameraPermissions}
              buttonStyle={{ margin: 10 }}
            />
            <Button
              title="Gallery"
              onPress={this.pickfromGallery}
              buttonStyle={{ margin: 10 }}
            />
          </View>
          <Input
            placeholder="First Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(firstname) => this.setState({ firstname })}
            value={this.state.firstname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Last Name"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(lastname) => this.setState({ lastname })}
            value={this.state.lastname}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Username"
            leftIcon={{ type: "font-awesome", name: "user-o" }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.formInput}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "key" }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            containerStyle={styles.formInput}
          />
          <CheckBox
            title="Remember Me"
            center
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={styles.formCheckbox}
          />
          <View style={styles.formButton}>
            <Button
              onPress={() => this.handleRegister()}
              title="Register"
              icon={
                <Icon
                  name="user-plus"
                  type="font-awesome"
                  size={24}
                  color="white"
                />
              }
              buttonStyle={{
                backgroundColor: "#512DA8",
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const Tab = createBottomTabNavigator();

const Login = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "#9575CD",
      inactiveBackgroundColor: "#D1C4E9",
      activeTintColor: "#ffffff",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen
      name="Login"
      component={LoginTab}
      options={{
        tabBarLabel: "Login",
        tabBarIcon: ({ size, color }) => (
          <Icon name="sign-in" type="font-awesome" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Register"
      component={Register}
      options={{
        tabBarLabel: "Register",
        tabBarIcon: ({ size, color }) => (
          <Icon
            name="user-plus"
            type="font-awesome"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  image: {
    margin: 10,
    width: 80,
    height: 60,
  },
  formInput: {
    margin: 10,
  },
  formCheckbox: {
    margin: 10,
    backgroundColor: null,
  },
  formButton: {
    margin: 60,
  },
});

export default Login;
