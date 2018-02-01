
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
  ImageBackground
} from 'react-native';
import {Container} from 'flux/utils';
import UserInfo from '../SboxAddAddressInfo/UserInfo';

import SboxOrderAction from '../../Actions/SboxOrderAction'
import SboxOrderStore from '../../Stores/SboxOrderStore';
import { SBOX_REALM_PATH } from '../../Config/API'

const Realm = require('realm');
const realm = new Realm({path: SBOX_REALM_PATH});
const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const navigationHeight = viewHeight * (212/2208) - 12;
const checkoutButtonMargin = viewWidth * (60/1242);
export default class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      productList:[],
      renderCheckoutBtn:false,
      startCheckout:false,
      checkoutSuccessful:false,
    }
    // this._goToAddressList = this._goToAddressList.bind(this);
    // this._goToSboxProductDetial = this._goToSboxProductDetial.bind(this);
    // this._setUserInfo = this._setUserInfo.bind(this);
    // this._startCheckout = this._startCheckout.bind(this);
    this._goBack = this._goBack.bind(this);
    // this._goToAddCard = this._goToAddCard.bind(this);
    // this._doCheckout = this._doCheckout.bind(this);
    // this._handleLoginSuccessful = this._handleLoginSuccessful.bind(this);
    // this._deleteItemAlert = this._deleteItemAlert.bind(this);
    // this._deleteItem = this._deleteItem.bind(this);
    // this._handleAddCard = this._handleAddCard.bind(this);
    // this._handleAddAddress = this._handleAddAddress.bind(this);
    this._onChange = this._onChange.bind(this);
    // this._onRealmChange = this._onRealmChange.bind(this);
    this._getProductList = this._getProductList.bind(this);
    this._checkProductStatus = this._checkProductStatus.bind(this);
  }
  componentDidMount() {
    SboxOrderStore.addChangeListener(this._onChange);
    this._getProductList();
    this._checkProductStatus();
    // realm.addListener('change', this._onRealmChange)
  }
  componentWillMount() {
  }
  componentWillUnmount() {
    SboxOrderStore.removeChangeListener(this._onChange);
    // realm.removeListener('change',this._onRealmChange);
  }
  _onChange() {
      console.log("onchange");
      const state = Object.assign({},SboxOrderStore.getState())
      this.setState(state)
      console.log(state);
      if(this.state.shouldDoAuth){
          this.props.navigator.showModal({
            screen: 'CmLogin',
            animated: false,
            navigatorStyle: {navBarHidden: true},
            passProps: {handleBackToHome: this._goBack,handleLoginSuccessful: this._handleLoginSuccessful},
          })
      }
  //
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
  // _handleLoginSuccessful(){
  //   this.setState({
  //     showCheckoutLoading:true,
  //   })
  //   SboxOrderAction.getOrderBefore(this.state.productList);
  // }
  // _goBack() {
  //   this.setState({
  //     startCheckout:false,
  //     showCheckoutLoading:false,
  //   })
  // }


  _goBack() {
    console.log('here',this.props)
    this.props.navigator.pop({
      animated: true,
      animationType: 'slide-horizontal',
    });
  }
  // _setUserInfo(userInfo){
  //   this.setState({
  //     userInfo:userInfo
  //   })
  //   this._startCheckout();
  // }

  // _goToAddressList() {
  //   this.props.navigator.showModal({
  //       screen: "SboxAddressList",
  //       passProps: {setUserInfo:this._setUserInfo},
  //       navigatorStyle: {navBarHidden:true},
  //       animationType: 'slide-up'
  //     });
  // }
  // _goToSboxProductDetial(product) {
  //
  //   // this.props.navigator.push({
  //   //   screen: 'SboxProductDetial',
  //   //   navigatorStyle: {navBarHidden: true},
  //   //   passProps:{pmid: 26,},
  //   // })
  // }
  // _goToAddCard() {
  //   this.props.navigator.showModal({
  //       screen: "SboxAddCard",
  //       passProps: {setUserInfo:this._setUserInfo},
  //       navigatorStyle: {navBarHidden:true},
  //       animationType: 'slide-up'
  //     });
  // }

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
  // _deleteItem(product){
  //   realm.write(() => {
  //     const box = realm.objectForPrimaryKey('sbox_box',1);
  //     box.boxWeights = box.boxWeights - product.weights * product.selectedAmount;
  //     const index = box.product.indexOf(product);
  //      if (index !== -1) {
  //          box.product.splice(index, 1);
  //      }
  //      realm.delete(product);
  //   })
  // }
  _getProductList() {
    SboxOrderAction.getProductList();
  }
  _checkProductStatus() {
  }

  // _startCheckout() {
  //   this.setState({
  //     showCheckoutLoading:true,
  //   })
  //   SboxOrderAction.getOrderBefore(this.state.productList);
  // }
  // _doCheckout() {
  //   this.setState({
  //     showCheckoutLoading:true,
  //   })
  //   SboxOrderAction.checkout(this.state.box);
  // }
  // _renderUserInfo() {
  //   if(!this.state.startCheckout) return
  //   if(!this.state.userInfo){
  //     return(
  //       <TouchableOpacity onPress={this._goToAddressList}>
  //         <View style={{flexDirection:'row',
  //                       alignItems:'center',
  //                       borderStyle:'dashed',
  //                       borderWidth:2,
  //                       borderColor:'#ff7685',
  //                       padding:10
  //                     }}>
  //           <Image source={require('./Img/address.png')}
  //                  style={{height:25*1.2264,width:25}}
  //           />
  //           <Text style={{
  //                   fontSize:20,
  //                   fontFamily:'FZZhunYuan-M02S',
  //                   marginLeft:20,
  //                 }}>
  //             请选择您的配送地址
  //           </Text>
  //         </View>
  //         </TouchableOpacity>
  //     )
  //   }else{
  //
  //     return(
  //       <TouchableOpacity
  //                     onPress={this._goToAddressList} style={{  borderStyle:'dashed',
  //                       borderWidth:2,
  //                       borderColor:'#ff7685',
  //                       padding:10,}}>
  //           <UserInfo addressObject={this.state.userInfo.addressObject}
  //                     name={this.state.userInfo.name}
  //                     phoneNumber={this.state.userInfo.phoneNumber}
  //                     unitNumber={this.state.userInfo.unitNumber}
  //           />
  //       </TouchableOpacity>
  //     )
  //   }
  //
  // }
  _renderProductList() {
    console.log(this.state.productList);
    let productList = [];
    for (var i = 0; i < this.state.productList.length; i++) {
      const key = 'pl'+i;
      const product = this.state.productList[i]
      const fullname = product.spu_name + product.sku_name;
      const image = product.sku_image_url;
      const selectedAmount = product.sku_quantity;
      const sku_price = product.sku_price;
      const original_price = product.sku_original_price;
      // <Text style={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}>${sku_price} <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S', textDecorationLine: 'line-through'}}> ${original_price}</Text></Text>
      if (product.sku_quantity < product.sku_amount) {
        var item_row = (
            <View key={key} style={styles.item}>
              <View style={styles.itemImage}>
                <Image style={styles.image} source={{uri:image}}/>
              </View>
              <View style={{flex:1,flexDirection:'row',}}>
                <View style={{flex:0.8,paddingRight:10,}}>
                  <Text style={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}>{fullname}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                    <TouchableOpacity
                      style={{justifyContent: 'center'}}>
                      <Text style={{borderWidth: 0.8,
                                    width: 20,
                                    textAlign: 'center'}}>-</Text>
                    </TouchableOpacity>
                    <View style={{justifyContent: 'center', marginLeft: -1}}>
                      <Text style={{borderWidth: 0.8,
                                    width: 50,
                                    textAlign: 'center',
                                    color: '#ff7685'}}>
                        {selectedAmount}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{justifyContent: 'center', marginLeft: -1}}>
                      <Text style={{borderWidth: 0.8,
                                    width: 20,
                                    textAlign: 'center'}}>+</Text>
                    </TouchableOpacity>

                  </View>
                </View>
                <View style={{flex:0.2, justifyContent: 'space-between', flexDirection: 'column'}}>
                  <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',textAlign: 'right'}}>${sku_price}</Text>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={this._deleteItemAlert.bind(null,product,fullname + ' x' + selectedAmount)}>
                    <Image  style={{width:18.72,height:20}}
                            source={require('./Img/icon-delete.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        )
      }
      else {
        var item_row = (
            <View key={key} style={styles.item}>
              <View style={styles.itemImage}>
                <Image style={styles.image} source={{uri:image}}/>
              </View>
              <View style={{flex:1,flexDirection:'row',}}>
                <View style={{flex:0.8,paddingRight:10,}}>
                  <Text style={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}>{fullname}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10}}>
                    <Text style={{backgroundColor: "#ff7685",
                                  width: 90,
                                  textAlign: "center",
                                  color: "white"}}>Sold Out</Text>

                  </View>
                </View>
                <View style={{flex:0.2, justifyContent: 'space-between', flexDirection: 'column'}}>
                  <Text style={{fontSize:16,fontFamily:'FZZhunYuan-M02S',textAlign: 'right'}}>${sku_price}</Text>
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={this._deleteItemAlert.bind(null,product,fullname + ' x' + selectedAmount)}>
                    <Image  style={{width:18.72,height:20}}
                            source={require('./Img/icon-delete.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        );
      }
      productList.push(item_row);
    }
    return(productList)
  }
  // _renderOrderInfo() {
  //   if(!this.state.startCheckout) return
  //   return(
  //     <View style={{
  //                   marginTop:15,
  //                   backgroundColor:'white',}}>
  //         <View style={{
  //                       padding:10,
  //                       flexDirection:'row',
  //                       borderBottomWidth: 1,
  //                       borderColor: '#DCDCDC',}}>
  //           <View style={{flex:0.3,}}>
  //             <Text style={{fontSize:16,
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                   配送时间：
  //             </Text>
  //           </View>
  //           <View style={{flex:0.7,alignItems:'flex-end'}}>
  //             <Text style={{fontSize:16,
  //                           color:'#ff7685',
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                     {this.state.deliTime}
  //             </Text>
  //           </View>
  //
  //         </View>
  //         <View style={{
  //                       padding:10,
  //                       flexDirection:'row',
  //                       borderBottomWidth: 1,
  //                       borderColor: '#DCDCDC',}}>
  //           <View style={{flex:0.5,}}>
  //             <Text style={{fontSize:16,
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                     Delivery Fee: ${this.state.deliFee}
  //             </Text>
  //           </View>
  //           <View style={{flex:0.5, alignItems:'flex-end'}}>
  //             <Text style={{fontSize:16,
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                     Total: ${this.state.total}
  //             </Text>
  //           </View>
  //         </View>
  //         <TouchableOpacity
  //                     onPress={this._goToAddCard}
  //                     style={{
  //                       padding:10,
  //                       flexDirection:'row',
  //                       borderBottomWidth: 1,
  //                       borderColor: '#DCDCDC',}}>
  //           <View style={{flex:0.5,}}>
  //             <Text style={{fontSize:16,
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                     支付方式
  //             </Text>
  //           </View>
  //           <View style={{flex:0.5, alignItems:'flex-end'}}>
  //             <Text style={{fontSize:16,
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                     xxxx xxxx xxxx {this.state.last4}
  //             </Text>
  //           </View>
  //         </TouchableOpacity>
  //         <View style={{
  //                       padding:10,
  //                       flexDirection:'row',
  //                       borderBottomWidth: 1,
  //                       borderColor: '#DCDCDC',}}>
  //           <View style={{flex:0.5,}}>
  //             <Text style={{fontSize:16,
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                     箱子空间
  //             </Text>
  //           </View>
  //           <View style={{flex:0.5, alignItems:'flex-end'}}>
  //             <Text style={{fontSize:16,
  //                           fontFamily:'FZZhunYuan-M02S',}}>
  //                     {this.state.box.boxWeights}/99
  //             </Text>
  //           </View>
  //         </View>
  //     </View>
  //   )
  // }

  // _renderBtn(){
  //   if(this.state.showCheckoutLoading){
  //     return this._renderLoadingBtn();
  //   } else if(this.state.shouldAddAddress) {
  //     return this._renderAddAddressBtn();
  //   } else if(!this.state.shouldAddAddress && this.state.shouldAddCard){
  //     return this._renderAddCardBtn();
  //   } else if(this.state.startCheckout) {
  //     return this._renderCheckoutBtn();
  //   } else {
  //     return this._renderConfirmBtn();
  //   }
  // }
  // _renderLoadingBtn() {
  //   return(
  //     <View style={{position:'absolute',
  //                   alignItems:'center',
  //                   justifyContent:'center',
  //                   bottom:0,
  //                   width:width,
  //                   backgroundColor:'#ff7685',
  //                   height:60,}}>
  //         <Image source={require('./Img/Loading_dots_white.gif')} style={{width:45,height:15}}/>
  //     </View>
  //   )
  // }
  // _renderCheckoutBtn() {
  //   return(
  //     <TouchableOpacity  style={{
  //               position:'absolute',
  //               bottom:0,
  //               width:width,
  //               height:60,
  //               backgroundColor:'#ff7685',}}
  //       onPress={this._doCheckout}>
  //       <View style={{flex:1,
  //                     alignItems:'center',
  //                     justifyContent:'center',}}>
  //           <Text style={{
  //             color:'#ffffff',
  //             fontSize:20,
  //             fontFamily:'FZZhunYuan-M02S',
  //           }}>
  //             确认下单
  //           </Text>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // }
  // _renderConfirmBtn() {
  //     return(
  //       <TouchableOpacity style={{
  //                 position:'absolute',
  //                 bottom:0,
  //                 width:width,
  //                 height:60,
  //                 backgroundColor:'#ff7685',}}
  //         onPress={this._startCheckout}>
  //         <View style={{
  //                       flex:1,
  //                       alignItems:'center',
  //                       justifyContent:'center',}}>
  //             <Text style={{
  //               color:'#ffffff',
  //               fontSize:20,
  //               fontFamily:'FZZhunYuan-M02S',
  //             }}>
  //               去结账
  //             </Text>
  //         </View>
  //       </TouchableOpacity>
  //
  //     )
  // }
  // _handleAddAddress() {
  //   this.props.navigator.showModal({
  //       screen: "SboxAddressList",
  //       passProps: {setUserInfo:this._setUserInfo},
  //       navigatorStyle: {navBarHidden:true},
  //       animationType: 'slide-up'
  //     });
  // }
  // _renderAddAddressBtn() {
  //     return(
  //       <TouchableOpacity  style={{
  //                 position:'absolute',
  //                 bottom:0,
  //                 width:width,
  //                 height:60,
  //                 backgroundColor:'#ff7685',}}
  //         onPress={this._handleAddAddress}>
  //         <View style={{flex:1,
  //                       alignItems:'center',
  //                       justifyContent:'center',}}>
  //             <Text style={{
  //               color:'#ffffff',
  //               fontSize:20,
  //               fontFamily:'FZZhunYuan-M02S',
  //             }}>
  //               添加配送地址
  //             </Text>
  //         </View>
  //       </TouchableOpacity>
  //     )
  // }
  // _handleAddCard() {
  //   this.props.navigator.showModal({
  //       screen: "SboxAddCard",
  //       passProps: {setUserInfo:this._setUserInfo},
  //       navigatorStyle: {navBarHidden:true},
  //       animationType: 'slide-up'
  //     });
  // }
  // _renderAddCardBtn() {
  //     return(
  //       <TouchableOpacity  style={{
  //                 position:'absolute',
  //                 bottom:0,
  //                 width:width,
  //                 height:60,
  //                 backgroundColor:'#ff7685',}}
  //         onPress={this._handleAddCard}>
  //         <View style={{flex:1,
  //                       alignItems:'center',
  //                       justifyContent:'center',}}>
  //             <Text style={{
  //               color:'#ffffff',
  //               fontSize:20,
  //               fontFamily:'FZZhunYuan-M02S',
  //             }}>
  //               添加支付方式
  //             </Text>
  //         </View>
  //       </TouchableOpacity>
  //     )
  // }
  _renderGoBackBtn() {
    return(
      <TouchableOpacity style={{paddingTop:22,
                                paddingLeft:8,
                                paddingRight:20,
                                position:'absolute',
                                top:-15,
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
  _rederFooter() {
    const products_list = this.state.productList;
    var total = 0;
    var num = 0;
    // for (let product of products_list) {
    //
    //   console.log(product);
    //     total += product.sku_price*product.sku_quantity;
    //     num += product.sku_quantity;
    // }
    Array.from(products_list).forEach(product => {
      total += product.sku_price*product.sku_quantity;
      num += product.sku_quantity;
    })
    return(
      <View style={{flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: checkoutButtonMargin,
                    marginLeft: checkoutButtonMargin,
                    marginRight: checkoutButtonMargin}}>
        <View style={{height: 30, width: 30, justifyContent: 'center'}}>
          <ImageBackground source={require('./Img/box.png')}
                 style={{height: 30, width: 30, justifyContent: 'center'}}>
             <Text style={{backgroundColor: 'rgba(0,0,0,0)', textAlign: 'center'}}>{num}
             </Text>
          </ImageBackground>
        </View>
        <Text style={{fontSize: 16,
                      textAlign:'center',
                      color: '#ff7685'}}>Before Tax:
          <Text style={{fontSize: 24,}}> ${total.toFixed(2)}</Text>
        </Text>
        <TouchableOpacity
          style={{paddingLeft: 36,
                  paddingRight: 36,
                  backgroundColor: '#ff7685',
                  justifyContent: 'center'}}
          activeOpacity={0.6}>
          <Text style={{textAlign:'center', color: 'white', fontSize: 16}}>提交订单</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.navigation, {height: navigationHeight}]}>
			    	<View style={styles.back}>
			    	</View>
			    	<View style={styles.title}>
			       		<Text style={ {textAlign:'center', fontSize:20, fontWeight: '700'} }>购物箱</Text>
			    	</View>
			    	<View style={{flex:1}}>
            </View>
			  </View>
        <View style={styles.separator}>
  			</View>
        <ScrollView ref={(ref) => {this._scrollViewRef = ref}}
                    style={{flex:1,
                            marginTop:0,
                            marginBottom:60,
                            paddingLeft:15,
                            paddingRight:15,}}>
          {this._renderProductList()}

        </ScrollView>
        {this._rederFooter()}
        {this._renderGoBackBtn()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		marginTop: 12,
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
  separator: {
		height: 1,
		borderWidth: 0.6,
		borderColor: "#D5D5D5"
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
