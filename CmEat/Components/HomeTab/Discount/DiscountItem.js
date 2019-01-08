/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

const {height, width} = Dimensions.get('window');


export default class DiscountItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={{uri: "http://ronntorossian.com/wp-content/uploads/2018/11/kfc-pr-stunt.png"}} style={styles.image}>
          </Image>
          <Text></Text>
        </View>
        <Text>炸鸡一元</Text>
      </View>
    )
  }
}
const itemWidth = width / 2.8;
const itemHeight = 80;
const styles = StyleSheet.create({
	container: {
    flex: 1
	},
  image: {
    width: itemWidth - 8,
    height: itemHeight
  }
});
