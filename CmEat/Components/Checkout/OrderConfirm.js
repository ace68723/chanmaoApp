'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image

} from 'react-native';
import CMModal from 'react-native-modalbox';
import Label from '../../../App/Constants/AppLabel';
const orderUser = {
    name:"qiao",
    phone: "647-895-0624",
    total: "$150.98",
    address:"Unit 1905,20 Olive Ave, North York, M2N 7G5",
}

export default class orderConfirm extends Component {
  constructor(props){
    super(props);

    this.state = {
      //  isOpen: this.props.isCheaking,
      isOpen: true,
      dltype: props.dltype

    }
  }

  _renderPaymentChannel() {
    let payment_channel = "";
    if(this.props.paymentChannel == 1) {
      payment_channel = "刷卡";
    }
    else if(this.props.paymentChannel == 10) {
      payment_channel = "支付宝";
    }
    else if(this.props.paymentChannel == 30) {
      payment_channel = "Apple Pay";
    }
    if(this.props.paymentChannel > 0) {
      return(
        <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',paddingLeft:0}}>
            <Image source={require('./Image/alipay.png')} style={{width:24,height:25,marginRight:15,marginLeft:15}}/>
            <Text style={styles.contentFont} allowFontScaling={false}>{payment_channel}</Text>
        </View>
      )
    }
  }


  render() {
      let dldec, visa_fee;
      switch (this.state.dltype) {
        case 0:
          dldec = '自取'
        break;
        case 1:
          dldec = '送餐'
        break;
        case 2:
          dldec = '定制运费'
        break;
      }
      if (this.props.visaFee >= 0) {
        visa_fee = parseFloat(this.props.visaFee);
      }
      else{
        visa_fee = 0;
      }


      return(


            <CMModal style={styles.modal}
                     position={"center"}
                     isOpen={this.state.isOpen}
                     onClosed={this.props.closeOrderConfirm}>
                <View style={{flex:1}}>
                      <View style={styles.modalHearder}>
                          <Text style={{fontSize:20, fontFamily: 'NotoSansCJKsc-Bold'}}
                                allowFontScaling={false}>{dldec}</Text>
                      </View>
                      <View style={styles.modalContent}>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',}}>
                              <Image source={require('./Image/icon_name.png')} style={{width:25,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>{this.props.selectedAddress.name}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',}}>

                              <Image source={require('./Image/icon_telephone.png')} style={{width:25,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>{this.props.selectedAddress.tel}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',}}>
                              <Image source={require('./Image/icon_total.png')} style={{width:22,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>
                                {this.props.total}
                              </Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',paddingLeft:0}}>
                              <Image source={require('./Image/icon_address.png')} style={{width:19,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>{this.props.selectedAddress.addr}</Text>
                          </View>
                          {this._renderPaymentChannel()}

                      </View>
                      <View style={{flexDirection: 'row',
                                    backgroundColor: 'white',
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8}}>
                          <View style={{flex: 1}}>
                              <TouchableOpacity onPress={() => this.setState({isOpen: !this.state.isOpen})}>
                                <View style={{
                                      height: 50,
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
                              <TouchableOpacity onPress={this.props.doCheckout}>
                                <View style={{
                                      height: 50,
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
            </CMModal>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    justifyContent:'center',
    backgroundColor:'#ff8600',
    height:50,
    width:100,
    padding:10,
    marginTop:10,
  },

  modal: {
    justifyContent: 'center',
    height: 400,
    width: 300,
    borderRadius: 8
  },
  modalHearder:{
    flex:1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalContent:{
    flex:5,
    marginLeft:20,
    marginRight:20,
    borderTopWidth: 1,
    borderColor: '#a6a6a6',
  },
  contentFont:{
    color:'#ea7b21',
    fontSize:18,
    flex:1,
    fontFamily: 'NotoSansCJKsc-Regular'
  },
  modalButton:{
    flex:1,

    justifyContent:'center',
    alignItems:'center',
    borderWidth: 1,
    borderColor:'#d9d9d9'
  },
  buttonFont:{
    fontSize:18,
    fontFamily: 'NotoSansCJKsc-Regular'
  },
  modalFooter:{
    flex:1,
    flexDirection:'row',
  }

});
