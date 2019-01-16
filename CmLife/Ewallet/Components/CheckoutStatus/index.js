/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Setting from '../../Config/Setting'
import SboxHeader from '../SboxHeader';
const {width,height} = Dimensions.get('window');
export default class CheckoutStatus extends Component {
  constructor(props)
  {
    super(props);
    // this._goBack = this._goBack.bind(this);
    // this._goBackCart = this._goBackCart.bind(this);
    this._renderNotification=this._renderNotification.bind(this);
    this._goBack = this._goBack.bind(this);
    this._goBackBag = this._goBackBag.bind(this);
  }
  componentDidMount()
  {

  }

  _goBackBag() {
    this.props.navigator.resetTo({
      screen: "EwalletMainTab",
      navigatorStyle: {navBarHidden:true},
    });
    this.props.goToPage();
  }

  _goBack() {
    this.props.navigator.resetTo({
      screen: "EwalletMainTab",
      navigatorStyle: {navBarHidden:true},
    });
  } 
  // _goBackCart() {
  //   this.props.navigator.dismissModal({
  //     animationType: 'slide-down'
  //   });
  // }

  _renderNotification()
  {
    if (this.props.checkoutSuccessful) {
        return (
        <View style={styles.container}>
          <SboxHeader title={"订单成功"}
                  goBack={this._goBack}
                  leftButtonText={'x'}/>
          <View style={{
            flex:0.925,
            alignItems:'center',
          }}>
            <View style={{marginTop:Setting.getY(30)}}>
              <Image source={require('./Img/success.png')}
                     style={{height:Setting.getY(250),width:Setting.getX(135)}}/>
            </View>
            <Text style={{marginTop:Setting.getY(30),fontSize:25,fontWeight:'bold',}}
                  allowFontScaling={false}>
              恭喜您
            </Text>
            <View style={{
              alignItems:'center',marginTop:Setting.getY(50),height:Setting.getY(200),}}>
              <Text style={{flex: 1, paddingHorizontal:Setting.getX(50),flexWrap: 'wrap',fontSize:15.5, color:'grey',textAlign:'center'}}
                    allowFontScaling={false}>
                订单支付成功！您可以在两个工作日内收到您的箱子~
              </Text>
            </View>
            <TouchableOpacity onPress={this._goBackBag}
              style={{marginTop:Setting.getY(30),  }}>
              <View style={{  width:width*0.4251,
                  height:width*0.4251*0.25,
                  marginTop:20,
                  backgroundColor:'black',
                  alignSelf:'center',
                  justifyContent:'center',
                  alignItems:'center',
                  borderRadius:5}}>
                <Text style={{fontSize:16,color:'white'}}
                      allowFontScaling={false}>
                  查看卡包
                </Text>
              </View>

            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <SboxHeader title={"订单失败"}
                  goBack={this._goBack}
                  leftButtonText={'x'}/>
          <View style={{
            flex:0.925,
            alignItems:'center',
          }}>
            <View style={{marginTop:Setting.getY(30)}}>
              <Image source={require('./Img/fail.png')}
                     style={{height:Setting.getY(250),width:Setting.getX(135)}}/>
            </View>
            <Text style={{marginTop:Setting.getY(30),fontSize:25,fontWeight:'bold',}}
                  allowFontScaling={false}>
              很抱歉
            </Text>
            <View style={{
              alignItems:'center',marginTop:Setting.getY(50),height:Setting.getY(200),}}>
              <Text style={{flex: 1, paddingHorizontal:Setting.getX(50),flexWrap: 'wrap',fontSize:15.5, color:'grey',textAlign:'center'}}
                    allowFontScaling={false}>
                订单支付失败了！请仔细核对您的地址或银行卡信息是否准确.~{"\n"}如需人工帮助，请您联系客服，谢谢！
              </Text>
            </View>
            <TouchableOpacity onPress={this._goBack}
              style={{marginTop:Setting.getY(30),  }}>
              <View style={{  width:width*0.4251,
                  height:width*0.4251*0.25,
                  marginTop:20,
                  backgroundColor:'black',
                  alignSelf:'center',
                  justifyContent:'center',
                  alignItems:'center',
                  borderRadius:5}}>
                <Text style={{fontSize:16,color:'white'}}
                      allowFontScaling={false}>
                  返回商城
                </Text>
              </View>

            </TouchableOpacity>
          </View>

        </View>
    );
    }
  }
  render() {

      return (
      <View style={styles.container}>
        {this._renderNotification()}
      </View>
      );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
  },
});
