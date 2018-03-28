/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  Image,
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
    this._goToCredit = this._goToCredit.bind(this);
    this._goToAliPay = this._goToAliPay.bind(this);
    this._goToCash = this._goToCash.bind(this);
    this._goToDebit = this._goToDebit.bind(this);
    this._renderGoBackBtn = this._renderGoBackBtn.bind(this);
    this._renderButton = this._renderButton.bind(this);

  }

  _goBack() {
    this.props.navigator.dismissModal({
        animationType: 'slide-down'
      });
  }

  _goToCredit() {
    this.props.navigator.push({
        screen: "CmAddCard",
        navigatorStyle: {navBarHidden:true},
        passProps:{
          title:"添加信用卡",
          saveModificationCallback: this.props.saveModificationCallback
        }
      });
  }

  _goToDebit() {
    this.props.navigator.push({
        screen: "CmAddCard",
        navigatorStyle: {navBarHidden:true},
        passProps:{
          title:"添加 Debit Card",
          saveModificationCallback: this.props.saveModificationCallback
        }
      });
  }

  _goToAliPay() {
    // this.props.navigator.push({
    //     screen: "CmAddCard",
    //     navigatorStyle: {navBarHidden:true},
    //     passProps:{
    //       title:"添加 支付宝"
    //     }
    //   });
    CheckoutAction.updatePaymentStatus(10);
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }

  _goToCash() {
    CheckoutAction.updatePaymentStatus(0);
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
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
    const payment_channel_list = () => {
      let _payment_channel_list =[];
      if (this.props.available_payment_channels.includes(1)) {
        _payment_channel_list.push(
          <TouchableOpacity onPress={this._goToCredit}
              activeOpacity={0.4}
              style={{flexDirection: 'row',
                      paddingTop: 12,
                      paddingBottom: 12,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderBottomWidth: 1,
                      borderColor: "#D5D5D5"}}>
              <Text allowFontScaling={false}
                    style={{flex: 1,
                            fontSize: 18,
                            textAlign: 'left',
                            marginLeft :20,
                            color:"#808080",}}>
                        {CMLabel.getCNLabel('CREDIT_CARD')}
              </Text>
              <Text allowFontScaling={false}
                    style={styles.arrowText}>
                >
              </Text>
          </TouchableOpacity>
        )
        _payment_channel_list.push(
          <TouchableOpacity onPress={this._goToDebit}
              activeOpacity={0.4}
              style={{flexDirection: 'row',
                      paddingTop: 12,
                      paddingBottom: 12,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderBottomWidth: 1,
                      borderColor: "#D5D5D5"}}>
              <Text allowFontScaling={false}
                    style={{flex: 1,
                            fontSize: 18,
                            textAlign: 'left',
                            marginLeft :20,
                            color:"#808080",}}>
                            {CMLabel.getCNLabel('DEBIT_CARD')}
              </Text>
              <Text allowFontScaling={false} style={styles.arrowText}>
                >
              </Text>
          </TouchableOpacity>
        )
      }
      if (this.props.available_payment_channels.includes(10)) {
        _payment_channel_list.push(
          <TouchableOpacity onPress={this._goToAliPay}
              activeOpacity={0.4}
              style={{flexDirection: 'row',
                      paddingTop: 12,
                      paddingBottom: 12,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      borderBottomWidth: 1,
                      borderColor: "#D5D5D5"}}>
              <Text allowFontScaling={false}
                    style={{flex: 1,
                            fontSize: 18,
                            textAlign: 'left',
                            marginLeft :20,
                            color:"#808080",}}>
                            {CMLabel.getCNLabel('ALIPAY')}
              </Text>
              <Text allowFontScaling={false} style={styles.arrowText}>
                >
              </Text>
          </TouchableOpacity>
        )
      }
      if (this.props.available_payment_channels.includes(0)) {
        _payment_channel_list.push(
          <TouchableOpacity onPress={this._goToCash}
              activeOpacity={0.4}
              style={{flexDirection: 'row',
                      paddingTop: 12,
                      paddingBottom: 12,
                      alignItems: 'center',
                      backgroundColor: 'white'}}>
              <Text allowFontScaling={false}
                    style={{flex: 1,
                            fontSize: 18,
                            textAlign: 'left',
                            marginLeft :20,
                            color:"#808080",}}>
                            {CMLabel.getCNLabel('CASH')}
              </Text>
              <Text allowFontScaling={false} style={styles.arrowText}>
                >
              </Text>
          </TouchableOpacity>
        )
      }
      return _payment_channel_list;
    }

    return (
      <View style={styles.container}>
        <Header title={CMLabel.getCNLabel('PAYMENT_TYPE')}
                goBack={this._goBack}
                leftButtonText={'×'}/>
        <ScrollView style={{backgroundColor: '#f4f4f4'}}>
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
