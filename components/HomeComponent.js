import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated } from "react-native";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import Loading from "./LoadingComponent";
import { Easing } from "react-native-reanimated";

function RenderItem({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  } else {
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubtitle={item.designation}
          image={{ uri: baseUrl + item.image }}
        >
          <Text>{item.description}</Text>
        </Card>
      );
    } else {
      return <View></View>;
    }
  }
}

function HomeComponent(props) {
  const dishes = useSelector((state) => state.dishes);
  const promotions = useSelector((state) => state.promotions);
  const leaders = useSelector((state) => state.leaders);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    animationValue.setValue(0);
    Animated.timing(animationValue, {
      toValue: 8,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => animate());
  };

  const xpos1 = animationValue.interpolate({
    inputRange: [0, 1, 3, 5, 8],
    outputRange: [800, 500, 0, -500, -800],
  });
  const xpos2 = animationValue.interpolate({
    inputRange: [0, 2, 4, 6, 8],
    outputRange: [800, 500, 0, -500, -800],
  });
  const xpos3 = animationValue.interpolate({
    inputRange: [0, 3, 5, 7, 8],
    outputRange: [800, 500, 0, -500, -800],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpos1 }] }}
      >
        <RenderItem
          item={dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={dishes.isLoading}
          errMess={dishes.errMess}
        />
      </Animated.View>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpos2 }] }}
      >
        <RenderItem
          item={leaders.leaders.filter((leader) => leader.featured)[0]}
          isLoading={leaders.isLoading}
          errMess={leaders.errMess}
        />
      </Animated.View>
      <Animated.View
        style={{ width: "100%", transform: [{ translateX: xpos3 }] }}
      >
        <RenderItem
          item={promotions.promotions.filter((promo) => promo.featured)[0]}
          isLoading={promotions.isLoading}
          errMess={promotions.errMess}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", justifyContent: "center" },
});

export default HomeComponent;
