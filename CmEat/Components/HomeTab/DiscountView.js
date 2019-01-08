/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  Platform,
  ScrollView,
  StyleSheet,
  ViewPagerAndroid,
} from 'react-native';

const {height, width} = Dimensions.get('window');


export default class DiscountView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>123</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
    width: width,
    height: 140,
	}
});
