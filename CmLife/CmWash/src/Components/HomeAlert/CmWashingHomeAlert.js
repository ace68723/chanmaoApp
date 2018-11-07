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

export default class CmWashingHomeAlert extends Component {
  static navigatorStyle = {
      screenBackgroundColor: 'transparent',
      modalPresentationStyle: 'overFullScreen'
  }
  constructor() {
    super();
    this._closeSboHomeAlert = this._closeSboHomeAlert.bind(this);
  }
  _closeSboHomeAlert() {
    this.props.navigator.dismissModal();
  }
  render() {
    return (
      <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
        <View style={styles.container}>
          <Image source={require('./Image/popup.png')}
                 style={{width:width*0.7,height:width*0.7/4}}
          />
          <View style={{
            paddingTop:20,
            width:width*0.7,
            height:width*0.55,
            alignItems:'center',
            justifyContent:'center',
          }}>
            <Image source={require('./Image/Deliveryzone.png')}
                   style={{width:width*0.6,height:width*0.55}}
            />
          </View>
          <View style={{padding:20,paddingLeft:25,paddingRight:25,}}>
            <Text allowFontScaling={false} style={{fontSize:12,textAlign:'left'}}>
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
                <Text style={{color:'#ffffff',
                              fontSize:18,
                              }}
                      allowFontScaling={false}>
                  确认
                </Text>
            </View>
          </TouchableOpacity>
        </View>
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
