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
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 8, backgroundColor: 'black', borderRadius: 8}}>
          <Image
            source={{uri: "http://ronntorossian.com/wp-content/uploads/2018/11/kfc-pr-stunt.png"}}
            style={styles.image}
            >
          </Image>
          <Text style={styles.resName}>开封菜</Text>
        </View>
        <Text style={styles.text}>炸鸡一元爱咋吃咋吃，吃不死你</Text>
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
    height: itemHeight,
    borderRadius: 8,
    opacity: 0.7,
  },
  text: {
    fontSize: 11,
    color: 'grey',
    fontWeight: '900',
    width: itemWidth * 0.9,
  },
  resName: {
    position: 'absolute',
    fontWeight: '900',
    color: 'white',
    fontSize: 15,
  }
});
