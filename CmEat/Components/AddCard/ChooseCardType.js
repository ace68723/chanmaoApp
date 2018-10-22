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
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';

import Header from '../General/Header';
import CMLabel from '../../Constants/AppLabel';
const { height, width } = Dimensions.get('window');

import PopupView from '../Popup/PopupView'

export default class ChooseCardType extends Component {

  constructor(){
    super()
    this.state = {showPopup: false};
    this._onChange = this._onChange.bind(this);
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

    this.popupView = PopupView.getInstance();
  }

  componentDidMount() {
    HistoryStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    HistoryStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    const state = Object.assign({},this.state,HistoryStore.getState());
    if (state.showPriceDetail) {
      this.popupView.setPriceDetail({
        title: state.payment_channel === 0 ? '确认改为现金到付' : "确认支付",
        subtitle: "确认支付?",
        fees: state.fees,
        confirmText: "确认",
        cancelText: "取消",
        onConfirm: () => {
          const data = {oid: state.oid,
                        dltype: 1,
                        payment_channel: state.payment_channel};
          HistoryAction.changeOrderCase(data);
          // switch (state.payment_channel) {
          //   case 0:
          //     this.props.cashSelected(data);
          //     break;
          //   case 1:
          //     data.charge_total
          //     this.props.stripeCardSelected({...data,
          //                                charge_total: state.fees.charge_total});
          //     break;
          //   case 10:
          //     this.props.alipaySelected({...data,
          //                                charge_total: state.fees.charge_total});
          //     break;
          //   case 30:
          //     this.props.alipaySelected({...data,
          //                                charge_total: state.fees.charge_total});
          //       break;
          //   default:
          //     break;
          // }
          this.props.navigator.dismissModal({animationType: 'slide-down'});
        },
        onDismiss: () => {
          this.setState({showPopup: false});
        }
      });
      this.setState({showPopup: true});
    }
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
      // const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 1);
      // let payment_description = '';
      // let payment_description = '刷卡将会有'+ visa_fee +'加币的手续费哦亲~';
      // if (visa_fee == 0) {
      //   payment_description = '';
      // }
      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 1
      }
      HistoryAction.viewOrderCase(data);
      // this.popupView.setMessagePopup({
      //   subtitle: "确认刷卡支付?",
      //   confirmText: "确认",
      //   cancelText: "取消",
      //   onConfirm: () => {
      //     this.props.stripeCardSelected(this.props.orderInfo, visa_fee);
      //     this.props.navigator.dismissModal({
      //       animationType: 'slide-down'
      //     });
      //   },
      //   onDismiss: () => {
      //     this.setState({showPopup: false})
      //   }
      // });
      // this.setState({showPopup: true});
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
      // const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 10);
      //
      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 10
      }
      HistoryAction.viewOrderCase(data);
      // this.popupView.setPriceDetail({
      //   subtitle: "确认支付?",
      //   confirmText: "确认",
      //   cancelText: "取消",
      //   onConfirm: () => {
      //     this.props.alipaySelected(this.props.orderInfo, visa_fee);
      //     this.props.navigator.dismissModal({animationType: 'slide-down'});
      //   },
      //   onDismiss: () => {
      //     this.setState({showPopup: false})
      //   }
      // });
      // this.setState({showPopup: true});
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

      // this.popupView.setMessagePopup({
      //   subtitle: "确认修改为到付?",
      //   confirmText: "确认",
      //   cancelText: "取消",
      //   onConfirm: () => {
      //     this.props.cashSelected(this.props.orderInfo);
      //     this.props.navigator.dismissModal({
      //       animationType: 'slide-down'
      //     });
      //     alert("已成功修改");
      //   },
      //   onDismiss: () => {
      //     this.setState({showPopup: false})
      //   }
      // });
      // this.setState({showPopup: true});

      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 0
      }
      HistoryAction.viewOrderCase(data);
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
      // this.popupView.setMessagePopup({
      //   subtitle: "确认支付?",
      //   confirmText: "确认",
      //   cancelText: "取消",
      //   onConfirm: () => {
      //     this.props.applePaySelected(this.props.orderInfo, visa_fee);
      //     this.props.navigator.dismissModal({
      //       animationType: 'slide-down'
      //     });
      //   },
      //   onDismiss: () => {
      //     this.setState({showPopup: false})
      //   }
      // });
      // this.setState({showPopup: true});

      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 30
      }
      HistoryAction.viewOrderCase(data);

      // Alert.alert(
      //   '确认支付?',
      //   payment_description,
      //   [
      //     {text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
      //     {text: '确认', onPress: () => {
      //         this.props.applePaySelected(this.props.orderInfo, visa_fee);
      //         this.props.navigator.dismissModal({
      //           animationType: 'slide-down'
      //         });
      //       }
      //     },
      //  ]
      // );
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
      // const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 1);
      // let payment_description = '';
      // let payment_description = '刷卡将会有'+ visa_fee +'加币的手续费哦亲~';
      // if (visa_fee == 0) {
      //   payment_description = '';
      // }

      // this.popupView.setMessagePopup({
      //   subtitle: "新卡添加成功,确认支付?",
      //   confirmText: "确认",
      //   cancelText: "取消",
      //   onConfirm: () => {
      //     this.props.stripeCardSelected(this.props.orderInfo, visa_fee);
      //     this.props.navigator.dismissModal({
      //       animationType: 'slide-down'
      //     });
      //   },
      //   onDismiss: () => {
      //     this.setState({showPopup: false})
      //   }
      // });
      // this.setState({showPopup: true});

      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 1
      }
      HistoryAction.viewOrderCase(data);

      // Alert.alert(
      //   '新卡添加成功,确认支付?',
      //   payment_description,
      //   [
      //     {text: CMLabel.getCNLabel('CANCEL'), onPress: () => {}, style: 'cancel'},
      //     {text: '确认', onPress: () => {
      //         this.props.stripeCardSelected(this.props.orderInfo, visa_fee);
      //         this.props.navigator.dismissModal({
      //           animationType: 'slide-down'
      //         });
      //       }
      //     },
      //  ]
      // );
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
      if (this.props.last4 && this.props.last4.length > 0) {
        // let icon_url = "";
        // if (this.props.brand == "Visa" || this.props.brand == "Master") {
        //   icon_url = require('./Img/visa_master_icon.png');
        // }
        // else {
        //   icon_url = require('./Img/visa_debit_icon.png');
        // }
        let previous_icon = () => {
          let _previous_icon = [];
          if (this.props.brand == "Visa" || this.props.brand == "MasterCard") {
            _previous_icon.push(
              <Image key={'visa_master'}
                     source={require('./Img/visa_master_icon.png')}
                     style={{alignSelf: 'center',
                             height: 15,
                             width: 80}}/>
            );
          }
          else {
            _previous_icon.push(
              <Image key={'visa_debit'}
                     source={require('./Img/visa_debit_icon.png')}
                     style={{alignSelf: 'center',
                             height: 20,
                             width: 40}}/>
            );
          }
          return _previous_icon;
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
                {previous_icon()}
              </View>
              <Text allowFontScaling={false}
                    style={{flex: 1,
                            fontSize: 18,
                            textAlign: 'left',
                            marginLeft: 20,
                            color:"#808080",
                            fontFamily:'FZZhunYuan-M02S'}}>
                        {this.props.brand} **** **** **** {this.props.last4}
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
        if (_channel.payment_channel == 1) {
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
                              marginLeft: 20,
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
        else if(_channel.payment_channel == 10) {
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
        else if(_channel.payment_channel == 0) {
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
        else if(_channel.payment_channel == 30 && Platform.OS == 'ios') {
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
        {this.state.showPopup && this.popupView.show()}
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
