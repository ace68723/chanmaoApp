import React, { Component } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList
} from "react-native";

import { GetUserInfo } from "../../Modules/Database";
import moment from "moment";

const { height, width } = Dimensions.get("window");

class RedeemableItemsList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3"
  },
  cellStyle: {
    height: 48
  }
});

module.exports = RedeemableItemsList;
