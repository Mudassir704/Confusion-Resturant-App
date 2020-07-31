import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
function Loading(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../Animation/loading.gif")}
        style={{ width: 250, height: 250 }}
      />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingText: {
    color: "#512DA8",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Loading;
