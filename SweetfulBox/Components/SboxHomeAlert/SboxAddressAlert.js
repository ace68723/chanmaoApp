/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const { width,height } = Dimensions.get('window');

export default class SboxAddressAlert extends Component {
  constructor() {
    super();
    this._closeSboHomeAlert = this._closeSboHomeAlert.bind(this);
  }
  _closeSboHomeAlert() {
    this.props.navigator.dismissLightBox();
  }
  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this._closeSboHomeAlert}>
        <View style={{padding:20,paddingLeft:25,paddingRight:25,}}>
          <Text allowFontScaling={false} style={{fontSize:12,fontFamily:'FZZhunYuan-M02S',textAlign:'left', color:'white'}}>
              {this.props.message}
          </Text>
        </View>


      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#rgba(0,0,0,0.6)',
  },
});
