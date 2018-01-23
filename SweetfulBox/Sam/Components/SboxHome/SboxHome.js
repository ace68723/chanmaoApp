/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import SboxAddressAction from '../../Actions/SboxAddressAction';
import SboxAddressStore from '../../Stores/SboxAddressStore';
export default class SboxHome extends Component {
  componentDidMount(){
    SboxAddressAction.getCondoList(10);
    SboxAddressStore.addChangeListener(this._onChange);
  }
  _onChange(){
    

  }
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the SboxHome component</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
