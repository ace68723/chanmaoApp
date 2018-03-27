/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import AddressForHomeHeader from '../Address/AddressForHomeHeader';
import AddressPromptView from './AddressPromptView';

const {width,height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height*0.4106;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


let headerHeight;
let marginTop;
if(height == 812){
  //min 34
  headerHeight = 88;
  marginTop = 0;
}else{
  headerHeight = 54;
  marginTop = 20;
}

export default class SboxHomeHeader extends Component {

  render() {
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

        {this.props.shouldRenderAddressPrompt && this.props.renderAddressPrompt &&
            <AddressPromptView
              ref='AddressPrompt' onPress={this.props.toggleAddressPrompt} />
        }
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
    marginTop: marginTop,
    flexDirection:'row',
    position:'absolute',
  },
  TriangleShapeCSS: {
    width: 0,
    height: 0,
    left: 70,
    top: -15,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ea7b21'
  }
});
