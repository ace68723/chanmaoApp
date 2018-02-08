/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
const { width,height } = Dimensions.get('window');

export default class SboxCartAlert extends Component {
  constructor() {
    super();
    this._closeSboHomeAlert = this._closeSboHomeAlert.bind(this);
  }
  _closeSboHomeAlert() {
    this.props.navigator.dismissLightBox();
  }
  render() {
    if (Platform.OS==='ios') return (
      <TouchableOpacity style={styles.container} onPress={this._closeSboHomeAlert}>
        <View style={{padding:20,paddingLeft:25,paddingRight:25}}>
          <Text allowFontScaling={false} style={{fontSize:12,fontFamily:'FZZhunYuan-M02S',textAlign:'left',color:'white'}}>
              {this.props.message}
          </Text>
        </View>


      </TouchableOpacity>
    );
    else{
      return(
        <TouchableOpacity style={{
            width:200,
            height:50,
            backgroundColor:'#rgba(0,0,0,0.6)',
          }} onPress={this._closeSboHomeAlert}>
          <View style={{padding:20,paddingLeft:25,paddingRight:25,alignItems:'center',justifyContent:'center'}}>
            <Text allowFontScaling={false} style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',textAlign:'left',color:'white'}}>
                {this.props.message}
            </Text>
          </View>


        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex:0.15,
    backgroundColor:'#rgba(0,0,0,0.6)',
  },
});
