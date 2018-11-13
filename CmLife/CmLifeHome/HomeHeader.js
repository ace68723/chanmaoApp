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
export default class HomeHeader extends Component {
  render() {
    return (
      <View style={{ top: 10, width: width, height: 68, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <TouchableWithoutFeedback onPress={this.props.goBack}>
          <View style={{ flex: 1, justifyContent: 'flex-start', }}>
            <Image source={require('./Image/icon_back_green.png')} style={{ marginLeft: 12, width: 26, height: 26 }}/>
          </View>
        </TouchableWithoutFeedback>
        <Text style={{ flex: 1, textAlign: 'center', fontWeight: '800', fontSize: 16, }}>
          馋猫干洗
        </Text>
        <View style={{flex: 1}}>
        </View>
      </View>
    );
  }
}
//箱子
// <View style={{flex:0.17, alignItems:'center', justifyContent:'center', top:10,}}>
//   <Image source={require('./Image/box.png')}
//          style={{height: width * 0.091,
//                  width: width * 0.091,}}/>
//    <Text style={{fontSize:10, backgroundColor:'rgba(0,0,0,0)', position:'absolute', fontFamily:'NotoSansCJKsc-Regular'}}>
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
//     <Animated.Text style={{paddingLeft:10,color:fontColor,fontFamily:'NotoSansCJKsc-Regular'}}>
//       搜索你想找的零食
//     </Animated.Text>
// </Animated.View>
const styles = StyleSheet.create({
  container: {
    width:width,
    height:70,
    // marginTop:10,
    flexDirection:'row',
  },
});
