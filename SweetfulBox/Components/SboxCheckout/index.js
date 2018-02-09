
/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  FlatList,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ImageBackground
} from 'react-native';

import UserInfo from '../SboxAddAddressInfo/UserInfo';
import SboxCart from '../SboxCart';
import CheckoutButton from './CheckoutButton';
import SboxHeader from '../../../App/Components/General/SboxHeader';

import SboxOrderAction from '../../Actions/SboxOrderAction';
import SboxProductAction from '../../Actions/SboxProductAction';
import SboxOrderStore from '../../Stores/SboxOrderStore';


import { SBOX_REALM_PATH } from '../../Config/API';

const Realm = require('realm');
const realm = new Realm({path: SBOX_REALM_PATH});

const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;


export default class MyComponent extends Component {
  static navigatorStyle = {
      screenBackgroundColor: 'transparent',
      modalPresentationStyle: 'overFullScreen'
  }
  constructor() {
    super();

    this.state = SboxOrderStore.getState();

    this._onChange = this._onChange.bind(this);
    this._handleLoginGoBack = this._handleLoginGoBack.bind(this);
    this._handleSuccessful = this._handleSuccessful.bind(this);
    this._handleSoldOut = this._handleSoldOut.bind(this);
    this._handleError = this._handleError.bind(this);

    this._goToAddress = this._goToAddress.bind(this);
    this._goToAddCard = this._goToAddCard.bind(this);
    this._goBack = this._goBack.bind(this);

    this._getOrderBefore = this._getOrderBefore.bind(this);
    this._doCheckout = this._doCheckout.bind(this);

    this._renderGoBackBtn = this._renderGoBackBtn.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this._renderCheckout = this._renderCheckout.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._keyExtractor = this._keyExtractor.bind(this);





  }
  componentDidMount() {
    SboxOrderAction.getOrderBefore();
    SboxOrderStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    SboxOrderStore.removeChangeListener(this._onChange);
  }

  _onChange() {
      const state = Object.assign({},SboxOrderStore.getState());
      this.setState(state);
      this._handleCheckoutStatus();
  }

  _handleCheckoutStatus() {
    switch(this.state.checkoutStatus){
      case "shouldDoAuth":
        this._goToLogin();
      break;
      case "soldOut":
        this._goBack();
      break;
      case "shouldAddAddress":
        this._goToAddress();
      break;
      case "shouldAddCard":
        this._goToAddCard();
      break;
      case "successful":
        this._handleSuccessful();
      break;
      case "soldOut":
        this._handleSoldOut();
      break;
      case "error":
        this._handleError();
      break;
    }
  }
  _handleLoginGoBack() {
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
  _handleLoginSuccessful() {
    SboxOrderAction.getOrderBefore();
  }
  _handleSuccessful() {
    // this.props.navigator.showInAppNotification({
    //  screen: "Notification",
    //  passProps: {
    //    backgroundColor:'#ff768b',
    //    title:'甜满箱',
    //    content:'下单成功'
    //  },
    //  autoDismissTimerSec: 5
    // });
    const {checkoutStatus} = this.state;
    this.props.navigator.resetTo({
        screen: 'SboxMainTab',
        passProps: {checkoutStatus},
        animated: true,
        animationType: 'fade',
        navigatorStyle: {navBarHidden: true},
      });

  }
  _handleSoldOut() {
    // this.props.navigator.showInAppNotification({
    //  screen: "Notification",
    //  passProps: {
    //    backgroundColor:'#ff768b',
    //    title:'甜满箱 下单失败',
    //    content:'商品售完，请重新下单'
    //  },
    //  autoDismissTimerSec: 5
    // });
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
    setTimeout(() => {
      this.props.navigator.showModal({
        screen: 'SboxNotification',
        passProps: {checkoutSuccessful: false},
        navigatorStyle: {navBarHidden: true},
      });
    }, 800);
  }
  _handleError() {
    // this.props.navigator.showInAppNotification({
    //  screen: "Notification",
    //  passProps: {
    //    backgroundColor:'#ff768b',
    //    title:'甜满箱 下单失败',
    //    content:'System Error 请稍后尝试'
    //  },
    //  autoDismissTimerSec: 5
    // });
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
    setTimeout(() => {
      this.props.navigator.showModal({
        screen: 'SboxNotification',
        passProps: {checkoutSuccessful: false},
        navigatorStyle: {navBarHidden: true},
      });
    }, 800);
  }

  _goBack(){
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }
  _goToLogin() {
    this.props.navigator.showModal({
      screen: 'CmLogin',
      navigatorStyle: {navBarHidden: true},
      passProps: {handleBackToHome: this._handleLoginGoBack,
                  handleLoginSuccessful: this._handleLoginSuccessful},
    })
  }
  _goToAddress() {
    this.props.navigator.showModal({
      screen: 'SboxAddAddress',
      navigatorStyle: {navBarHidden: true},
    })
  }
  _goToAddCard() {
    this.props.navigator.showModal({
        screen: "SboxChooseCardType",
        navigatorStyle: {navBarHidden:true},
      });
  }



  _getOrderBefore() {
    this.setState({
      checkoutStatus:'loading',
    })
    SboxOrderAction.getOrderBefore();
  }
  _doCheckout() {
    this.setState({
      checkoutStatus:'loading',
    })
    SboxOrderAction.checkout();
  }

  _renderGoBackBtn() {
    this.props.navigator.dismissModal({
      animationType: 'none'
    });
  }
  _rederFooter() {
    return(
      <CheckoutButton checkoutStatus = {this.state.checkoutStatus}
                      goToAddress = {this._goToAddress}
                      goToAddCard = {this._goToAddCard}
                      doCheckout = {this._doCheckout}/>
    )
  }
  _renderItem(item,key) {
    const {sku_image_url,spu_name,sku_name,sku_quantity,sku_amount,sku_price} = item;
    return(
      <View style={styles.item} key={key}>

        <Image style={styles.image} source={{uri:sku_image_url}}/>

        <View style={{flex:1,flexDirection:'row',marginLeft:20}}>
          <View style={{flex:0.7,paddingRight:10,}}>
            <Text numberOfLines={2}
                  style={{fontSize:15,
                          fontFamily:'FZZhunYuan-M02S',

                        }}>
                {spu_name}
            </Text>
            <Text numberOfLines={1}
                  style={{fontSize:12,
                          fontFamily:'FZZhunYuan-M02S',
                          marginTop:10,
                          color:"#6d6e71",
                        }}>
                {sku_name}
            </Text>
          </View>
          <View style={{flex:0.3, justifyContent: 'space-between', flexDirection: 'column'}}>
            <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',textAlign: 'right'}}>
            ${sku_price} x {sku_quantity}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  _keyExtractor = (item, index) => item.sku_id;
  _renderUserInfo() {
    if(!this.state.addr.hasOwnProperty('abid')){
      return(
        <TouchableOpacity onPress={this._goToAddress}>
          <View style={{flexDirection:'row',
                        alignItems:'center',
                        borderStyle:'dashed',
                        borderWidth:2,
                        borderColor:'#ff7685',
                        padding:10
                      }}>
            <Image source={require('./Img/address.png')}
                   style={{height:25*1.2264,width:25}}
            />
            <Text style={{
                    fontSize:20,
                    fontFamily:'FZZhunYuan-M02S',
                    marginLeft:20,
                  }}>
              请选择您的配送地址
            </Text>
          </View>
          </TouchableOpacity>
      )
    }else{

      return(
        <TouchableOpacity
                      onPress={this._goToAddress} style={{  borderStyle:'dashed',
                        borderWidth:2,
                        borderColor:'#ff7685',
                        padding:10,}}>
            <UserInfo addr={this.state.addr.addr}
                      name={this.state.addr.name}
                      phoneNumber={this.state.addr.tel}
                      unitNumber={this.state.addr.unit}
            />
        </TouchableOpacity>
      )
    }

  }
  _renderOrderInfo() {
    return(
      <View style={{
                    marginTop:15,
                    backgroundColor:'white',}}>
          <View style={{
                        padding:10,
                        flexDirection:'row',
                        borderBottomWidth: 1,
                        borderColor: '#DCDCDC',}}>
            <View style={{flex:0.3,}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                    配送时间：
              </Text>
            </View>
            <View style={{flex:0.7,alignItems:'flex-end'}}>
              <Text style={{fontSize:16,
                            color:'#ff7685',
                            fontFamily:'FZZhunYuan-M02S',}}>
                      {this.state.deliTime}
              </Text>
            </View>

          </View>
          <View style={{
                        padding:10,
                        flexDirection:'row',
                        borderBottomWidth: 1,
                        borderColor: '#DCDCDC',}}>
            <View style={{flex:0.5,}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                      Delivery Fee: ${this.state.deliFee}
              </Text>
            </View>
            <View style={{flex:0.5, alignItems:'flex-end'}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                      Total: ${this.state.total}
              </Text>
            </View>
          </View>
          <TouchableOpacity
                      onPress={this._goToAddCard}
                      style={{
                        padding:10,
                        flexDirection:'row',
                        borderBottomWidth: 1,
                        borderColor: '#DCDCDC',}}>
            <View style={{flex:0.5,}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                      支付方式  {this.state.cardBrand}
              </Text>
            </View>
            <View style={{flex:0.5, alignItems:'flex-end'}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                      xxxx xxxx xxxx {this.state.last4}
              </Text>
            </View>
          </TouchableOpacity>
      </View>
    )
  }
  _renderHeader(){
    return(
      <View>
        {this._renderUserInfo()}
        {this._renderOrderInfo()}
      </View>
    )
  }
  _renderCheckout(){
    const cartList = this.state.cartList.map((item,key) => {
      return this._renderItem(item,key)
    })
    // console.log(cartList)
    return (
      <View style={styles.container}>
        <SboxHeader title={"结账"}
                goBack={this._renderGoBackBtn}
                leftButtonText={'x'}/>
        <ScrollView>
          {this._renderHeader()}
          {cartList}
        </ScrollView>
        {this._rederFooter()}
      </View>
    );
  }
  render() {
    if(this.state.checkoutStatus == 'firstLoading'){
      return(
        <View style={{flex:1,}}>
          <SboxHeader title={"购物箱"}
                  goBack={this._renderGoBackBtn}
                  leftButtonText={'x'}/>
          <View style={{position:'absolute',
                        alignItems:'center',
                        justifyContent:'center',
                        bottom:0,
                        width:width,
                        backgroundColor:'#ff7685',
                        height:60,}}>
              <Image source={require('./Img/Loading_dots_white.gif')} style={{width:45,height:15}}/>
          </View>
        </View>
      )
    }else{
      return this._renderCheckout()
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
  },
  navigation: {
    flexDirection:'row'
  },
  back: {
    flex: 1,
    justifyContent:'center',
  },
  title: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:'center',
    // backgroundColor: "blue",
  },
  item: {
    height: height * (295 / 2208),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    alignItems: 'center',
    padding:10,
    // marginHorizontal: width * (38 / 1242),
  },
  itemImage: {
    marginLeft: width * (54 / 1242),
    marginRight: width * (118 / 1242),
  },
  image: {
    height: height * (400 / 2208),
    width: width * (165 / 1242),
    resizeMode: 'contain',
  },
  itemPrice: {
    fontSize: (38 / 0.75) / 2208 * height,
  },
});
