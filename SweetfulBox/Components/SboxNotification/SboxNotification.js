/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Label from '../../../App/Constants/AppLabel';
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
          <SboxHeader title={Label.getSboxLabel('ORDER_SUCCESS')}
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
            <Text style={{marginTop:Setting.getY(150),fontSize:20,fontWeight:'bold',}}
                  allowFontScaling={false}>
              {Label.getSboxLabel('CONGRATS')}
            </Text>
            <View style={{marginTop:Setting.getY(100),width:Setting.getX(1000),height:Setting.getY(200)}}>
              <Text style={{fontSize:16, }}
                    allowFontScaling={false}>
                {Label.getSboxLabel('PAYMENT_SUCCESS')}
              </Text>
            </View>
            <TouchableOpacity onPress={this._goBack}
              style={{marginTop:Setting.getY(70),}}>
              <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ff768b',width:Setting.getX(600),height:Setting.getY(150)}}>
                <Text style={{fontSize:16,color:'white'}}
                      allowFontScaling={false}>
                  {Label.getSboxLabel('HISTORY_ORDER')}
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
          <SboxHeader title={Label.getSboxLabel('ORDER_FAILED')}
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
            <Text style={{marginTop:Setting.getY(150),fontSize:20,fontWeight:'bold',}}
                  allowFontScaling={false}>
              {Label.getSboxLabel('SORRY_MESSAGE')}
            </Text>
            <View style={{marginTop:Setting.getY(100),width:Setting.getX(1100),height:Setting.getY(200)}}>
              <Text style={{fontSize:16, }}
                    allowFontScaling={false}>
                {Label.getSboxLabel('PAYMENT_FAILED')}
              </Text>
            </View>
            <TouchableOpacity onPress={this._goBackCart}
              style={{marginTop:Setting.getY(70),}}>
              <View style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ff768b',width:Setting.getX(600),height:Setting.getY(150)}}>
                <Text style={{fontSize:16,color:'white'}}
                      allowFontScaling={false}>
                  {Label.getSboxLabel('RETURN_TO_CART')}
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
