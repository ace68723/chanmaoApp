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
export default class SboxNotification extends Component {
  constructor(props)
  {
    super(props);
    this.state={
      checkoutSuccessful:true,

    }
    this._renderNotification=this._renderNotification.bind(this);
  }
  componentDidMount()
  {

  }
  _renderNotification()
  {
    if (this.state.checkoutSuccessful) {
        return (
        <View style={styles.container}>
          <View style={{
            flex:0.075,
            alignItems:'center',
            flexDirection:'row',
            borderBottomWidth:1,
            borderBottomColor:'grey',
          }}>
            <Image source={require('./Img/icon-cancel-01.png')}
                   style={{marginLeft:Setting.getX(40),height:Setting.getX(50),width:Setting.getX(50)}}/>
            <Text style={{marginLeft:Setting.getX(435),fontSize:16,fontWeight:'bold',}}>
              订单成功
            </Text>
          </View>
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
            <TouchableOpacity style={{marginTop:Setting.getY(70),}}>
              <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ff768b',width:Setting.getX(600),height:Setting.getY(150)}}>
                <Text style={{fontSize:16,color:'white'}}>
                  返回首页
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
          <View style={{
            flex:0.075,
            alignItems:'center',
            flexDirection:'row',
            borderBottomWidth:1,
            borderBottomColor:'grey',
          }}>
            <Image source={require('./Img/icon-cancel-01.png')}
                   style={{marginLeft:Setting.getX(40),height:Setting.getX(50),width:Setting.getX(50)}}/>
            <Text style={{marginLeft:Setting.getX(435),fontSize:16,fontWeight:'bold',}}>
              订单失败
            </Text>
          </View>
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
            <TouchableOpacity style={{marginTop:Setting.getY(70),}}>
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
