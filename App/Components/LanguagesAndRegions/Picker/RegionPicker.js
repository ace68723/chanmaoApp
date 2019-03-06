/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';

const {height, width} = Dimensions.get('window');
export default class RegionPicker extends Component {
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity onPress={this.props.pressButton}>
        <View style={[this.props.buttonStyle, styles.container]}>

          <Text style={{marginLeft:15,fontFamily: 'NotoSans-Black',fontSize: 18, color:'black', fontWeight: '600'}} >{this.props.getRegion()}</Text>
          <Image style={{height:10, width: 20,right:5,position:'absolute'}} source={require('../image/login_language_btn_open.png')} />

        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:0.5*width,
    height:40,
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'white',
  },
});
