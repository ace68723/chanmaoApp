/* @flow */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

export default class Loading extends Component {
  static navigatorStyle = {
      screenBackgroundColor: 'transparent',
      modalPresentationStyle: 'overFullScreen'
  }
  render() {
    const color = this.props.color ? this.props.color :"#ea7b21";
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={color} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
});
