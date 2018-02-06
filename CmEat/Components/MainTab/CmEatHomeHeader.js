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

import {cme_getSelectedAddress} from '../../../App/Modules/Database';

const {width,height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height*0.4106;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default class SboxHomeHeader extends Component {
  constructor(){
    super();
    let addr;
    if(cme_getSelectedAddress()){
      addr = cme_getSelectedAddress().addr.split(",", 1);
    }
    this.state = {
      addr:addr,
    }
  }
  render() {
    // const headerTop = this.props.scrollY.interpolate({
    //   inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
    //   outputRange: [10, 0],
    //   extrapolate: 'clamp',
    // });
    // const headerBackgroud = this.props.scrollY.interpolate({
    //   inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
    //   outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    //   extrapolate: 'clamp',
    // });
    //   <Image source={require('./Images/icon_back_white.png')}
             // style={{
             //         marginLeft:10,
             //         height:height*0.032,
             //         width:height*0.032,}}/>
             //            <Animated.Image source={require('./Images/icon_back.png')}
                       // style={{
                       //         marginTop: -height*0.032,
                       //         marginLeft:10,
                       //         height:height*0.032,
                       //         width:height*0.032,
                       //         opacity:backIconColor,
                       //       }}/>
    const headerTop = this.props.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
      outputRange: [0, 0],
      extrapolate: 'clamp',
    });
    const headerBackgroud = this.props.scrollY.interpolate({
      inputRange: [HEADER_SCROLL_DISTANCE - height*0.0811*2, HEADER_SCROLL_DISTANCE - height*0.081],
      outputRange: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)'],
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
    return (
      <Animated.View style={[styles.container,{top:headerTop,
                                               backgroundColor:headerBackgroud,
                                               borderColor:"#e2e2e4",
                                               borderBottomWidth: 1,}]}>
        <TouchableWithoutFeedback onPress={this.props.handleBackToHome}>
          <View style={{flex:0.17, top:10,justifyContent:'center'}}>
            <Image source={require('./Images/icon_back.png')}
                   style={{
                           marginLeft:10,
                           height:height*0.032,
                           width:height*0.032,}}/>

          </View>
        </TouchableWithoutFeedback>
        <View style={{flex:0.66,top:10,justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:"#000000"}}>
              配送至   {this.state.addr}
          </Text>
        </View>
        <View style={{flex:0.17, alignItems:'center', justifyContent:'center', top:10,}}>
        </View>
      </Animated.View>
    );
  }
}
// <Animated.View style={{alignItems:'center',
//               flexDirection:'row',
//               height:height*0.0443,
//               paddingLeft:10,
//               backgroundColor:'rgba(255,255,255,0.8)',
//               borderWidth:1,
//               borderColor:searchBorderColor,
//               borderRadius:20}}>
//     <Image source={require('./Images/search.png')}
//            style={{height:height*0.032,
//                    width:height*0.032,}}/>
//     <Animated.Text style={{paddingLeft:10,color:fontColor,fontFamily:'FZZhunYuan-M02S'}}>
//       搜索你想找的餐馆
//     </Animated.Text>
// </Animated.View>
const styles = StyleSheet.create({
  container: {
    width:width,
    // height:height*0.0811,
    height:50,
    position:'absolute',
    flexDirection:'row',
  },
});
