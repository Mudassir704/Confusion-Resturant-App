import React from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Tile } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

function MenuComponent({ navigation }) {
  const dishes = useSelector((state) => state.dishes);

  const renderMenuItem = ({ item, index }) => {
    return (
      <Animatable.View
        style={{ marginBottom: 10 }}
        animation="fadeInRightBig"
        duration={2000}
      >
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigation.navigate("DishDetail", { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Animatable.View>
    );
  };
  if (dishes.isLoading) {
    return <Loading />;
  } else if (dishes.errMess) {
    return (
      <View>
        <Text>{dishes.errMess}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={dishes.dishes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMenuItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default MenuComponent;
