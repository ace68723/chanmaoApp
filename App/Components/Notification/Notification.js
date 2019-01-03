/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class Notification extends Component {
  render() {
    return (
      <View style={[styles.container,{backgroundColor: this.props.backgroundColor,}]}>
        <Text style={styles.title}
              allowFontScaling={false}>
              {this.props.title}
        </Text>
        <Text style={styles.content}
              allowFontScaling={false}>
              {this.props.content}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    padding: 16,
    width:width,
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    color:'white',
    fontFamily:'NotoSans-Regular',
  },
  content: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    color:'white',
    fontFamily:'NotoSans-Regular',
  },
});
