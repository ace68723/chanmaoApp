/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import BaseComponent from '../Common/BaseComponent'

const {width,height} = Dimensions.get('window');

export default class HomeHeader extends BaseComponent {
  render() {
    return (
      <View style={{ top: 10, width: width, height: 64 + this.mSafeZoneHeight, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <TouchableWithoutFeedback onPress={this.props.goBack}>
          <View style={{ flex: 1, justifyContent: 'flex-start', }}>
            <Image source={require('./Image/icon_back_green.png')} style={{ marginLeft: 12, width: 26, height: 26 }}/>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{ flex: 1, textAlign: 'center', fontWeight: '800', fontSize: 16, }}>
          馋猫生活
        </Text>
        <View style={{flex: 1}}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:width,
    height:70,
    flexDirection:'row',
  },
});
