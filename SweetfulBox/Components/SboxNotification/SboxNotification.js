/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Setting from '../../Config/Setting'
import SboxHeader from '../../../App/Components/General/SboxHeader';
export default class SboxNotification extends Component {
  constructor(props)
  {
    super(props);
    this._goBack = this._goBack.bind(this);
    this._goBackCart = this._goBackCart.bind(this);
    this._renderNotification=this._renderNotification.bind(this);
  }
  componentDidMount()
  {

  }

  _goBack() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }

  _goBackCart() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }

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
            <View style={{marginTop:Setting.getY(150)}}>
              <Image source={require('./Img/success.png')}
                     style={{height:Setting.getY(500),width:Setting.getX(270)}}/>
            </View>
            <Text style={{marginTop:Setting.getY(150),fontSize:20,fontWeight:'bold',}}>
              恭喜您
            </Text>
            <View style={{marginTop:Setting.getY(100),width:Setting.getX(1000),height:Setting.getY(200)}}>
              <Text style={{fontSize:16, }}>
                订单支付成功！您可以在两个工作日内收到您的箱子~
              </Text>
            </View>
            <TouchableOpacity onPress={this._goBack}
              style={{marginTop:Setting.getY(70),}}>
              <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ff768b',width:Setting.getX(600),height:Setting.getY(150)}}>
                <Text style={{fontSize:16,color:'white'}}>
                  查看历史订单
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
                  goBack={this._goBackCart}
                  leftButtonText={'x'}/>
          <View style={{
            flex:0.925,
            alignItems:'center',
          }}>
            <View style={{marginTop:Setting.getY(150)}}>
              <Image source={require('./Img/fail.png')}
                     style={{height:Setting.getY(500),width:Setting.getX(270)}}/>
            </View>
            <Text style={{marginTop:Setting.getY(150),fontSize:20,fontWeight:'bold',}}>
              很抱歉
            </Text>
            <View style={{marginTop:Setting.getY(100),width:Setting.getX(1100),height:Setting.getY(200)}}>
              <Text style={{fontSize:16, }}>
                订单支付失败了！请仔细核对您的地址或银行卡信息是否准确，如需人工帮助，请您联系客服，谢谢！
              </Text>
            </View>
            <TouchableOpacity onPress={this._goBackCart}
              style={{marginTop:Setting.getY(70),}}>
              <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ff768b',width:Setting.getX(600),height:Setting.getY(150)}}>
                <Text style={{fontSize:16,color:'white'}}>
                  返回购物箱
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
  },
});
