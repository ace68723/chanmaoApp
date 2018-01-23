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

const {width,height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = width*0.4831*1.3699;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class SboxHomeHeader extends Component {
  render() {
    const headerTop = this.props.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
      outputRange: [10, 0],
      extrapolate: 'clamp',
    });
    const headerBackgroud = this.props.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
      extrapolate: 'clamp',
    });
    const searchBorderColor = this.props.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
      outputRange: ['rgba(255, 255, 255, 0)', '#848689'],
      extrapolate: 'clamp',
    });
    const fontColor = this.props.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
      outputRange: ['#414042', '#808080'],
      extrapolate: 'clamp',
    });
    const backIconColor = this.props.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    // <Animated.View style={{ backgroundColor:'white',
    //                position:'absolute',
    //                top:0,
    //                left:0,
    //                right:0,
    //                bottom:0,
    //                opacity:headerBackgroud
    //              }}/>
    return (
      <Animated.View style={[styles.container,{top:headerTop, backgroundColor:headerBackgroud}]}>
        <TouchableWithoutFeedback onPress={this.props.backToHome}>
          <View style={{flex:0.17, top:10,justifyContent:'center'}}>
            <Image source={require('./Image/icon_back_white.png')}
                   style={{
                           marginLeft:10,
                           height:height*0.032,
                           width:height*0.032,}}/>
             <Animated.Image source={require('./Image/icon_back.png')}
                    style={{
                            marginTop: -height*0.032,
                            marginLeft:10,
                            height:height*0.032,
                            width:height*0.032,
                            opacity:backIconColor,
                          }}/>
          </View>
        </TouchableWithoutFeedback>
        <View style={{flex:0.66,top:10,justifyContent:'center'}}>

        </View>

      </Animated.View>
    );
  }
}
//箱子
// <View style={{flex:0.17, alignItems:'center', justifyContent:'center', top:10,}}>
//   <Image source={require('./Image/box.png')}
//          style={{height: width * 0.091,
//                  width: width * 0.091,}}/>
//    <Text style={{fontSize:10, backgroundColor:'rgba(0,0,0,0)', position:'absolute', fontFamily:'FZZhunYuan-M02S'}}>
//     0/99
//    </Text>
// </View>
// 搜索
// <Animated.View style={{alignItems:'center',
//               flexDirection:'row',
//               height:height*0.0443,
//               paddingLeft:10,
//               backgroundColor:'rgba(255,255,255,0.8)',
//               borderWidth:1,
//               borderColor:searchBorderColor,
//               borderRadius:20}}>
//     <Image source={require('./Image/search.png')}
//            style={{height:height*0.032,
//                    width:height*0.032,}}/>
//     <Animated.Text style={{paddingLeft:10,color:fontColor,fontFamily:'FZZhunYuan-M02S'}}>
//       搜索你想找的零食
//     </Animated.Text>
// </Animated.View>
const styles = StyleSheet.create({
  container: {
    width:width,
    height:height*0.0811,
    position:'absolute',
    flexDirection:'row',
  },
});
