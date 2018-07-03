/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  View,
  Text,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CheckoutAction from '../../Actions/CheckoutAction';
// import SboxHeader from '../../../App/Components/General/SboxHeader';
import Header from '../General/Header';
import CMLabel from '../../Constants/AppLabel';
const { height, width } = Dimensions.get('window');

export default class ChooseCardType extends Component {

  constructor(){
    super()
    this.state = {};
    this._goBack = this._goBack.bind(this);
    this._goToPreviousCard = this._goToPreviousCard.bind(this);
    this._goToCredit = this._goToCredit.bind(this);
    this._goToAliPay = this._goToAliPay.bind(this);
    this._goToApplePay = this._goToApplePay.bind(this);
    this._goToCash = this._goToCash.bind(this);
    this._goToDebit = this._goToDebit.bind(this);
    this._stripeCardAdded = this._stripeCardAdded.bind(this);
    this._renderGoBackBtn = this._renderGoBackBtn.bind(this);
    this._renderButton = this._renderButton.bind(this);

  }

  _goBack() {
    this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
  }

  _getVisaFee(available_payment_channels, target_channel){
      let visa_fee = 0;
      for (let payment_channel of available_payment_channels) {
        if (payment_channel.channel == target_channel) {
          visa_fee = payment_channel.visa_fee;
        }
      }
      return visa_fee;
  }

  _goToPreviousCard() {
    if (this.props.flag == 'fromCheckout') {
      this.props.previousCardSelected(this.props.orderInfo);
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
    }
    else if (this.props.flag == 'fromHistory') {
      const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 1);
      let payment_description = '刷卡将会有'+ visa_fee +'加币的手续费哦亲~';
      if (visa_fee == 0) {
        payment_description = '';
      }
      Alert.alert(
        '确认刷卡支付?',
        payment_description,
        [
          {text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
          {text: '确认', onPress: () => {
              this.props.stripeCardSelected(this.props.orderInfo, visa_fee);
              this.props.navigator.dismissModal({
                animationType: 'slide-down'
              });
            }
          },
       ]
      );
    }
  }

  _goToCredit() {
    this.props.navigator.push({
        screen: "CmAddCard",
        navigatorStyle: {navBarHidden:true},
        passProps:{
          title:"添加信用卡",
          stripeCardAdded: this._stripeCardAdded
        }
      });
  }

  _goToDebit() {
    this.props.navigator.push({
        screen: "CmAddCard",
        navigatorStyle: {navBarHidden:true},
        passProps:{
          title:"添加 Debit Card",
          stripeCardAdded: this._stripeCardAdded
        }
      });
  }

  _goToAliPay() {
    if (this.props.flag == 'fromCheckout') {
      this.props.alipaySelected();
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
    }
    else if (this.props.flag == 'fromHistory') {
      const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 10);
      let payment_description = '支付宝将会有'+ visa_fee +'加币的手续费哦亲~';
      if (visa_fee == 0) {
        payment_description = '';
      }
      Alert.alert(
        '确认支付?',
        payment_description,
        [
          {text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
          {text: '确认', onPress: () => {
              this.props.alipaySelected(this.props.orderInfo, visa_fee);
              this.props.navigator.dismissModal({
                animationType: 'slide-down'
              });
            }
          },
       ]
      );
    }
  }

  _goToCash() {
    if (this.props.flag == 'fromCheckout') {
      this.props.cashSelected();
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
    }
    else if (this.props.flag == 'fromHistory') {
      Alert.alert(
        '确认修改为到付?',
        '',
        [
          {text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
          {text: '确认', onPress: () => {
              this.props.cashSelected(this.props.orderInfo);
              this.props.navigator.dismissModal({
                animationType: 'slide-down'
              });
              alert("已成功修改");
            }
          },
       ]
      );
    }
  }
  _goToApplePay(){
    if (this.props.flag == 'fromCheckout') {
      this.props.applePaySelected();
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
    }
    else if (this.props.flag == 'fromHistory') {
      const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 30);
      let payment_description = '刷卡将会有'+ visa_fee +'加币的手续费哦亲~';
      if (visa_fee == 0) {
        payment_description = '';
      }
      Alert.alert(
        '确认支付?',
        payment_description,
        [
          {text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
          {text: '确认', onPress: () => {
              this.props.applePaySelected(this.props.orderInfo, visa_fee);
              this.props.navigator.dismissModal({
                animationType: 'slide-down'
              });
            }
          },
       ]
      );
    }
  }

  _stripeCardAdded() {
    if (this.props.flag == 'fromCheckout') {
      this.props.stripeCardAdded();
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
    }
    else if (this.props.flag == 'fromHistory') {
      const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 30);
      let payment_description = '刷卡将会有'+ visa_fee +'加币的手续费哦亲~';
      if (visa_fee == 0) {
        payment_description = '';
      }
      Alert.alert(
        '新卡添加成功,确认支付?',
        payment_description,
        [
          {text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
          {text: '确认', onPress: () => {
              this.props.stripeCardSelected(this.props.orderInfo, visa_fee);
              this.props.navigator.dismissModal({
                animationType: 'slide-down'
              });
            }
          },
       ]
      );
    }
  }
  _renderGoBackBtn() {
    // dismissAllModals bug
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
    setTimeout( () => {
      this.props.navigator.dismissModal({
        animationType: 'none'
      });
    }, 600);
  }
  _renderButton() {
    let buttonList = [];
    for (var i = 0; i < this.state.settingButtonList.length; i++) {
      const data = this.state.settingButtonList[i];
      const name = data.name;
      const image = data.image;
      buttonList.push(
        <TouchableOpacity
          key={'buttonlist' + i}
          activeOpacity={0.6}
          style={styles.box}
          onPress={()=>{}}
          >
            <Text allowFontScaling={false} style={styles.box_text}>{name}</Text>
        </TouchableOpacity>
      )
    }
    return buttonList
  }
  render() {
    const previousVisa = () => {
      let _previousVisa = [];
      if (this.props.cusid && this.props.cusid.length > 0) {
        let icon_url = "";
        if (this.props.brand == "Visa") {
          icon_url = require('./Img/visa_master_icon.png');
        }
        else {
          icon_url = require('./Img/visa_debit_icon.png');
        }
        _previousVisa.push(
          <Text key={"previousCardHeader"}
                style={{padding: 10,
                        fontSize: 16,
                        color: "#808080",
                        fontFamily:'FZZhunYuan-M02S'}}
                allowFontScaling={false}>最近使用</Text>
        )
        _previousVisa.push(
          <TouchableOpacity onPress={this._goToPreviousCard}
              key={"previousCard"}
              activeOpacity={0.4}
              style={{flexDirection: 'row',
                      height: 59,
                      alignItems: 'center',
                      backgroundColor: 'white'}}>
              <View style={{marginLeft: 10, width: 80, justifyContent:'center'}}>
                <Image source={icon_url}
                       style={{alignSelf: 'center',
                               height: 15,
                               width: 80}}/>
              </View>
              <Text allowFontScaling={false}
                    style={{flex: 1,
                            fontSize: 18,
                            textAlign: 'right',
                            marginRight :20,
                            color:"#808080",
                            fontFamily:'FZZhunYuan-M02S'}}>
                        {this.props.brand} XXXX XXXX XXXX {this.props.last4}
              </Text>
          </TouchableOpacity>
        )
        _previousVisa.push(
          <Text key={"paymentChannelListHeader"}
                style={{padding: 10,
                        fontSize: 16,
                        color: "#808080",
                        fontFamily:'FZZhunYuan-M02S'}}
                allowFontScaling={false}>更多方式</Text>
        )
      }
      return _previousVisa;
    }
    const payment_channel_list = () => {
      let _payment_channel_list =[];
      for(let _channel of this.props.available_payment_channels) {
        if (_channel.channel == 1) {
          _payment_channel_list.push(
            <TouchableOpacity onPress={this._goToCredit}
                key={"creditCard"}
                activeOpacity={0.4}
                style={{flexDirection: 'row',
                        height: 59,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: "#D5D5D5"}}>
                <View style={{marginLeft: 10, width: 80, justifyContent:'center'}}>
                  <Image source={require('./Img/visa_master_icon.png')}
                         style={{alignSelf: 'center',
                                 height: 15,
                                 width: 80}}/>
                </View>
                <Text allowFontScaling={false}
                      style={{flex: 1,
                              fontSize: 18,
                              textAlign: 'left',
                              marginLeft :20,
                              color:"#808080",
                              fontFamily:'FZZhunYuan-M02S'}}>
                          {CMLabel.getCNLabel('CREDIT_CARD')}
                </Text>
                <Text allowFontScaling={false}
                      style={styles.arrowText}>
                  >
                </Text>
            </TouchableOpacity>
          )
          _payment_channel_list.push(
            <TouchableOpacity
                key={"debitCard"}
                onPress={this._goToDebit}
                activeOpacity={0.4}
                style={{flexDirection: 'row',
                        height: 59,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: "#D5D5D5"}}>
                <View style={{marginLeft: 10, width: 80, justifyContent:'center'}}>
                  <Image source={require('./Img/visa_debit_icon.png')}
                         style={{alignSelf: 'center',
                                 height: 20,
                                 width: 40}}/>
                </View>
                <Text allowFontScaling={false}
                      style={{flex: 1,
                              fontSize: 18,
                              textAlign: 'left',
                              marginLeft :20,
                              color:"#808080",
                              fontFamily:'FZZhunYuan-M02S'}}>
                              {CMLabel.getCNLabel('DEBIT_CARD')}
                </Text>
                <Text allowFontScaling={false} style={styles.arrowText}>
                  >
                </Text>
            </TouchableOpacity>
          )
        }
        else if(_channel.channel == 10) {
          _payment_channel_list.push(
            <TouchableOpacity onPress={this._goToAliPay}
                key={"alipay"}
                activeOpacity={0.4}
                style={{flexDirection: 'row',
                        height: 59,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: "#D5D5D5"}}>
                <View style={{marginLeft: 10, width: 80, justifyContent:'center'}}>
                  <Image source={require('./Img/alipay_icon.png')}
                         style={{alignSelf: 'center',
                                 height: 28,
                                 width: 28}}/>
                </View>
                <Text allowFontScaling={false}
                      style={{flex: 1,
                              fontSize: 18,
                              textAlign: 'left',
                              marginLeft :20,
                              color:"#808080",
                              fontFamily:'FZZhunYuan-M02S'}}>
                              {CMLabel.getCNLabel('ALIPAY')}
                </Text>
                <Text allowFontScaling={false} style={styles.arrowText}>
                  >
                </Text>
            </TouchableOpacity>
          )
        }
        else if(_channel.channel == 0) {
          _payment_channel_list.push(
            <TouchableOpacity onPress={this._goToCash}
                key={"cash"}
                activeOpacity={0.4}
                style={{flexDirection: 'row',
                        height: 59,
                        alignItems: 'center',
                        backgroundColor: 'white'}}>
                        <View style={{marginLeft: 10, width: 80, justifyContent:'center'}}>
                          <Image source={require('./Img/cash.png')}
                                 style={{alignSelf: 'center',
                                         height: 20,
                                         width: 45}}/>
                        </View>
                <Text allowFontScaling={false}
                      style={{flex: 1,
                              fontSize: 18,
                              textAlign: 'left',
                              marginLeft :20,
                              color:"#808080",
                              fontFamily:'FZZhunYuan-M02S'}}>
                              {CMLabel.getCNLabel('CASH')}
                </Text>
                <Text allowFontScaling={false} style={styles.arrowText}>
                  >
                </Text>
            </TouchableOpacity>
          )
        }
        else if(_channel.channel == 30) {
          _payment_channel_list.push(
            <TouchableOpacity onPress={this._goToApplePay}
                key={"applepay"}
                activeOpacity={0.4}
                style={{flexDirection: 'row',
                        paddingTop: 12,
                        paddingBottom: 12,
                        alignItems: 'center',
                        backgroundColor: 'white',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        borderColor: "#D5D5D5"}}>
                        <View style={{marginLeft: 10, width: 80, justifyContent:'center'}}>
                          <Image source={require('./Img/apple_pay_icon.png')}
                                style={{alignSelf: 'center',
                                        height: 25,
                                        width: 42}}/>
                        </View>
                <Text allowFontScaling={false}
                      style={{flex: 1,
                              fontSize: 18,
                              textAlign: 'left',
                              marginLeft :20,
                              color:"#808080",}}>
                            Apple Pay
                </Text>
                <Text allowFontScaling={false} style={styles.arrowText}>
                  >
                </Text>
            </TouchableOpacity>
          )
        }
      }
      return _payment_channel_list;
    }
    return (
      <View style={styles.container}>
        <Header title={CMLabel.getCNLabel('PAYMENT_TYPE')}
                goBack={this._goBack}
                leftButtonText={'×'}/>
        <ScrollView style={{backgroundColor: '#f4f4f4'}}>
            {previousVisa()}
            {payment_channel_list()}
        </ScrollView>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: height * (434 / 2208),
    justifyContent: 'flex-end',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    width: width * (434 / 1242),
    // marginLeft: width * (110 / 1242),
    marginTop: height * (126 / 2208),
  },
  box_text: {
    fontWeight: 'bold',
    paddingBottom: height * (100 / 2208),
    paddingTop: height * (54 / 2208),
  },
  separator: {
		borderWidth: 1,
		borderColor: "#D5D5D5"
  },
  arrowText:{
    fontSize:30,
    color:"#ff8b00",
    textAlign:"right",
    fontFamily:'FZZhunYuan-M02S',
    marginRight: 20
  }
});
