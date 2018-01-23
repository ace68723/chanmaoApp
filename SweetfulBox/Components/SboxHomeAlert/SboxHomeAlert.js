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

export default class SboxHomeAlert extends Component {
  constructor() {
    super();
    this._closeSboHomeAlert = this._closeSboHomeAlert.bind(this);
  }
  _closeSboHomeAlert() {
    this.props.navigator.dismissLightBox();
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./Image/header.png')}
               style={{width:width*0.7,height:width*0.7/1.76}}
        />
        <View style={{padding:20,paddingLeft:25,paddingRight:25,}}>
          <Text allowFontScaling={false} style={{fontSize:14,fontFamily:'FZZhunYuan-M02S',textAlign:'left'}}>
              {this.props.message}
          </Text>
        </View>

        <TouchableOpacity
            style={{
              bottom:0,
              width:width*0.7,
              backgroundColor:'#ff7685',
              height:45,}}
          onPress={this._closeSboHomeAlert}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',
                        }}>
              <Text style={{
                color:'#ffffff',
                fontSize:18,
                fontFamily:'FZZhunYuan-M02S',
              }}>
                确认
              </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:width*0.7,
    backgroundColor:'#ffffff',
  },
});
