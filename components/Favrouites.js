import React from "react";
import { View, StyleSheet, Text, FlatList, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import Swipeout from "react-native-swipeout";
import { deletefavrouite } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";
import Loading from "./LoadingComponent";

function Favrouites({ navigation }) {
  const dishes = useSelector((state) => state.dishes);
  const favrouites = useSelector((state) => state.favrouites);
  const dispatch = useDispatch();

  const renderfavrouite = ({ item, index }) => {
    const rightButton = [
      {
        text: "Delete",
        type: "delete",
        onPress: () => {
          Alert.alert(
            "Delete Favrouite",
            "Are you wish to Delete the favrouite dish " + item.name + "?",
            [
              {
                text: "Cancel",
                onPress: () => console.log(item.name + "Not Delete"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => dispatch(deletefavrouite(item.id)),
              },
            ],
            { cancelable: false }
          );
        },
        backgroundColor: "#512DA8",
      },
    ];

    return (
      <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
        <Swipeout right={rightButton} autoClose={true}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            onPress={() =>
              navigation.navigate("DishDetail", { dishId: item.id })
            }
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
        </Swipeout>
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
          data={dishes.dishes.filter((dish) =>
            favrouites.some((el) => el === dish.id)
          )}
          renderItem={renderfavrouite}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default Favrouites;
