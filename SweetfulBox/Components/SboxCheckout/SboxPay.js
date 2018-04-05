/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  View,
  Text,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBarManager,
  TouchableWithoutFeedback,
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;
// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height-STATUSBAR_HEIGHT;

const {width,height} = Dimensions.get('window');
export default class SboxCheckout extends Component {
  constructor() {
    super()
    this.state = {
      ViewHeight:new Animated.Value(60),
      isPayBtnRender:true,
    };
    this._handlePayBtn = this._handlePayBtn.bind(this);
  }

  _handlePayBtn(){
      Animated.parallel([
        Animated.timing(this.state.ViewHeight, {
          toValue: height*0.4429,
          duration: 500,
        }),
      ]).start();
      setTimeout(() => {
        this.setState({
          isPayBtnRender:false
        })
      }, 500);
  }
  _renderPayBtn() {
    if(!this.state.isPayBtnRender) return
      const payBtnOpacity = this.state.ViewHeight.interpolate({
        inputRange: [60,height*0.4429],
        outputRange:[1,0]
      })
      return(
        <TouchableWithoutFeedback onPress={this._handlePayBtn}>
            <Animated.View style={{
              width:width,
              height:60,
              alignItems:'center',
              justifyContent:'center',
              opacity:payBtnOpacity,
              position:'absolute'
            }}>
              <Text style={{color:'#ffffff',
                            fontSize:20,
                            fontFamily:'FZZhunYuan-M02S'}}
                    allowFontScaling={false}>
                支付 $52.36
              </Text>
            </Animated.View>
        </TouchableWithoutFeedback>
      )
  }
  _renderSelect() {
    const selectOpacity = this.state.ViewHeight.interpolate({
      inputRange: [60,height*0.4429*0.6,height*0.4429],
      outputRange:[0,0.2,1]
    })
    return(
      <Animated.View style={{
        width:width,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        opacity:selectOpacity,
      }}>
        <Text style={{color:'#000000',
                      fontSize:20,
                      fontFamily:'FZZhunYuan-M02S'}}
              allowFontScaling={false}>
           SELECT CARD TO PAY
        </Text>
      </Animated.View>
    )
  }
  _renderCard() {
    return(
      <View style={{
        width:width,
      }}>
        <Image source={require('./Img/card.png')}
               style={{
                 width:width*0.6763,
                 height:width*0.6763*0.669,
               }}
        />
      </View>

    )
  }
  _renderCardList() {
    return(
      <ScrollView horizontal pagingEnabled>
        {this._renderCard()}
        {this._renderCard()}
        {this._renderCard()}
        {this._renderCard()}
      </ScrollView>
    )
  }
  render() {
    const viewBackgroundColor = this.state.ViewHeight.interpolate({
      inputRange: [60,height*0.4429],
      outputRange:['rgb(255,118,133)','rgb(230,231,232)']
    })
    return (
        <Animated.View style={{
                    position:'absolute',
                    bottom:0,
                    width:width,
                    backgroundColor: viewBackgroundColor,
                    height:this.state.ViewHeight,
                  }}>
          {this._renderSelect()}
          {this._renderPayBtn()}
          {this._renderCardList()}

        </Animated.View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
