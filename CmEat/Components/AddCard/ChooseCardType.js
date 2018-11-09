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

import Modal from 'react-native-modalbox';

import CheckoutAction from '../../Actions/CheckoutAction';
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';

import Header from '../General/Header';
import Label from '../../../App/Constants/AppLabel';

const { height, width } = Dimensions.get('window');

export default class ChooseCardType extends Component {

  constructor(){
    super()
    this.state = {showPopup: false,
                  showPriceDetail: false};
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

  }

  componentDidMount() {
    HistoryStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    HistoryStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    const state = Object.assign({},this.state,HistoryStore.getState());
    if (state.goToHistory) {
      this.props.navigator.dismissModal({
          animationType: 'slide-down'
        });
    }
    else if (state.showPriceDetail) {
      this.setState(state);
      // this.popupView.setPriceDetail({
      //   title: state.payment_channel === 0 ? '确认改为现金到付' : "确认支付",
      //   subtitle: "确认支付?",
      //   fees: state.fees,
      //   confirmText: "确认",
      //   cancelText: "取消",
      //   onConfirm: () => {
      //     const data = {oid: state.oid,
      //                   dltype: 1,
      //                   payment_channel: state.payment_channel};
      //     HistoryAction.changeOrderCase(data);
      //     this.props.navigator.dismissModal({animationType: 'slide-down'});
      //   },
      //   onDismiss: () => {
      //     this.setState({showPopup: false});
      //   }
      // });
      // this.setState({showPopup: true});
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
      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 1
      }
      HistoryAction.viewOrderCase(data);
    }
  }

  _goToCredit() {
    this.props.navigator.push({
        screen: "CmAddCard",
        navigatorStyle: {navBarHidden:true},
        passProps:{
          title: Label.getCMLabel('ADD_CREDIT_CARD'),
          stripeCardAdded: this._stripeCardAdded
        }
      });
  }

  _goToDebit() {
    this.props.navigator.push({
        screen: "CmAddCard",
        navigatorStyle: {navBarHidden:true},
        passProps:{
          title: Label.getCMLabel('ADD_DEBIT_CARD'),
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
      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 10
      }
      HistoryAction.viewOrderCase(data);
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
      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 30
      }
      HistoryAction.viewOrderCase(data);
      const visa_fee = this._getVisaFee(this.props.orderInfo.available_payment_channels, 30);
      let payment_description = '';
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
      const data = {
        oid: this.props.orderInfo.order_oid,
        dltype: 1,
        payment_channel: 1
      }
      HistoryAction.viewOrderCase(data);
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

  _renderPriceDetailModal() {
    if (this.state.fees) {
      const _discount = () => {
        const _discount = [];
        if (this.state.fees.total_off > 0) {
          _discount.push(
            <View key={"discount_wrapper"}
                  style={styles.priceWrapper}>
              <Text key={"discount_title"}
                    style={{fontSize: 15,
                            color: "#40a2e7",
                            fontFamily: 'NotoSansCJKsc-Regular'}}
                    allowFontScaling={false}>
                {Label.getCMLabel('DISCOUNT')}:
              </Text>
              <Text key={"discount"}
                    style={{fontSize: 15,
                            color: "#40a2e7",
                            fontFamily: 'NotoSansCJKsc-Regular'}}
                    allowFontScaling={false}>
                -${this.state.fees.total_off}
              </Text>
            </View>
          )
        }
        return _discount;
      };
      const _chargeTotal = () => {
        const _chargeTotal = [];
        _chargeTotal.push(
          <Text key={"charge_total"}
                style={{fontSize: 19,
                        color: "#666666",
                        fontWeight: "800",
                        fontFamily: 'NotoSansCJKsc-Regular'}}
                allowFontScaling={false}>
            ${this.state.fees.charge_total}
          </Text>
        );
        if (this.state.fees.total_off > 0) {
          _chargeTotal.push(
            <Text key={"ori_charge_total"}
                  style={{fontSize: 19,
                          color: "#666666",
                          fontWeight: "800",
                          fontFamily: 'NotoSansCJKsc-Regular',
                          textDecorationLine: 'line-through',
  												marginLeft: 6}}
                  allowFontScaling={false}>
              ${this.state.fees.total}
            </Text>
          );
        }
        return _chargeTotal;
      }
      return (
        <View style={{flex: 1,
                      backgroundColor: "white",
                      justifyContent: 'space-between',
                      borderRadius: 8}}>
          <View style={{justifyContent: 'center'}}>
            <Text style={{textAlign: 'center',
                          marginTop: 20,
                          fontSize: 18,
                          fontFamily: 'NotoSansCJKsc-Regular'}}>
              {Label.getCMLabel('CONFIRM_PAY')}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text key={"pretax_title"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              {Label.getCMLabel('PRETAX_PRICE')}:
            </Text>
            <Text key={"pretax"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              ${this.state.fees.ori_pretax}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text key={"dlexp_title"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              {Label.getCMLabel('DELIVER_FEE')}:
            </Text>
            <Text key={"dlexp"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              ${this.state.fees.dlexp}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text key={"tax_title"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              {Label.getCMLabel('TAX')}:
            </Text>
            <Text key={"tax"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              ${this.state.fees.ori_tax}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text key={"service_fee_title"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              {Label.getCMLabel('SERVICE_FEE')}:
            </Text>
            <Text key={"service_fee"}
                  style={{fontSize: 15,
                          color: "#9b9b9b",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              ${this.state.fees.ori_service_fee}
            </Text>
          </View>
          {_discount()}
          <View style={styles.seperateLine}>
          </View>
          <View style={styles.priceWrapper}>
            <Text style={{fontSize: 19,
                          color: "#666666",
                          fontWeight: "800",
                          fontFamily: 'NotoSansCJKsc-Regular'}}
                  allowFontScaling={false}>
              {Label.getCMLabel('CHARGE_TOTAL')}:
            </Text>
            <View style={{flexDirection: 'row'}}>
              {_chargeTotal()}
            </View>
          </View>
          <View style={{flexDirection: 'row',
                        backgroundColor: 'white',
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8}}>
              <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => {this.setState({showPriceDetail: false})}}>
                    <View style={{
                          height: 42.5,
                          justifyContent: 'center',
                          backgroundColor: '#C5C5C5',
                          alignItems: 'center',
                          borderBottomLeftRadius: 8,}}>
                      <Text style={{color: '#666',
                                     fontSize: 15,
                                     fontWeight: '900',
                                     lineHeight: 16,
                                     fontFamily: 'NotoSansCJKsc-Regular'}}
                            allowFontScaling={false}>
                            {Label.getCMLabel('CANCEL')}
                      </Text>
                    </View>
                  </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
                  <TouchableOpacity onPress={() => this._confirmToPay()}>
                    <View style={{
                          height: 42.5,
                          justifyContent: 'center',
                          backgroundColor: '#ea7b21',
                          alignItems: 'center',
                          borderBottomRightRadius: 8}}>
                      <Text style={{color: 'white',
                                     fontSize: 15,
                                     fontWeight: '900',
                                     lineHeight: 16,
                                     fontFamily: 'NotoSansCJKsc-Regular'}}
                            allowFontScaling={false}>
                            {Label.getCMLabel('CONFIRM')}
                      </Text>
                    </View>
                  </TouchableOpacity>
              </View>
          </View>
        </View>
      )
    }
  }

  _confirmToPay() {
    const data = {oid: this.state.oid,
                  dltype: 1,
                  payment_channel: this.state.payment_channel};
    this.setState({showPriceDetail: !this.state.showPriceDetail});
    HistoryAction.changeOrderCase(data);
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
                        fontFamily:'NotoSansCJKsc-Regular'}}
                allowFontScaling={false}>{Label.getCMLabel('RECENTLY_USE')}</Text>
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
                            fontFamily:'NotoSansCJKsc-Regular'}}>
                        {this.props.brand} **** **** **** {this.props.last4}
              </Text>
          </TouchableOpacity>
        )
        _previousVisa.push(
          <Text key={"paymentChannelListHeader"}
                style={{padding: 10,
                        fontSize: 16,
                        color: "#808080",
                        fontFamily:'NotoSansCJKsc-Regular'}}
                allowFontScaling={false}>{Label.getCMLabel('MORE_PAYMENT_WAY')}</Text>
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
                              fontFamily:'NotoSansCJKsc-Regular'}}>
                          {Label.getCMLabel('CREDIT_CARD')}
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
                              fontFamily:'NotoSansCJKsc-Regular'}}>
                              {Label.getCMLabel('DEBIT_CARD')}
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
                              fontFamily:'NotoSansCJKsc-Regular'}}>
                              {Label.getCMLabel('ALIPAY')}
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
                              fontFamily:'NotoSansCJKsc-Regular'}}>
                              {Label.getCMLabel('CASH')}
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
        <Header title={Label.getCMLabel('PAYMENT_TYPE')}
                goBack={this._goBack}
                leftButtonText={'×'}/>
        <ScrollView style={{backgroundColor: '#f4f4f4'}}>
            {previousVisa()}
            {payment_channel_list()}
        </ScrollView>
        <Modal style={styles.modal}
              position={"center"}
              isOpen={this.state.showPriceDetail}
              onClosed={() => {this.setState({showPriceDetail: false})}}
              swipeToClose={false}>
            {this._renderPriceDetailModal()}
        </Modal>
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
    fontFamily:'NotoSansCJKsc-Regular',
    marginRight: 20
  },
  priceWrapper:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50
  },
  seperateLine: {
		marginLeft: 10,
		marginRight: 10,
		borderColor:"#ccd3db",
		borderBottomWidth: StyleSheet.hairlineWidth
	},
  modal: {
		justifyContent: 'center',
		height: 300,
		width: width * 0.8,
    borderRadius: 8
	},
});
