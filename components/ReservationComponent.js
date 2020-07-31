import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Picker,
  Switch,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import Moment from "moment";
import * as Animatable from "react-native-animatable";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import * as Calendar from "expo-calendar";

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: new Date(),
      show: false,
      mode: "date",
    };
  }
  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: new Date(),
      show: false,
      mode: "date",
    });
  }
  static navigationOptions = {
    title: "Reserve Table",
  };

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== "granted") {
        Alert.alert("Permission Not granted for Notification");
      }
    }
    return permission;
  }

  async obtainCalendarPermission() {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if (permission.status !== "granted") {
        Alert.alert("Permission Not granted for Notification");
      }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentNotificationAsync({
      title: "Your Reservation",
      body: "Reservation for " + date + " Requested",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibration: true,
        color: "#512DA8",
      },
    });
  }

  async addReservationtoCalendar(date) {
    await this.obtainCalendarPermission();
    const startDate = new Date(Date.parse(date));
    const endDate = new Date(Date.parse(date) + 2 * 60 * 60 * 1000);
    Calendar.createEventAsync(Calendar.DEFAULT, {
      title: "Con Fusion Table Reservation",
      location:
        "121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong",
      startDate,
      endDate,
      timeZone: "Asia/Hong_Kong",
    });
    Alert.alert("Reservation has been added to your calendar");
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    Alert.alert(
      "Your Reservation OK?",
      "Number of guests: " +
        this.state.guests +
        "\nSmoking: " +
        (this.state.smoking ? "yes\n" : "no\n") +
        "Date and Time" +
        Moment(this.state.date).format("DD-MMM-YYYY h:mm A"),
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed");
            this.resetForm();
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.presentLocalNotification(this.state.date);
            this.addReservationtoCalendar(this.state.date);
            this.resetForm();
          },
        },
      ],
      { cancelable: false }
    );
  }
  // handleReservation() {
  //   console.log(JSON.stringify(this.state));
  //   this.setState({
  //     guests: 1,
  //     smoking: false,
  //     date: new Date(),
  //     show: false,
  //     mode: "date",
  //   });
  // }

  render() {
    return (
      <Animatable.View animation="zoomIn">
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker
            style={styles.formItem}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ guests: itemValue })
            }
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
          <Switch
            style={styles.formItem}
            value={this.state.smoking}
            thumbColor="#512DA8"
            onValueChange={(value) => this.setState({ smoking: value })}
          ></Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <TouchableOpacity
            style={styles.formItem}
            style={{
              // padding: 15,
              borderColor: "#512DA8",
              // borderWidth: 2,
              flexDirection: "row",
              // margin: 100,
              width: 25,
              height: 25,
            }}
            onPress={() => this.setState({ show: true, mode: "date" })}
          >
            <Icon type="font-awesome" name="calendar" color="#512DA8" />
          </TouchableOpacity>
          <Text style={{ flexDirection: "column" }}>
            {" " + Moment(this.state.date).format("DD-MMM-YYYY h:mm A")}
          </Text>
          {/* Date Time Picker */}
          {this.state.show && (
            <DateTimePicker
              value={this.state.date}
              mode={this.state.mode}
              minimumDate={new Date()}
              minuteInterval={30}
              onChange={(event, date) => {
                if (date === undefined) {
                  this.setState({ show: false });
                } else {
                  this.setState({
                    show: this.state.mode === "time" ? false : true,
                    mode: "time",
                    date: new Date(date),
                  });
                }
              }}
            />
          )}
        </View>
        <View style={styles.formRow}>
          <Button
            onPress={() => this.handleReservation()}
            title="Reserve"
            color="#512DA8"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 30,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#512DA8",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

export default Reservation;
