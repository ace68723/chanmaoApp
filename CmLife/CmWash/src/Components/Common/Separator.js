import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class Seperator extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ borderBottomColor: '#999999', borderBottomWidth: 0.8, }} />
    )
  }
}
