/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class GoBack extends Component {
  render() {
    return(
      <TouchableOpacity style={{paddingTop:22,
                                paddingLeft:8,
                                paddingRight:20,
                                paddingBottom:20,
                                position:'absolute',
                                top:0,
                                left:0,}}
                        onPress={this.props.goBack}>
        <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}
                allowFontScaling={false}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
