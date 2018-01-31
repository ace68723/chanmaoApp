/* @flow */

import React, { Component } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import UserInfo from '../SboxAddAddressInfo/UserInfo';

import SboxOrderAction from '../../Actions/SboxOrderAction'
import SboxOrderStore from '../../Stores/SboxOrderStore';

const Realm = require('realm');
const realm = new Realm({path: "cm_2.4.0.realm"});
const { height, width } = Dimensions.get('window');
export default class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      productList:realm.objects('sbox_cart_product'),
      box:realm.objectForPrimaryKey('sbox_box',1),
      renderCheckoutBtn:false,
      startCheckout:false,
      checkoutSuccessful:false,
    }
    this._goToAddressList = this._goToAddressList.bind(this);
    this._goToSboxProductDetial = this._goToSboxProductDetial.bind(this);
    this._setUserInfo = this._setUserInfo.bind(this);
    this._startCheckout = this._startCheckout.bind(this);
    this._goBack = this._goBack.bind(this);
    this._goToAddCard = this._goToAddCard.bind(this);
    this._doCheckout = this._doCheckout.bind(this);
    this._handleLoginSuccessful = this._handleLoginSuccessful.bind(this);
    this._deleteItemAlert = this._deleteItemAlert.bind(this);
    this._deleteItem = this._deleteItem.bind(this);
    this._handleAddCard = this._handleAddCard.bind(this);
    this._handleAddAddress = this._handleAddAddress.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onRealmChange = this._onRealmChange.bind(this);
  }
  async componentDidMount() {
    SboxOrderStore.addChangeListener(this._onChange);
    realm.addListener('change', this._onRealmChange)
  }
  componentWillUnmount() {
    SboxOrderStore.removeChangeListener(this._onChange);
    realm.removeListener('change',this._onRealmChange);
  }
  _onRealmChange() {
    this.setState({
      productList:realm.objects('sbox_cart_product'),
      box:realm.objectForPrimaryKey('sbox_box',1),
    })
  }
  _onChange() {
      const state = Object.assign({},SboxOrderStore.getState())
      this.setState(state)
      console.log(state)
      if(this.state.shouldDoAuth){
          this.props.navigator.showModal({
            screen: 'CmLogin',
            animated: false,
            navigatorStyle: {navBarHidden: true},
            passProps: {handleBackToHome: this._goBack,handleLoginSuccessful: this._handleLoginSuccessful},
          })
      }

      if(this.state.checkoutSuccessful) {
        this.props.navigator.pop({
          animated: true,
          animationType: 'fade',
        });
        this.props.navigator.pop({
          animated: true,
          animationType: 'fade',
        });
        this.props.navigator.showInAppNotification({
         screen: "Notification", // unique ID registered with Navigation.registerScreen
         passProps: {
           backgroundColor:'#ff768b',
           title:'甜满箱',
           content:'下单成功'
         }, // simple serializable object that will pass as props to the in-app notification (optional)
         autoDismissTimerSec: 3 // auto dismiss notification in seconds
        });

      }

  }
  _handleLoginSuccessful(){
    this.setState({
      showCheckoutLoading:true,
    })
    SboxOrderAction.getOrderBefore(this.state.productList);
  }
  _goBack() {
    this.setState({
      startCheckout:false,
      showCheckoutLoading:false,
    })
  }


  _goBack() {
    console.log('here',this.props)
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }
  _setUserInfo(userInfo){
    this.setState({
      userInfo:userInfo
    })
    this._startCheckout();
  }

  _goToAddressList() {
    this.props.navigator.showModal({
        screen: "SboxAddressList",
        passProps: {setUserInfo:this._setUserInfo},
        navigatorStyle: {navBarHidden:true},
        animationType: 'slide-up'
      });
  }
  _goToSboxProductDetial(product) {

    // this.props.navigator.push({
    //   screen: 'SboxProductDetial',
    //   navigatorStyle: {navBarHidden: true},
    //   passProps:{pmid: 26,},
    // })
  }
  _goToAddCard() {
    this.props.navigator.showModal({
        screen: "SboxAddCard",
        passProps: {setUserInfo:this._setUserInfo},
        navigatorStyle: {navBarHidden:true},
        animationType: 'slide-up'
      });
  }

  _deleteItemAlert(product,productName) {
    Alert.alert(
      '删除',
      productName,
      [
        {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: '确认', onPress: () => {this._deleteItem(product)}},
      ],
      { cancelable: false }
    )
  }
  _deleteItem(product){
    realm.write(() => {
      const box = realm.objectForPrimaryKey('sbox_box',1);
      box.boxWeights = box.boxWeights - product.weights * product.selectedAmount;
      const index = box.product.indexOf(product);
       if (index !== -1) {
           box.product.splice(index, 1);
       }
       realm.delete(product);
    })
  }

  _startCheckout() {
    this.setState({
      showCheckoutLoading:true,
    })
    SboxOrderAction.getOrderBefore(this.state.productList);
  }
  _doCheckout() {
    this.setState({
      showCheckoutLoading:true,
    })
    SboxOrderAction.checkout(this.state.box);
  }
  _renderUserInfo() {
    if(!this.state.startCheckout) return
    if(!this.state.userInfo){
      return(
        <TouchableOpacity onPress={this._goToAddressList}>
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
                      onPress={this._goToAddressList} style={{  borderStyle:'dashed',
                        borderWidth:2,
                        borderColor:'#ff7685',
                        padding:10,}}>
            <UserInfo addressObject={this.state.userInfo.addressObject}
                      name={this.state.userInfo.name}
                      phoneNumber={this.state.userInfo.phoneNumber}
                      unitNumber={this.state.userInfo.unitNumber}
            />
        </TouchableOpacity>
      )
    }

  }
  _renderProductList() {
    let productList = [];
    for (var i = 0; i < this.state.productList.length; i++) {
      const key = 'pl'+i;
      const product = this.state.productList[i]
      const fullname = product.fullname;
      const image = product.image;
      const selectedAmount = product.selectedAmount;
      const price = product.price;
      productList.push(

          <View key={key} style={styles.item}>
            <View style={styles.itemImage}>
              <Image style={styles.image} source={{uri:image}}/>
            </View>
            <View style={{flex:1,flexDirection:'row',}}>
              <View style={{flex:0.8,paddingRight:10,}}>
                <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',}}>{fullname}</Text>
                <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',}}>${price}</Text>
              </View>
              <View style={{flex:0.2}}>
                <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',}}>x{selectedAmount}</Text>
              </View>
            </View>
            <TouchableOpacity   style={{position:'absolute',right:0,bottom:10}}
                                onPress={this._deleteItemAlert.bind(null,product,fullname + ' x' + selectedAmount)}>
              <Image  style={{width:18.72,height:20}}
                      source={require('./Img/icon-delete.png')}/>
            </TouchableOpacity>
          </View>


      )
    }
    return(productList)
  }
  _renderOrderInfo() {
    if(!this.state.startCheckout) return
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
                      支付方式
              </Text>
            </View>
            <View style={{flex:0.5, alignItems:'flex-end'}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                      xxxx xxxx xxxx {this.state.last4}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{
                        padding:10,
                        flexDirection:'row',
                        borderBottomWidth: 1,
                        borderColor: '#DCDCDC',}}>
            <View style={{flex:0.5,}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                      箱子空间
              </Text>
            </View>
            <View style={{flex:0.5, alignItems:'flex-end'}}>
              <Text style={{fontSize:16,
                            fontFamily:'FZZhunYuan-M02S',}}>
                      {this.state.box.boxWeights}/99
              </Text>
            </View>
          </View>
      </View>
    )
  }
  _renderBtn(){
    if(this.state.showCheckoutLoading){
      return this._renderLoadingBtn();
    } else if(this.state.shouldAddAddress) {
      return this._renderAddAddressBtn();
    } else if(!this.state.shouldAddAddress && this.state.shouldAddCard){
      return this._renderAddCardBtn();
    } else if(this.state.startCheckout) {
      return this._renderCheckoutBtn();
    } else {
      return this._renderConfirmBtn();
    }
  }
  _renderLoadingBtn() {
    return(
      <View style={{position:'absolute',
                    alignItems:'center',
                    justifyContent:'center',
                    bottom:0,
                    width:width,
                    backgroundColor:'#ff7685',
                    height:60,}}>
          <Image source={require('./Img/Loading_dots_white.gif')} style={{width:45,height:15}}/>
      </View>
    )
  }
  _renderCheckoutBtn() {
    return(
      <TouchableOpacity  style={{
                position:'absolute',
                bottom:0,
                width:width,
                height:60,
                backgroundColor:'#ff7685',}}
        onPress={this._doCheckout}>
        <View style={{flex:1,
                      alignItems:'center',
                      justifyContent:'center',}}>
            <Text style={{
              color:'#ffffff',
              fontSize:20,
              fontFamily:'FZZhunYuan-M02S',
            }}>
              确认下单
            </Text>
        </View>
      </TouchableOpacity>
    )
  }
  _renderConfirmBtn() {
      return(
        <TouchableOpacity style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={this._startCheckout}>
          <View style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{
                color:'#ffffff',
                fontSize:20,
                fontFamily:'FZZhunYuan-M02S',
              }}>
                去结账
              </Text>
          </View>
        </TouchableOpacity>

      )
  }
  _handleAddAddress() {
    this.props.navigator.showModal({
        screen: "SboxAddressList",
        passProps: {setUserInfo:this._setUserInfo},
        navigatorStyle: {navBarHidden:true},
        animationType: 'slide-up'
      });
  }
  _renderAddAddressBtn() {
      return(
        <TouchableOpacity  style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={this._handleAddAddress}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{
                color:'#ffffff',
                fontSize:20,
                fontFamily:'FZZhunYuan-M02S',
              }}>
                添加配送地址
              </Text>
          </View>
        </TouchableOpacity>
      )
  }
  _handleAddCard() {
    this.props.navigator.showModal({
        screen: "SboxAddCard",
        passProps: {setUserInfo:this._setUserInfo},
        navigatorStyle: {navBarHidden:true},
        animationType: 'slide-up'
      });
  }
  _renderAddCardBtn() {
      return(
        <TouchableOpacity  style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={this._handleAddCard}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{
                color:'#ffffff',
                fontSize:20,
                fontFamily:'FZZhunYuan-M02S',
              }}>
                添加支付方式
              </Text>
          </View>
        </TouchableOpacity>
      )
  }
  _renderGoBackBtn() {
    return(
      <TouchableOpacity style={{paddingTop:22,
                                paddingLeft:8,
                                paddingRight:20,
                                paddingBottom:20,
                                position:'absolute',
                                top:0,
                                left:0,}}
                        onPress={this._goBack}>
        <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
          <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
            ×
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  // <View style={{
  //               position:'absolute',
  //               bottom:0,
  //               right:0,
  //               padding:10,
  //               paddingLeft:20,
  //               flexDirection:'row',
  //               alignItems:'center',
  //             }}>
  //     <Text style={{
  //                   color:'#ff7685',
  //                   fontSize:20,
  //                   fontFamily:'FZZhunYuan-M02S',}}>
  //           Total: $52.25
  //     </Text>
  //     <View
  //       style={{
  //               marginLeft:20,
  //               paddingTop:10,
  //               paddingBottom:10,
  //               paddingLeft:40,
  //               paddingRight:40,
  //               backgroundColor:'#ff7685',}}
  //
  //     >
  //       <Text style={{fontSize:16,
  //                     fontFamily:'FZZhunYuan-M02S',
  //                     color:'#FFF',
  //                   }}>
  //             提交订单
  //       </Text>
  //     </View>
  // </View>
  render() {
    return (
      <View style={styles.container}>
        <ScrollView ref={(ref) => {this._scrollViewRef = ref}}
                    style={{flex:1,
                            marginTop:30,
                            marginBottom:60,
                            paddingLeft:15,
                            paddingRight:15,}}>
          {this._renderUserInfo()}
          {this._renderOrderInfo()}
          {this._renderProductList()}

        </ScrollView>

        {this._renderBtn()}
        {this._renderGoBackBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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