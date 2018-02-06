/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';



const { height, width } = Dimensions.get('window');
export default class CheckoutButton extends Component {

  _renderConfirmBtn() {
      return(
        <View style={{
          position:'absolute',
          bottom:0,
          width:width,}}>
          <TouchableOpacity
              style={{height:60,}}
              onPress={this.props.getOrderBefore}
              activeOpacity={0.4}>
            <View style={{
                          flex:1,
                          alignItems:'center',
                          justifyContent:'center',
                          backgroundColor:'#ff7685',
                        }}>

                <Text style={{
                  color:'#ffffff',
                  fontSize:20,
                  fontFamily:'FZZhunYuan-M02S',
                }}>
                     去结账
                </Text>

            </View>
          </TouchableOpacity>
        </View>
      )
  }
  _renderLoadingBtn() {
    return(
      <View style={{position:'absolute',
                    alignItems:'center',
                    justifyContent:'center',
                    bottom:0,
                    width:width,
                    backgroundColor:'#ff7685',
                    height:60,}}>
          <Image source={require('./Img/Loading_dots_white.gif')} style={{width:45,height:15}}/>
      </View>
    )
  }
  _renderAddAddressBtn() {
      return(
        <TouchableOpacity  style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={this._handleAddAddress}
          activeOpacity={0.4}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{
                color:'#ffffff',
                fontSize:20,
                fontFamily:'FZZhunYuan-M02S',
              }}>
                添加配送地址
              </Text>
          </View>
        </TouchableOpacity>
      )
  }
  _renderAddCardBtn() {
      return(
        <TouchableOpacity  style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={this._handleAddCard}
          activeOpacity={0.4}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{
                color:'#ffffff',
                fontSize:20,
                fontFamily:'FZZhunYuan-M02S',
              }}>
                添加支付方式
              </Text>
          </View>
        </TouchableOpacity>
      )
  }
  _renderCheckoutBtn() {
    return(
      <TouchableOpacity  style={{
                position:'absolute',
                bottom:0,
                width:width,
                height:60,
                backgroundColor:'#ff7685',}}
        onPress={this._doCheckout}
        activeOpacity={0.4}>
        <View style={{flex:1,
                      alignItems:'center',
                      justifyContent:'center',}}>
            <Text style={{
              color:'#ffffff',
              fontSize:20,
              fontFamily:'FZZhunYuan-M02S',
            }}>
              确认下单
            </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderBtn(){
    if(this.props.showCheckoutLoading){
      return this._renderLoadingBtn();
    } else if(this.props.shouldAddAddress) {
      return this._renderAddAddressBtn();
    } else if(!this.props.shouldAddAddress && this.props.shouldAddCard){
      return this._renderAddCardBtn();
    } else if(this.props.startCheckout) {
      return this._renderCheckoutBtn();
    } else {
      return this._renderConfirmBtn();
    }
  }
  render() {
    return (
      <View>
        {this._renderBtn()}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
