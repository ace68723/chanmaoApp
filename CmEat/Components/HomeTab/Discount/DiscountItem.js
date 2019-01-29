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
            source={{uri: this.props.data.image_url}}
            style={styles.image}
            >
          </Image>
          <Text style={styles.resName}>{this.props.data.theme_name}</Text>
        </View>
        <Text style={styles.text}>{this.props.data.description}</Text>
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
