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

import Common from '../../Constants/Common'

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
      <View style={{flex:1, alignItems:'center',justifyContent:'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
        <View style={styles.container}>
          <Image
            source={require('./Image/header.png')}
            style={{width:50 ,height:50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 14}}
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
          <View style={{padding:20,paddingLeft:25,paddingRight:25, marginTop: 8}}>
            <Text
              allowFontScaling={false}
              style={{fontSize:13,textAlign:'left', fontFamily:'NotoSans-Regular', fontWeight: '700', textAlign: 'center'}}
            >
                {this.props.message}
            </Text>
          </View>

          <TouchableOpacity
              style={{
                bottom:0,
                width:width*0.7,
                backgroundColor: Common.MAIN_COLOR,
                height:42,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
              }}
            onPress={this._closeSboHomeAlert}>
            <View style={{flex:1,
                          alignItems:'center',
                          justifyContent:'center',
                          }}>
                <Text style={{color:'#ffffff',
                              fontSize:15,
                              fontFamily:'NotoSans-Regular',
                              fontWeight: '900'
                              }}
                      allowFontScaling={false}>
                  取消
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
    borderRadius: 6,
  },
});
