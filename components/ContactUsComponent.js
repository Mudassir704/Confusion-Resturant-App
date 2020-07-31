import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, Icon, Button } from "react-native-elements";
import * as Animatable from "react-native-animatable";
import * as MailComposer from "expo-mail-composer";

function ContactUsComponent(props) {
  const sendMail = () => {
    MailComposer.composeAsync({
      recipients: ["confusion@food.net"],
      subject: "Enquiry",
      body: "To whom it may concern:",
    });
  };

  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <View style={styles.container}>
        <Card title="Contact Information" containerStyle={{ borderRadius: 15 }}>
          <Text>121, Clear Water Bay Road{"\n"}</Text>
          <Text>Clear Water Bay, Kowloon{"\n"}</Text>
          <Text>HONG KONG{"\n"}</Text>
          <Text>Tel: +852 1234 5678{"\n"}</Text>
          <Text>Fax: +852 8765 4321{"\n"}</Text>
          <Text>Email:confusion@food.net{"\n"}</Text>
        </Card>
        <Button
          title="Send Email"
          buttonStyle={{
            backgroundColor: "#512DA8",
            margin: 15,
            borderRadius: 15,
          }}
          icon={<Icon name="envelope" type="font-awesome" color="white" />}
          onPress={sendMail}
        />
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
});

export default ContactUsComponent;
