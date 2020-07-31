import React, { useState, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Modal,
  Button,
  Alert,
  PanResponder,
  Share,
} from "react-native";
import { Card, Icon, Rating, Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postfavroite, postComment } from "../redux/ActionCreators";
import * as Animatable from "react-native-animatable";

const RenderDish = ({ dish, favroite, onPress, onPressEdit }) => {
  const handleViewRef = useRef(null);

  const recognizeDrag = ({ dx }) => {
    if (dx > 200) return true;
    else return false;
  };
  const recognizeComment = ({ dx }) => {
    if (dx < -200) return true;
    else return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState))
        Alert.alert(
          "Add Favorite",
          "Are you sure you wish to add " + dish.name + " to favorite?",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => {
                favroite ? console.log("Already favorite") : onPress();
              },
            },
          ],
          { cancelable: false }
        );
      else if (recognizeComment(gestureState)) onPressEdit();

      return true;
    },
    onPanResponderGrant: () => {
      handleViewRef.current
        .fadeIn(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "cancelled")
        );
    },
  });

  const onShare = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: title + ": " + message + " " + url,
        url: url,
      },
      {
        dialogTitle: "Share " + title,
      }
    );
  };

  if (dish !== null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text>{dish.description}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Icon
              raised
              reverse
              color="orange"
              name={favroite ? "heart" : "heart-o"}
              type="font-awesome"
              size={25}
              onPress={favroite ? console.log("Ok") : onPress}
            />
            <Icon
              raised
              reverse
              color="#512DA8"
              name="pencil"
              type="font-awesome"
              size={25}
              onPress={onPressEdit}
            />
            <Icon
              raised
              reverse
              color="lightblue"
              name="share"
              type="font-awesome"
              size={25}
              onPress={() =>
                onShare(dish.name, dish.description, baseUrl + dish.image)
              }
            />
          </View>
        </Card>
      </Animatable.View>
    );
  } else {
    return <View></View>;
  }
};

const RenderComment = ({ comment }) => {
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        {comment.map((item) => {
          return (
            <View key={item.id} style={{ margin: 10 }}>
              <Text style={{ fontSize: 14 }}>{item.comment}</Text>
              <Text style={{ fontSize: 12 }}>{item.rating} Star</Text>
              <Text style={{ fontSize: 12 }}>
                {"-- " + item.author + ", " + item.date}
              </Text>
            </View>
          );
        })}
      </Card>
    </Animatable.View>
  );
};

function DishDetailComponent({ route }) {
  const [rating, setRating] = useState(null);
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");

  const dishes = useSelector((state) => state.dishes.dishes);
  const comments = useSelector((state) => state.comments.comments);
  const favroite = useSelector((state) => state.favrouites);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  const handleAuthorInput = (author) => {
    setAuthor(author);
  };

  const handleCommentInput = (comment) => {
    setComment(comment);
  };

  const resetForm = () => {
    setRating(null);
    setAuthor("");
    setComment("");
    setShowModal(false);
  };

  const dispatch = useDispatch();

  const markFav = (dishId) => {
    dispatch(postfavroite(dishId));
  };
  const handleComment = () => {
    const dishId = route.params.dishId;
    console.log(rating);
    toggleModal();
    dispatch(postComment(dishId, rating, author, comment));
  };

  const dishId = route.params.dishId;
  return (
    <ScrollView style={styles.container}>
      <RenderDish
        dish={dishes[dishId]}
        favroite={favroite.some((el) => el === dishId)}
        onPress={() => markFav(dishId)}
        onPressEdit={toggleModal}
      />
      <RenderComment
        comment={comments.filter((comment) => comment.dishId === dishId)}
      />
      <Modal
        animationType={"slide"}
        onDismiss={toggleModal}
        visible={showModal}
        onRequestClose={toggleModal}
      >
        <View style={styles.modal}>
          <Rating
            type="star"
            startingValue={5}
            imageSize={40}
            showRating
            style={{ paddingVertical: 10 }}
            onFinishRating={ratingCompleted}
          />
          <Input
            placeholder="Author"
            leftIcon={<Icon name="user" type="font-awesome-5" />}
            onChangeText={handleAuthorInput}
          />
          <Input
            placeholder="Comment"
            leftIcon={<Icon name="comment" type="font-awesome-5" />}
            onChangeText={handleCommentInput}
          />
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                handleComment();
                resetForm();
              }}
              color="#512DA8"
              title="Submit"
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                toggleModal();
                resetForm();
              }}
              color="grey"
              title="Close"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DishDetailComponent;
