import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, ListItem } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { useSelector } from "react-redux";
import Loading from "./LoadingComponent";
import * as Animatable from "react-native-animatable";

function AboutUsComponent(props) {
  // const [leaders] = useState(LEADERS);
  const History = () => (
    <Card title="Our History">
      <Text>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.{"\n"}
        {"\n"}
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );

  const leaders = useSelector((state) => state.leaders);
  //console.log(leaders);
  if (leaders.isLoading) {
    return (
      <ScrollView>
        <History />
        <Card title="Corporate LeaderShip">
          <Loading />
        </Card>
      </ScrollView>
    );
  } else if (leaders.errMess) {
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <History />
          <Card title="Corporate LeaderShip">
            <Text>{leaders.errMess}</Text>
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <History />
          <Card title="Corporate LeaderShip">
            {leaders.leaders.map((leader) => {
              return (
                <ListItem
                  key={leader.id}
                  title={leader.name}
                  subtitle={leader.description}
                  hideChevron={true}
                  leftAvatar={{ source: { uri: baseUrl + leader.image } }}
                />
              );
            })}
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default AboutUsComponent;
