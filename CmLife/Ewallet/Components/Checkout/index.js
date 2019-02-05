
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
  ImageBackground,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

import SboxHeader from './Header';
import UserInfo from '../AddAddressInfo/UserInfo';
// import SboxCart from '../SboxCart';
import CheckoutButton from './CheckoutButton';

import CommentModal from 'react-native-modalbox';
import CheckoutModule from '../../Modules/CheckoutModule/CheckoutModule';

// import SboxOrderAction from '../../Actions/SboxOrderAction';
// import SboxProductAction from '../../Actions/SboxProductAction';
// import SboxOrderStore from '../../Stores/SboxOrderStore';


// import { SBOX_REALM_PATH } from '../../Config/API';

// const Realm = require('realm');
// const realm = new Realm({path: SBOX_REALM_PATH});

const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;


export default class MyComponent extends Component {
  static navigatorStyle = {
      screenBackgroundColor: 'transparent',
      modalPresentationStyle: 'overFullScreen'
  }
  constructor(props) {
    super(props);
    this.state = ({
      addr:props.addr,
      name:props.name,
      phoneNumber: props.tel,
      unitNumber:props.unit,
      product: props.selectedProduct,
      last4:props.last4
    })
    // this.state = SboxOrderStore.getState();

    // this._onChange = this._onChange.bind(this);
    // this._handleLoginGoBack = this._handleLoginGoBack.bind(this);
    // this._handleSuccessful = this._handleSuccessful.bind(this);
    // this._handleSoldOut = this._handleSoldOut.bind(this);
    // this._handleError = this._handleError.bind(this);
    //
    this._goToAddress = this._goToAddress.bind(this);
    this._goToAddCard = this._goToAddCard.bind(this);
    // this._goBack = this._goBack.bind(this);
    //
    // this._getOrderBefore= this._getOrderBefore.bind(this);
    this._doCheckout = this._doCheckout.bind(this);
    this._renderFooter = this._renderFooter.bind(this);
    this._renderGoBackBtn = this._renderGoBackBtn.bind(this);
    this._renderItem = this._renderItem.bind(this);
    this.changeLast4 = this.changeLast4.bind(this);
    // this._renderCheckout = this._renderCheckout.bind(this);
    // this._renderHeader = this._renderHeader.bind(this);
    // this._renderComment = this._renderComment.bind(this);
    // this._keyExtractor = this._keyExtractor.bind(this);
    // this._renderDiscountMessage=this._renderDiscountMessage.bind(this);
    // this._renderDeliveryFee=this._renderDeliveryFee.bind(this);
    // this._renderOriginalPrice=this._renderOriginalPrice.bind(this);
    // this._existDiscount=this._existDiscount.bind(this);

  }
  componentDidMount() {
    this._checkCardInfo();
  }
  async _checkCardInfo() {
    // const last4 = await CheckoutModule.getOrderBefore();
    const last4 = '1111';
    if(last4.last4.length === 0){
      this.props.navigator.push({
        screen: "EwalletAddCard",
        passProps: {
          changeLast4: this.changeLast4
        },
        navigatorStyle: {navBarHidden:true},
      });
    }
  }
  changeLast4(last4) {
    this.setState({
      last4: last4
    })
  }
  // componentWillUnmount() {
  //   SboxOrderStore.removeChangeListener(this._onChange);
  // }
  //
  // _onChange() {
  //     const state = Object.assign({},SboxOrderStore.getState());
  //     this.setState(state);
  //     this._handleCheckoutStatus();
  // }
  //
  // _handleCheckoutStatus() {
  //   switch(this.state.checkoutStatus){
  //     case "shouldDoAuth":
  //       this._goToLogin();
  //     break;
  //     case "soldOut":
  //       this._goBack();
  //     break;
  //     case "shouldAddAddress":
  //       this._goToAddress();
  //     break;
  //     case "shouldAddCard":
  //       setTimeout( () => {
  //           this._goToAddCard();
  //       }, 500);
  //
  //     break;
  //     case "successful":
  //       this._handleSuccessful();
  //     break;
  //     case "soldOut":
  //       this._handleSoldOut();
  //     break;
  //     case "error":
  //       this._handleError();
  //     break;
  //   }
  // }
  // _handleLoginGoBack() {
  //   // dismissAllModals bug
  //   this.props.navigator.dismissModal({
  //     animationType: 'slide-down'
  //   });
  //   setTimeout( () => {
  //     this.props.navigator.dismissModal({
  //       animationType: 'none'
  //     });
  //   }, 600);
  // }
  // _handleLoginSuccessful() {
  //   // SboxOrderAction.getOrderBefore();
  // }
  // _handleSuccessful() {
  //   // this.props.navigator.showInAppNotification({
  //   //  screen: "Notification",
  //   //  passProps: {
  //   //    backgroundColor:'#ff768b',
  //   //    title:'甜满箱',
  //   //    content:'下单成功'
  //   //  },
  //   //  autoDismissTimerSec: 5
  //   // });
  //   const {checkoutStatus} = this.state;
  //   this.props.navigator.resetTo({
  //       screen: 'SboxMainTab',
  //       passProps: {checkoutStatus},
  //       animated: true,
  //       animationType: 'fade',
  //       navigatorStyle: {navBarHidden: true},
  //     });
  //
  // }
  // _handleSoldOut() {
  //   // this.props.navigator.showInAppNotification({
  //   //  screen: "Notification",
  //   //  passProps: {
  //   //    backgroundColor:'#ff768b',
  //   //    title:'甜满箱 下单失败',
  //   //    content:'商品售完，请重新下单'
  //   //  },
  //   //  autoDismissTimerSec: 5
  //   // });
  //   this.props.navigator.dismissModal({
  //     animationType: 'slide-down'
  //   });
  //   setTimeout(() => {
  //     this.props.navigator.showModal({
  //       screen: 'SboxNotification',
  //       passProps: {checkoutSuccessful: false},
  //       navigatorStyle: {navBarHidden: true},
  //     });
  //   }, 800);
  // }
  // _handleError() {
  //   // this.props.navigator.showInAppNotification({
  //   //  screen: "Notification",
  //   //  passProps: {
  //   //    backgroundColor:'#ff768b',
  //   //    title:'甜满箱 下单失败',
  //   //    content:'System Error 请稍后尝试'
  //   //  },
  //   //  autoDismissTimerSec: 5
  //   // });
  //   this.props.navigator.dismissModal({
  //     animationType: 'slide-down'
  //   });
  //   setTimeout(() => {
  //     this.props.navigator.showModal({
  //       screen: 'SboxNotification',
  //       passProps: {checkoutSuccessful: false},
  //       navigatorStyle: {navBarHidden: true},
  //     });
  //   }, 800);
  // }
  //
  // _goBack(){
  //   this.props.navigator.dismissModal({
  //     animationType: 'slide-down'
  //   });
  // }
  // _goToLogin() {
  //   // this.props.navigator.showModal({
  //   //   screen: 'SboxAddAddress',
  //   //   navigatorStyle: {navBarHidden: true},
  //   // })
  //     this.props.navigator.showModal({
  //       screen: 'CmLogin',
  //       animationType: 'slide-up',
  //       navigatorStyle: {navBarHidden: true},
  //       passProps: {handleBackToHome: this._handleLoginGoBack,
  //                   handleLoginSuccessful: this._handleLoginSuccessful},
  //     })
  // }
  _goToAddress() {
    this.props.navigator.push({
      screen: 'EwalletAddAddress',
      navigatorStyle: {navBarHidden: true},
    })
  }
  _goToAddCard() {
    this.props.navigator.push({
        screen: "EwalletAddCard",
        navigatorStyle: {navBarHidden:true},
      });
  }
  //
  //
  //

  async _doCheckout() {
    try{
      this.setState({showLoading:true})
      const data = await CheckoutModule.addOrder(this.props.selectedProduct.sku_id, this.props.value);
      this.props.navigator.push({
        screen: "EwalletCheckoutStatus",
        navigatorStyle: {navBarHidden: true},
        passProps: {
          checkoutSuccessful:true,
          oid:data.oid,
          goToPage:this.props.goToPage
        },
        autoDismissTimerSec: 3
       });
    } catch(e) {
      this.props.navigator.push({
        screen: "EwalletCheckoutStatus",
        navigatorStyle: {navBarHidden: true},
        passProps: {
          checkoutSuccessful:false,
          goToPage:this.props.goToPage
        },
        autoDismissTimerSec: 3
       });
    }
  }

  _renderGoBackBtn() {
    this.props.navigator.pop({
      animationType: 'none'
    });
  }
  _renderFooter() {
      if(this.state.showLoading){

      return(
        <View style={[styles.submitButton,
              {backgroundColor:'#ff768b'}]}>
              <Image source={require('./Img/Loading_dots_white.gif')}  style={{width:45,height:15}}/>
        </View>
      )
    }else{
      return(
        <TouchableOpacity  style={{
                  position:'absolute',
                  bottom:0,
                  width:width,
                  height:60,
                  backgroundColor:'#ff7685',}}
          onPress={() => this._doCheckout()}
          activeOpacity={0.4}>
          <View style={{flex:1,
                        alignItems:'center',
                        justifyContent:'center',}}>
              <Text style={{color:'#ffffff',
                            fontSize:20,
                            }}
                    allowFontScaling={false}>
                确认下单
              </Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
  _renderItem() {
    const {image_url,name} = this.state.product;
    const value = this.props.value;
    return(
      <View style={styles.item}>

        <Image style={styles.image} source={{uri:image_url}}/>

        <View style={{flex:1,flexDirection:'row',marginLeft:20}}>
          <View style={{flex:0.7,paddingRight:10,}}>
            <Text numberOfLines={2}
                  style={{fontSize:15,
                          }}
                  allowFontScaling={false}>
                {name}
            </Text>
          </View>
          <View style={{flex:0.3, justifyContent: 'space-between', flexDirection: 'column'}}>
            <Text style={{fontSize:16,textAlign: 'right'}}
                  allowFontScaling={false}>
            ${value}
            </Text>
          </View>
        </View>
      </View>
    )
  }
  _keyExtractor = (item, index) => item.sku_id;
  _renderUserInfo() {
    // if(!this.state.checkoutStatus == 'shouldAddAddress'){
    //   return(
    //     <TouchableOpacity onPress={this._goToAddress}>
    //       <View style={{flexDirection:'row',
    //                     alignItems:'center',
    //                     borderStyle:'dashed',
    //                     borderWidth:2,
    //                     borderColor:'#ff7685',
    //                     padding:10
    //                   }}>
    //         <Image source={require('./Img/address.png')}
    //                style={{height:25*1.2264,width:25}}
    //         />
    //         <Text style={{fontSize:20,
    //                       ,
    //                       marginLeft:20,}}
    //               allowFontScaling={false}>
    //           请选择您的配送地址
    //         </Text>
    //       </View>
    //       </TouchableOpacity>
    //   )
    // }else{
      return(
        <TouchableOpacity
                      onPress={this._goToAddress} style={{  borderStyle:'dashed',
                        borderWidth:2,
                        borderColor:'#ff7685',
                        padding:10,}}>
            <UserInfo addr={this.props.addr}
                      name={this.props.name}
                      phoneNumber={this.props.tel}
                      unitNumber={this.props.unitNum}
            />
        </TouchableOpacity>
      )
    // }

  }
  _renderDiscountMessage(messageList)
  {
    let _messageList = [];

    for (i=0;i<messageList.length;i++)
    {
      // alert(messageList[i].message);
      _messageList.push(
        <View key={i} style={{flexDirection:'row',
               alignItems: 'center',
               justifyContent:'center',

               width:width*0.5,
             }}>
                <View style={{alignItems:'center',
                marginLeft:15,
                height:35,
                flexDirection:'row',
                width:width*0.5,}}>
                  <Image
                    style={{width:33,height:20,}}
                    source={{uri:messageList[i].image}}
                  />
                   <Text style={{fontSize:16,
                                 marginLeft:5}}
                         allowFontScaling={false}>
                      {messageList[i].message}
                   </Text>

               </View>
        </View>
      )
    }
    return _messageList;
  }
  _renderDeliveryFee()
  {
    if (this.state.deliFee>0) return (
      <View style={{flex:0.5,}}>
        <Text style={{fontSize:16,
                      }}
              allowFontScaling={false}>
                Delivery Fee: ${this.state.deliFee}
        </Text>
      </View>
    );
  }

  _renderOriginalPrice()
  {
    return (
      <Text style={{fontSize:16,

                    color:'grey',
                    textDecorationLine:'line-through'}}
            allowFontScaling={false}>
          $110.08
      </Text>
    )
  }
  // _existDiscount()
  // {
  //   if (this.state.ea_discount_message.length>0) return (
  //     <View style={{flexDirection: 'row',
  //            flexWrap: 'wrap',
  //
  //            borderBottomWidth: 1,
  //            borderBottomColor: '#DCDCDC',
  //          }}>
  //       {this._renderDiscountMessage(this.state.ea_discount_message)}
  //     </View>
  //   )
  // }
  _renderOrderInfo() {
    console.log(this.state);
    return(
      <View style={{
                    marginTop:15,
                    backgroundColor:'white',
                    height:70,
                  }}>



            <View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#DCDCDC',alignItems:'center',paddingRight:10,}}>
              <View style={{flex:0.5,}}>
                <Text style={{fontSize:16,marginLeft:10,
                              }}
                      allowFontScaling={false}>
                        Total:
                        <Text style={{fontSize:16,
                                      color:'#ff7685'}}
                              allowFontScaling={false}>
                            ${this.props.value}

                        </Text>
                </Text>
              </View>


            </View>


          <TouchableOpacity
                      onPress={this._goToAddCard}
                      style={{
                        padding:10,
                        flexDirection:'row',
                        borderBottomWidth: 1,
                        borderColor: '#DCDCDC',
                        flex:0.5,

                        }}>
            <View style={{flex:0.5,
            }}>
              <Text style={{fontSize:16,
                            }}
                    allowFontScaling={false}>
                      支付方式:
              </Text>
            </View>
            <View style={{flex:0.5, alignItems:'flex-end'}}>
              <Text style={{fontSize:16,
                            }}
                    allowFontScaling={false}>
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
      </View>
    )

  }
  // _renderCheckout(){
  //
  //   const cartList = this.state.cartList.map((item,key) => {
  //     return this._renderItem(item,key)
  //   })
  //   return (
  //     <View style={styles.container}>
  //       <SboxHeader title={"结账"}
  //               goBack={this._renderGoBackBtn}
  //               leftButtonText={'x'}/>
  //               <ScrollView style={{marginBottom:40}}>
  //                 {this._renderHeader()}
  //                 {cartList}
  //               </ScrollView>
  //               {this._renderComment()}
  //               {this._rederFooter()}
  //     </View>
  //   );
  // }
  // _renderComment(){
  //   return(
  //     <CommentModal  style={styles.modal}
  //                    position={"center"}
  //                    isOpen={this.state.openEditComment}
  //                    onClosed={()=>{this.setState({openEditComment:false})}}>
  //       <TextInput style={styles.TextInput}
  //                  placeholder="备注"
  //                  selectionColor="#ff8b00"
  //                  multiline={true}
  //                  value={this.state.comment}
  //                  onChangeText={(text) => {this.setState({comment:text})}}
  //                  underlineColorAndroid={"rgba(0,0,0,0)"}>
  //       </TextInput>
  //     </CommentModal>
  //   )
  //
  // }
  render() {

      return(
        <View style={{flex:1,backgroundColor:'white'}}>
          <SboxHeader title={"确认订单"}
                  goBack={this._renderGoBackBtn}
                  leftButtonText={'x'}/>
          {this._renderUserInfo()}

          {this._renderOrderInfo()}
          {this._renderItem()}
          {this._renderFooter()}
        </View>
      )
    // }else{
    //   return this._renderCheckout()
    // }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#ffffff",
  },
  modal: {
   justifyContent: 'center',
   height: 350,
   width: 300,
  },
  TextInput:{
    flex:1,
    color:'#000000',
    fontSize:16,
    padding:3,
    paddingLeft:6,
    backgroundColor:'#ffffff',
    borderRadius:6,
    borderColor:'#b1b1b1',
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
  submitButton: {
    position:'absolute',
    bottom:0,
    width:width,
    height:60,
    backgroundColor:'#ff7685',
    alignItems:'center',
    justifyContent:'center',
  }
});
