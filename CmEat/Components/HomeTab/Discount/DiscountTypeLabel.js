/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {height, width} = Dimensions.get('window');


export default class DiscountTypeLabel extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={this.props.selected ? styles.selectedText : styles.text}>一元特价</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
    width: width / 5,
	},
  text: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '900',
    color: "#4398DC",
    borderColor:'#4398DC',
    borderWidth: 1.5,
    padding: 6,
    borderRadius: 6,
  },
  selectedText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '900',
    backgroundColor: '#4398DC',
    overflow: 'hidden',
    color: "white",
    borderColor:'#4398DC',
    borderWidth: 1.5,
    padding: 6,
    borderRadius: 6,
  }
});
