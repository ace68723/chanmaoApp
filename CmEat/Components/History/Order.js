'use strict';

import React, { Component } from 'react';
import {
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import PhoneNumberVerify from './PhoneNumberVerify';
import Label from '../../../App/Constants/AppLabel';
const { width } = Dimensions.get('window');
const deviceWidth = width;
export default class pastOrderEN extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isCheaking: props.isCheaking,
          orderInfo: props.order,
          page: props.page
      };
      this._renderDetialButton = this._renderDetialButton.bind(this);
      this._handleContactCustomerService = this._handleContactCustomerService.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      orderInfo:nextProps.order,
    })
  }
  _renderFoodList(){
      return this.state.orderInfo.items.map((item, index) => {
        const soldoutColor = item.soldout == '1'? '#ef473a':'#000000';
        const soldoutText = ()=>{
          if(item.soldout == '1'){
              return (
                <Text
                    allowFontScaling = {false}
                    style={{ flex: 1,
                              fontSize: 16,
                              paddingLeft: 20,
                              fontFamily: 'NotoSans-Regular',
                              textAlign: 'center',
                              color: soldoutColor }}
                >
                        {Label.getCMLabel('SOLD_OUT')}
                </Text>
              );
          }
        };
        const toppingGroup = () => {
          let _toppingGroup = [];
          if(item.tps) {
            for (let tp of item.tps) {
              if (parseInt(tp.amount) > 0) {
                _toppingGroup.push(
                  <View key={tp.tp_id}
                        style={{flexDirection: 'row', marginTop: 5, marginLeft: 38}}>

                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{color:'#ababb0',
                                      fontSize:16,
                                      fontFamily:'NotoSans-Regular'}}
                              allowFontScaling={false}>
                          {tp.tp_name}
                        </Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
                      <Text style={{color:'#ababb0',
                                    fontSize:16,
                                    fontFamily:'NotoSans-Regular',
                                    textAlign: 'left'}}
                            allowFontScaling={false}>
                        ${tp.price} × {tp.amount}
                      </Text>
                    </View>
                  </View>
                )
              }
            }
            return _toppingGroup;
          }
        };
      return(
        <View key={index} style={{flexDirection:'column',alignItems:'center',paddingTop:10,paddingBottom:10}}>
            <View style={{flexDirection:'row'}}>
                <View style={styles.quantityIcon}><Text style={{fontSize:10,fontFamily:'NotoSans-Regular',}}>{item.amount}</Text></View>
                <Text style={{fontSize:16,
                              paddingLeft:20,
                              fontFamily:'NotoSans-Regular',
                              color:soldoutColor,
                              flex: 0.7}}
                      allowFontScaling={false}
                      numberOfLines={1}>
                        {item.ds_name}
                </Text>
                {soldoutText()}
                <View style={{flex:0.3,alignItems:'flex-end'}}>
                  <Text style={{fontSize:16,paddingLeft:20,fontFamily:'NotoSans-Regular',color:soldoutColor}}
                        allowFontScaling={false}>
                          ${(item.amount*item.price).toFixed(2)}
                  </Text>
                </View>
            </View>
            {toppingGroup()}
        </View>
      )
    })
  }

  _handleContactCustomerService(){
    this.props.handleContactCustomerService(this.state.orderInfo);

     // Clipboard.setString('chanmao_kefu');
     // Alert.alert(
     //        Label.getCMLabel('COPY_TO_CLIPBOARD'),
     //        Label.getCMLabel('CHANMAO_KEFU'),
     //        [
     //          {text: 'OK', onPress: () => {}},
     //        ]
     //      )
  }

  _phoneNumberVerify (){
    if(this.state.orderInfo.order_status == 55 && (this.state.orderInfo.payment_channel == 0 || this.state.orderInfo.payment_status == 20)){
      return(
          <PhoneNumberVerify  orderId={this.state.orderInfo.order_oid}
                              phoneNumber ={this.state.orderInfo.user_tel}
                              scrollRef={this.props.scrollRef}
                              getCurrentPosition={this.props.getCurrentPosition}/>
      )
    }
  }

  _renderDetialButton() {
    if (this.props.page == 0) {
      if(this.state.orderInfo.order_status == '5' && !this.state.orderInfo.payment_status){
        return (
          <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
              <TouchableOpacity style={{flex:1,
                                        justifyContent:'center',
                                        alignItems:'center'}}
                                 onPress={this.props.reorder.bind(null,this.state.orderInfo.rr_rid)}>
                <Text style={{fontSize:13,color:'#ef473a',fontWeight:'bold',fontFamily:'NotoSans-Regular',}}
                      allowFontScaling={false}>
                      {Label.getCMLabel('REORDER')}
                </Text>
              </TouchableOpacity>
          </View>
        )
      }else{
        if (this.state.orderInfo.payment_channel > 0 && !this.state.orderInfo.payment_status && (this.state.orderInfo.order_status == 0 || this.state.orderInfo.order_status == 55)) {
          return (
              <TouchableOpacity style={{flex:1,
                                        flexDirection:'row',
                                        justifyContent:'center',
                                        alignItems:'center',
                                        padding:10,
                                        backgroundColor: '#ff8b00',
                                        borderColor: '#ff8b00',
                                        borderTopWidth: 1,
                                        borderBottomWidth:1}}
                                onPress={
                                  this.props.handlePaymentRetry.bind(null,this.state.orderInfo)}
                                disabled={this.props.isRefreshing}>
                <Text style={{fontSize:15,
                              color:'white',
                              fontFamily:'NotoSans-Regular',}}
                      allowFontScaling={false}>
                  {Label.getCMLabel('REPAY')}
                </Text>

              </TouchableOpacity>
          )
        }
        return(
          <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
              <TouchableOpacity style={{flex:1,
                                        justifyContent:'center',
                                        alignItems:'center'}}
                                 onPress={this.props.orderOnClick.bind(null,this.state.orderInfo)}>
                <Text style={{fontSize:15,color:'#666666',fontFamily:'NotoSans-Regular',}}
                        allowFontScaling={false}>{Label.getCMLabel('DETAIL')}</Text>
              </TouchableOpacity>
          </View>
        )
      }
    }
    else if (this.props.page == 1) {
      return(
        <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
            <TouchableOpacity style={{flex:1,
                                      justifyContent:'center',
                                      alignItems:'center'}}
                               onPress={this.props.orderOnClick.bind(null,this.state.orderInfo)}>
              <Text style={{fontSize:13,color:'#666666',fontWeight:'bold',fontFamily:'NotoSans-Regular',}}
                      allowFontScaling={false}>{Label.getCMLabel('COMMENT')}</Text>
            </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
            <TouchableOpacity style={{flex:1,
                                      justifyContent:'center',
                                      alignItems:'center'}}
                               onPress={this.props.reorder.bind(null,this.state.orderInfo.rr_rid)}>
              <Text style={{fontSize:13,color:'#ef473a',fontWeight:'bold',fontFamily:'NotoSans-Regular',}}
                    allowFontScaling={false}>
                    {Label.getCMLabel('REORDER')}
              </Text>
            </TouchableOpacity>
        </View>
      )
    }
  }

  _renderOptionButton() {
    // if (this.state.orderInfo.payment_channel > 0 && !this.state.orderInfo.payment_status && (this.state.orderInfo.order_status == 0 || this.state.orderInfo.order_status == 55)) {
    if (false){
      return (
          <TouchableOpacity style={{flex:1,
                                    flexDirection:'row',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    padding:10,
                                    backgroundColor: '#ff8b00',
                                    borderColor: '#ff8b00',
                                    borderTopWidth: 1,
                                    borderBottomWidth:1}}
                            onPress={
                              this.props.handlePaymentRetry.bind(null,this.state.orderInfo)}
                            disabled={this.props.isRefreshing}>
            <Text style={{fontSize:15,
                          color:'white',
                          fontFamily:'NotoSans-Regular',}}
                  allowFontScaling={false}>
              {Label.getCMLabel('REPAY')}
            </Text>

          </TouchableOpacity>
      )
    }
    else {
      return(
        <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:10,}]}>
            <TouchableOpacity style={{flex:1,
                                      flexDirection:'row',
                                      justifyContent:'center',
                                      alignItems:'center'}}
                              onPress={this._handleContactCustomerService}>
              <Image
                style={{width: 16, height: 16,}}
                source={require('./Image/support.png')}></Image>
              <Text style={{marginLeft:6,fontSize:15,color:'#666666',fontFamily:'NotoSans-Regular',}} allowFontScaling={false}>{Label.getCMLabel('CONTACT_SUPPORT')}</Text>

            </TouchableOpacity>
        </View>
      )
    }
  }

  _renderPriceDetail() {
    if (this.state.orderInfo.payment_channel == 0) {
      return(
        <View style={styles.orderTotal}>
          <Text style={{fontSize:18,marginLeft: 40,fontWeight:'bold',fontFamily:'NotoSans-Regular',}} allowFontScaling={false}>{Label.getCMLabel('PRICE')}: ${this.state.orderInfo.order_total}</Text>
        </View>
      )
    }
    else if(this.state.orderInfo.payment_channel > 0) {
      return(
        <View style={styles.orderTotal}>
          <Text style={{fontSize:18,
                        marginLeft: 40,
                        fontWeight:'bold',
                        fontFamily:'NotoSans-Regular'}}
                allowFontScaling={false}>
                {Label.getCMLabel('ACTUAL_PICE')}: ${this.state.orderInfo.order_total}
          </Text>
        </View>
      )
    }
  }

  render() {
    let statusMessage;
    let statusColor;
    let statusReminder;
    if (this.state.orderInfo.payment_channel == 0) {
      //自取
      if (this.state.orderInfo.dltype == 0) {
        statusReminder = Label.getCMLabel('PAYMENT_TYPE') + ":" + Label.getCMLabel('CASH_SELF_PICKUP');
      }
      else {
        statusReminder = Label.getCMLabel('PAYMENT_TYPE') + ":" + Label.getCMLabel('CASH');
      }
    }
    else if (this.state.orderInfo.payment_channel == 1) {
      statusReminder = Label.getCMLabel('PAYMENT_TYPE') + ":" + Label.getCMLabel('CARD');
    }
    else if (this.state.orderInfo.payment_channel == 10) {
      statusReminder = Label.getCMLabel('PAYMENT_TYPE') + ":" + Label.getCMLabel('ALIPAY');
    }
    else if (this.state.orderInfo.payment_channel == 30) {
      statusReminder = Label.getCMLabel('PAYMENT_TYPE') + ":" + Label.getCMLabel('APPLE_PAY');
    }
    switch (this.state.orderInfo.order_status) {
        case 0:
            if (this.state.orderInfo.payment_channel > 0) {
                if (this.state.orderInfo.payment_status == 20) {
                  statusColor = {color:'#b2b2b2'};
                  statusMessage = Label.getCMLabel('PAID') + ', ' + Label.getCMLabel('WAIT_FOR_RR_CONFIRM');
                }
                else if(this.state.orderInfo.payment_status == 30) {
                  statusColor = {color:'#11c1f3'};
                  statusMessage = Label.getCMLabel('REFUNDED');
                }
                else if(this.state.orderInfo.payment_status == 40) {
                  statusColor = {color:'#ef473a'};
                  statusMessage = Label.getCMLabel('ONLINE_PAYMENT_FAILED');
                  statusReminder = Label.getCMLabel('PLZ_REORDER');
                }
                else {
                  statusColor = {color:'#ef473a'};
                  statusMessage = Label.getCMLabel('WAIT_FOR_PAYMENT');
                  statusReminder = Label.getCMLabel('WAIT_FOR_PAYMENT_REMINDER');
                }
            }
            else {
              statusColor = {color:'#b2b2b2'};
              statusMessage = Label.getCMLabel('WAIT_FOR_RR_CONFIRM');
            }
            break;
        case 10:
            statusColor = {color:'#33cd5f'};
            statusMessage = Label.getCMLabel('RESTAURANT_CONFIRMED') + ', ' + Label.getCMLabel('GETTING_RDY');
            break;
        case 20:
            statusColor = {color:'#33cd5f'};
            //自取
            if(this.state.dltype == 0) {
              statusMessage = Label.getCMLabel('RESTAURANT_CONFIRMED') + ', ' + Label.getCMLabel('PLZ_PICKUP');
            }
            else {
              statusMessage = Label.getCMLabel('RESTAURANT_CONFIRMED') + ', ' + Label.getCMLabel('GETTING_RDY');
            }
            break;
        case 30:
            statusColor = {color:'#9bc8df'};
            statusMessage = Label.getCMLabel('DRIVER_IS_OTW');
            break;
        case 40:
            statusColor = {color:'#11c1f3'};
            statusMessage = Label.getCMLabel('DELIVERED');
            break;
        case 55:
            if (this.state.orderInfo.payment_channel > 0) {
                if (this.state.orderInfo.payment_status == 20) {
                  statusColor = {color:'#886aea'};
                  statusMessage = Label.getCMLabel('NEW_USER_CONFIRMING');
                }
                else if(this.state.orderInfo.payment_status == 30) {
                  statusColor = {color:'#11c1f3'};
                  statusMessage = Label.getCMLabel('REFUNDED');
                }
                else if(this.state.orderInfo.payment_status == 40) {
                  statusColor = {color:'#ef473a'};
                  statusMessage = Label.getCMLabel('ONLINE_PAYMENT_FAILED');
                  statusReminder = Label.getCMLabel('PLZ_REORDER');
                }
                else {
                  statusColor = {color:'#ef473a'};
                  statusMessage = Label.getCMLabel('WAIT_FOR_PAYMENT');
                  statusReminder = Label.getCMLabel('WAIT_FOR_PAYMENT_REMINDER');
                }
            }
            else {
              statusColor = {color:'#886aea'};
              statusMessage = Label.getCMLabel('NEW_USER_CONFIRMING');
            }
            break;
        case 60:
            statusColor = {color:'#11c1f3'};
            statusMessage = Label.getCMLabel('CS_WILL_CONTACT');
            break;
        case 5:
            statusColor = {color:'#ef473a'};
            statusMessage = Label.getCMLabel('DISH_OUT_OF_ORDER');;
            break;
        case 90:
            statusColor = {color:'#ef473a'};
            statusMessage = Label.getCMLabel('ORDER_CANCELED');
            break;
    }
    if(this.state.orderInfo.payment_status == 30) {
      statusColor = {color:'#11c1f3'};
      statusMessage = Label.getCMLabel('REFUNDED');
    }
    let _paymentStatusMessage = () => {
      if (this.state.orderInfo.payment_channel == 10) {
        return(
          <Text style={[styles.infoTitle,{...paymentStatusColor, textAlign:'right'}]} allowFontScaling={false}>{paymentStatusMessage}</Text>
        )
      }
    }
    let _statusReminder = () => {
      return(
        <Text style={{paddingBottom:5,
                      fontWeight:'600',
                      fontSize:14,
                      fontFamily:'NotoSans-Regular',
                      color:'#b2b2b2'}}
              allowFontScaling={false}>{statusReminder}</Text>
      )
    }
      return(
        <TouchableOpacity style={styles.orderContainer}
                          onPress={this.props.orderOnClick.bind(null,this.state.orderInfo)}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <TouchableOpacity style={{flex: 1}} onPress={this.props.reorder.bind(null,this.state.orderInfo.rr_rid)}>
                    <ImageBackground style={{flex:1,width:deviceWidth-56,alignSelf:'center'}} source={{uri:this.state.orderInfo.rr_url}}>
                      <View style={styles.opacityView}/>
                        <View style={styles.imageTextContainer}>
                          <Text style={styles.imageText} allowFontScaling={false}>{this.state.orderInfo.rr_name}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
              </View>
              <View style={styles.info}>
                  <Text style={[styles.infoTitle,statusColor]} allowFontScaling={false}>{statusMessage}</Text>
                  {_statusReminder()}
                  <View style={{flexDirection:'row'}}>
                    <Text style={[styles.infoText,{fontFamily:'NotoSans-Regular', fontWeight: 'bold'}]}
                          allowFontScaling={false}>
                        {Label.getCMLabel('ORDER_NO')} #{this.state.orderInfo.order_oid}
                    </Text>
                    <Text style={[styles.infoText,{textAlign:'right', flex: 1.5}]}
                          allowFontScaling={false}>
                        {this.state.orderInfo.order_created}
                    </Text>
                  </View>
              </View>
              <View style={styles.orderList}>
                {this._renderFoodList()}
              </View>
              {this._renderPriceDetail()}
              {this._phoneNumberVerify()}
              <View style={styles.buttonContainer}>
                  {this._renderDetialButton()}
                  {this._renderOptionButton()}
              </View>
          </View>
        </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:50,
    backgroundColor: '#e6e6e6',
  },
  orderContainer:{
    margin:10,
    backgroundColor:"#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
       height: 1,
       width: 1,
    },
  },
  itemContainer: {
    // backgroundColor: 'white',
    // height:500
  },
  imageContainer:{
    height:110,
    marginTop:18,
    marginLeft:18,
    marginRight:18,
    justifyContent: 'center',
  },

  opacityView:{
    flex:1,
    opacity: 0.3,
    backgroundColor:'#000000'
  },
  imageTextContainer:{
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0)',
    //flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
   fontSize: 20,
   color:'white',
   alignSelf:'center',
   fontFamily:'NotoSans-Bold',
  },
  info:{
    flex:1,
    paddingTop:15,
    marginLeft:18,
    marginRight:18,
  },
  infoTitle:{
    flex: 1,
    paddingBottom:5,
    // marginLeft:40,
    fontWeight:'bold',
    fontSize:17,
    fontFamily:'NotoSans-Regular',
  },
  infoText:{
    flex:1,
    paddingBottom:5,
    // marginLeft:40,
    fontFamily:'NotoSans-Regular',
  },
  orderList:{
    flex:1,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#d9d9d9',
    marginLeft:18,
    marginRight:18,
    paddingBottom:5,

  },
  quantityIcon:{
    borderColor:'#d9d9d9',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    height:18,
    width:18,
  },
  orderTotal:{
    flex:1,
    paddingTop:18,
    paddingBottom:18,
    paddingLeft:18,
    paddingRight:18,
    justifyContent:'center'
  },
  buttonContainer:{
    flex:1,
    flexDirection:'row',
  },
  ButtonStyle:{
    flex:1,
    backgroundColor:'#f9f9f9',
    borderTopWidth: 1,
    borderBottomWidth:1,


    borderColor:'#d9d9d9'
  },



});
