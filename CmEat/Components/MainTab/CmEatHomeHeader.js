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

import AddressForHomeHeader from '../Address/AddressForHomeHeader';

const {width,height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height*0.4106;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


let headerHeight;
if(height == 812){
  //min 34
  headerHeight = 88;
}else{
  headerHeight = 54;
}

export default class SboxHomeHeader extends Component {

  render() {
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
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.handleBackToHome}>
          <View style={{flex:0.17, }}>
            <Image source={require('./Images/icon_back.png')}
                   style={{
                           position:'absolute',
                           left:10,
                           bottom:10,
                           height:20,
                           width:20,}}/>

          </View>
        </TouchableWithoutFeedback>
        <View style={{flex:0.66,justifyContent:'center',alignItems:'center'}}>
          <AddressForHomeHeader
            handleBackToHome={this.props.handleBackToHome}
            toggleAddressPrompt={this.props.toggleAddressPrompt}
            />
        </View>
        
      </View>
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
    height:headerHeight,
    backgroundColor:"#ffffff",
    position:'absolute',
    flexDirection:'row',
  },
});
