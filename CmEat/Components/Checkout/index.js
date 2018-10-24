'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Alert,
  Dimensions,
  Easing,
	Keyboard,
  Image,
  InteractionManager,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	Platform,
	StatusBar,
	KeyboardAvoidingView,
	NativeModules
} from 'react-native';

import Background from '../General/Background';
import CheckoutCard from './CheckoutCard';
import Address from './Address';
// import Picker from './Picker';
import CartItem from './CartItem';
import Header from '../General/Header';
import Loading from '../Helpers/Loading';
import CheckoutItem from './CheckoutItem';
import CheckoutComment from './CheckoutComment';
import CommentModal from 'react-native-modalbox';
import OrderConfirm from './OrderConfirm';

import CheckoutAction from '../../Actions/CheckoutAction';
import CheckoutStore from '../../Stores/CheckoutStore';
import SecondMenuStore from '../../Stores/SecondMenuStore';
import MenuStore from '../../Stores/MenuStore';
import HistoryAction from '../../Actions/HistoryAction';
import Util from '../../Modules/Util';
import Label from '../../../App/Constants/AppLabel';

import Alipay from '../../../Alipay/Alipay';
import TabsAction from '../../Actions/TabsAction';
import CartAPI from '../../Modules/OrderModule/CartApi';
import OrderAction from '../../Actions/OrderAction';
import PopupView from '../Popup/PopupView'

// device(size): get device height and width
const {height, width} = Dimensions.get('window');
const deviceHeight = height;
const deviceWidth = width;
let marginTop,headerHeight,acceptButtonHeight;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 34;
  headerHeight = 88;
  acceptButtonHeight = 80;
}else{
  marginTop = 20;
  headerHeight = 64;
  acceptButtonHeight = 50;
}


// const(refs): define comment refeneces
const COMMENT_INPUT = 'Comment_Input';
const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
class Confirm extends Component {
    constructor(props) {
				super(props);
        const cart = MenuStore.getCart();
				const total = MenuStore.getCartTotals().total;
        const state={ cart,
                      total,
											rid:this.props.restaurant.rid,
                      startAmount:this.props.restaurant.start_amount,
                      viewBottom:new Animated.Value(0),
											anim: new Animated.Value(0), //for background image
											AnimatedImage:props.restaurant.mob_banner,
											renderAddress:true,
											loading: true,
											showOrderConfirm:false,
											paymentStatus:'添加支付方式',
											tips:0,
											tipsPercentage:0.1,
											selectedCase: {fees: {},
							                       payment_channel: 0,
							                       dltype: 1},
											couponCodeTextInput: "",
											coupon_code: "",
											tabAnim: new Animated.Value(12)
                    }
				this.state = Object.assign({},state,CheckoutStore.getState())
        this._onChange = this._onChange.bind(this);
        this._updateUaid = this._updateUaid.bind(this);
				this._saveModificationCallback = this._saveModificationCallback.bind(this);
				this._stripeCardAdded = this._stripeCardAdded.bind(this);
				this._alipaySelected = this._alipaySelected.bind(this);
				this._cashSelected = this._cashSelected.bind(this);
				this._applePaySelected = this._applePaySelected.bind(this);
				this._previousCardSelected = this._previousCardSelected.bind(this);
        this._updateDltype = this._updateDltype.bind(this);
        this._calculateDeliveryFee = this._calculateDeliveryFee.bind(this);
        this._checkout = this._checkout.bind(this);
				this._handleAddressAdded = this._handleAddressAdded.bind(this);
				this._goToChoosePayment = this._goToChoosePayment.bind(this);
        this._goBack = this._goBack.bind(this);
        this._goToAddressList = this._goToAddressList.bind(this);
        this._goToHistory = this._goToHistory.bind(this);
        this._doCheckout = this._doCheckout.bind(this);
        this._handleCommentChange = this._handleCommentChange.bind(this);
        this._handleSubmitComment = this._handleSubmitComment.bind(this);
				this._handleProductOnPress = this._handleProductOnPress.bind(this);
				this._closeOrderConfirm = this._closeOrderConfirm.bind(this);
				this._renderRestaurantName = this._renderRestaurantName.bind(this);
				this._renderPriceDetail = this._renderPriceDetail.bind(this);
				this._renderPriceTotal = this._renderPriceTotal.bind(this);
				this._beforeCheckoutUpdateItems = this._beforeCheckoutUpdateItems.bind(this);

				this._checkCouponOnPress = this._checkCouponOnPress.bind(this);
				this._cancelCouponOnPress = this._cancelCouponOnPress.bind(this);
				this._applyCouponOnPress = this._applyCouponOnPress.bind(this);
				this._deliverAnimation = this._deliverAnimation.bind(this);

				this.popupView = PopupView.getInstance();
    }

    componentDidMount(){
			CheckoutStore.addChangeListener(this._onChange);
			const rid = this.state.rid;
			CheckoutAction.beforeCheckoutInit({rid});
    }
    componentWillUnmount() {
			CheckoutStore.removeChangeListener(this._onChange);
    }
    _onChange(){
				const state = Object.assign({},CheckoutStore.getState());
				this.setState(Object.assign({}, state));
				if(!state.selectedAddress || !state.selectedAddress.hasOwnProperty('uaid')){
					setTimeout( () => {
						this.props.navigator.showModal({
							screen: 'CmEatAddress',
							animated: true,
							passProps:{
								updateUaid:this._updateUaid,
								handleAddressAdded: this._handleAddressAdded},
							navigatorStyle: {navBarHidden: true},
						});
					}, 500);
				}
				if (state.alertMsg.length > 0) {
					this.popupView.showAlertWithTitle(this, "错误", state.alertMsg);
				}
				// if (state.coupon_code.length > 0 && !state.selectedCase.using_coupon) {
				// 	this.popupView.showAlertWithTitle(this, "错误", "优惠码条件不满足 无法在当前使用");
				// }
				// Coupon state update
				if (state.returnCoupon){
					if (state.returnCoupon.valid != false && state.returnCoupon.ev_error != 1) {
						const returnCoupon = state.returnCoupon;
						this.popupView.setFullPopup(
					    {
					      title: this.props.restaurant.name,
					      subtitle: state.returnCoupon.info,
					      detailText: '折扣码\n' + this.state.couponCodeTextInput,
					      icon: require('./Image/coupon_icon.jpg'),
					      cancelText: "取消",
								confirmButtonStyle: {backgroundColor: '#4397DC',},
					      onConfirm: () => {
									this._applyCouponOnPress();
								},
								onCancel: () => {},
								onDismiss: () => {this.setState({showPopup: false, couponCodeTextInput: ""})},
					    },
					  );
						this.setState({showPopup: true});
					}
					this.setState({returnCoupon: null});
				}

				// else if (!this.state.jumpToChoosePayment && state.jumpToChoosePayment && state.available_payment_channels.length != 1) {
				// 	setTimeout( () => {
				// 		this.props.navigator.showModal({
				// 			screen: 'CmChooseCardType',
				// 			animated: true,
				// 			passProps:{available_payment_channels: this.state.available_payment_channels,
				// 								 stripeCardAdded: this._stripeCardAdded,
				// 								 alipaySelected: this._alipaySelected,
				// 								 cashSelected: this._cashSelected,
				// 								 applePaySelected:	this._applePaySelected,
				// 								 previousCardSelected: this._previousCardSelected,
				// 								 flag: 'fromCheckout',
				// 								 cusid: this.state.cusid,
				// 								 last4: this.state.last4,
				// 								 brand: this.state.brand},
				// 			navigatorStyle: {navBarHidden: true,},
				// 		});
				// 	}, 500);
				// }
				// this.setState(state);
				// if(state.payment_channel != 0) {
				// 	setTimeout( () => {
				// 		this.setState({
				// 			tips: (parseFloat(state.total)*0.1).toFixed(2),
				// 		});
				// 	}, 300);
				// }
				//
				//
				if(state.goToHistory) {
					this.props.navigator.dismissModal({animationType: 'slide-down'});
					setTimeout(() => {
						TabsAction.tab_go_to_history(state.paymentFail);
					}, 800);
				}
				else if(state.checkoutSuccessful){
					this.setState({
		        		loading:true,
						showOrderConfirm:false,
						checkoutSuccessful: false,
		      });
					// if the distance is < 8km (which means dlexp > 0) and payment_channel is not 0, do the charging
					if (!state.selectedCase.custom_dlexp && state.payment_channel != 0) {
						if (state.payment_channel == 1) {
							CheckoutAction.stripeChargeAndUpdate({amount: state.selectedCase.fees.charge_total,
																					 					oid: state.oidFromUrl,
																										checkoutFrom: 'checkout'});
						}
						else if (state.payment_channel == 10) {
							this.props.navigator.dismissModal({animationType: 'slide-down'});
							setTimeout(() => {
								CheckoutAction.afterPayGoToHistory();
								Alipay.constructAlipayOrder({total: state.selectedCase.fees.charge_total.toString(),
																						 oid: state.oidFromUrl});
							}, 300);
						}
						else if(state.payment_channel == 30){
							let paymentData = {
								subtotal: (state.selectedCase.fees.pretax - state.selectedCase.fees.total_off).toString(),
								shipping: state.selectedCase.fees.dlexp.toString(),
								tax: state.selectedCase.fees.tax.toString(),
								tips: state.selectedCase.fees.service_fee.toString(),
								oid: state.oidFromUrl,
								amount: state.selectedCase.fees.charge_total,
								discount: state.selectedCase.fees.total_off
							};

							CheckoutAction.checkoutByApplepay(paymentData, ()=>this._goToHistory());

						}
						// setTimeout(() => {
						// 	HistoryAction.getOrderData();
						// 	this.props.navigator.dismissModal({animationType: 'slide-down'});
						// }, 2000);
					}else {
						this.props.navigator.dismissModal({animationType: 'slide-down'});
						setTimeout(()=> {
							TabsAction.tab_go_to_history();
						}, 800);
					}
				}
    }
		_handleAddressAdded() {
			CheckoutAction.updateShouldAddAddress(false);
		}
    _updateUaid(address){
      if(address && address.uaid){
        const uaid = address.uaid;
        this.setState({
          uaid:uaid,
        })
        // this._calculateDeliveryFee();
				const data = {
					ticket_id: this.state.ticket_id,
					address
				}
				CheckoutAction.beforeCheckoutUpdateAddress(data);
      }
    }
    _updateDltype(deliverType){
			if(!this.state.loading){
				this.setState({loading: true});
				this._deliverAnimation(deliverType);
				CheckoutAction.updateDltype(deliverType);
				// this.setState({dltype:deliverType.type,
				// 							 loading:true,
				// 							 tips: 0,
				// 							 tipsPercentage: 0.1});
				// const dltype = deliverType.type;
				// CheckoutAction.updateDltype(dltype);
				// CheckoutAction.updatePaymentStatus(0);
			}
    }
    _calculateDeliveryFee(){
			this.setState({
				loading:true,
			})
      CheckoutAction.calculateDeliveryFee()
    }
    _doCheckout(){
		if (this.state.payment_channel < 0) return;
		this.setState({
			loading:true,
			showOrderConfirm:false,
		})
      // CheckoutAction.checkout(this.state.comment,
			// 												this.state.payment_channel,
			// 												this.state.tips,
			// 												this.state.visa_fee);
			CheckoutAction.checkout({
															 ticket_id: this.state.ticket_id,
															 sign: this.state.selectedCase.sign,
															 dltype: this.state.dltype,
															 payment_channel: this.state.payment_channel,
															 charge_total: this.state.selectedCase.fees.charge_total,
															 rid: this.state.rid
															});
    }
    _checkout(){

      let dldec;
      switch (this.state.dltype) {
        case 0:
          dldec = Label.getCMLabel('PICK_UP')
        break;
        case 1:
          dldec = Label.getCMLabel('DELIVER')
        break;
        case 2:
          dldec = Label.getCMLabel('SET_DELIVER_FEE')
        break;
      }
			this.setState({
				showOrderConfirm:true
			});
    }
		_closeOrderConfirm(){
			this.setState({showOrderConfirm:false});
		}
    _goBack(){
      this.props.navigator.pop();
    }
		_goToChoosePayment(){
			if (this.state.cases.length != 1) {
				const available_payment_channels = [];
				for (let _case of this.state.cases) {
					if (_case.dltype == this.state.dltype) {
						available_payment_channels.push(_case);
					}
				}
				this.props.navigator.showModal({
					screen: 'CmChooseCardType',
					animated: true,
					passProps:{available_payment_channels: available_payment_channels,
										 stripeCardAdded: this._stripeCardAdded,
								 		 alipaySelected: this._alipaySelected,
										 cashSelected: this._cashSelected,
										 applePaySelected:	this._applePaySelected,
										 previousCardSelected: this._previousCardSelected,
										 flag: 'fromCheckout',
								 		 cusid: this.state.cusid,
								 		 last4: this.state.last_payment.stripe_last4,
								 		 brand: this.state.last_payment.stripe_brand},
					navigatorStyle: {navBarHidden: true,},
				});
      }
		}
    _goToAddressList(){
			if(!this.state.loading){
				if (Util.getWaitingStatus() === true){
				  return;
				}
				Util.toggleWaitingStatus();

				this.props.navigator.showModal({
					screen: 'CmEatAddress',
          animated: true,
          passProps:{updateUaid:this._updateUaid},
          navigatorStyle: {navBarHidden: true},
				});
			}
    }
    _goToHistory(){
			CheckoutAction.afterPayGoToHistory();
    }
    showLoading(){
      if(this.state.isLoading)
        return(<Loading />)
    }
    _handleCommentChange(comment){
      this.setState({
        comment:comment,
      });
    }
    _handleSubmitComment(commentInput){
      this.commentInput = commentInput;
      commentInput.blur();
      if(this.state.comment.length > 0){
        const pid = this.state.pid;
        const comment = this.state.comment;
        const view = 'comment';
        const data = {pid,comment,view};
        TheSixAction.submitComment(data);
      }
    }
		_handleProductOnPress(dish) {
			if (dish.tpgs) {
				if (Util.getWaitingStatus() === true){
					return;
				}
				Util.toggleWaitingStatus();

				const rid = this.state.rid;
				const pretax = MenuStore.getCartTotals().total;
				const navigator = this.props.navigator;
				const startAmount = this.state.startAmount;
				SecondMenuStore.getOptions({'toppingGroupList': dish.tpgs, 'price': dish.price, 'qty': dish.qty});
				this.props.navigator.showModal({
					screen: 'CmSecondMenu',
					animated: true,
					passProps:{dish,
					           'action': 'modify',
									   rid,
									   pretax,
									   startAmount,
									   saveModificationCallback: this._saveModificationCallback},
					navigatorStyle: {navBarHidden: true},
				});
			} else {
				// alert('123');
				this.popupView.setMessagePopup(
					{
						title: '确定删除',
						subtitle: dish.ds_name + ' x ' + dish.qty,
						cancelText: "取消",
						confirmButtonStyle: {backgroundColor: '#ea7b21',},
						onConfirm: () => {
							this.setState({loading: true});
							OrderAction.removeItem(dish);
							this._beforeCheckoutUpdateItems();
							if(this.state.cart.length === 0){
								this.props.navigator.pop();
							}
						},
						onCancel: () => {},
						onDismiss: () => {this.setState({showPopup: false})},
					},
				);
				this.setState({showPopup: true});
			}
		}
		_beforeCheckoutUpdateItems() {
			const ticket_id = this.state.ticket_id;
			CheckoutAction.beforeCheckoutUpdateItems({ticket_id});
		}
		_handleScroll(e) {
      if(e.nativeEvent.contentOffset.y < 300){
        // this.state.anim.setValue(e.nativeEvent.contentOffset.y);
        // const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      }
    }


		_saveModificationCallback() {
			const cart = MenuStore.getCart();
			if(cart.length === 0){
				this.props.navigator.pop();
			} else {
				const state = Object.assign({}, this.state, {cart, loading: true});
				this.setState(state);
				this._beforeCheckoutUpdateItems();
			}
			// const rid = this.state.rid;
			// const pretax = MenuStore.getCartTotals().total;
			// const startAmount = this.state.startAmount;
			// CheckoutAction.beforCheckout(rid,pretax,startAmount);
			//
			// const state = Object.assign({},CheckoutStore.getState(),{cart:cart, pretax: pretax});
			// this.setState(state);
		}
		_stripeCardAdded() {
			const cart = MenuStore.getCart();
			const rid = this.state.rid;
			const pretax = MenuStore.getCartTotals().total;
			const startAmount = this.state.startAmount;
			CheckoutAction.beforCheckout(rid,pretax,startAmount);
			const newState = CheckoutStore.getState();
			const state = Object.assign({},newState,
																	{cart:cart,
																	 pretax: pretax,
																	 tips: parseFloat(newState.total*0.1).toFixed(2),
																 	 tipsPercentage:0.1});
			this.setState(state);
			setTimeout( () => {
				CheckoutAction.updatePaymentStatus(1);
			}, 500);
		}
		_alipaySelected() {
			CheckoutAction.updatePaymentStatus(10);
			this.setState({tips: parseFloat(this.state.total*0.1).toFixed(2),
										 tipsPercentage:0.1});
		}
		_applePaySelected(){
			CheckoutAction.updatePaymentStatus(30);
			this.setState({tips: parseFloat(this.state.total*0.1).toFixed(2),
										 tipsPercentage:0.1});
		}

		_cashSelected() {
			CheckoutAction.updatePaymentStatus(0);
			this.setState({tips: 0,
										 tipsPercentage:0.1});
		}

		_previousCardSelected() {
			CheckoutAction.updatePaymentStatus(1);
			// this.setState({tips: parseFloat(this.state.total*0.1).toFixed(2),
			// 							 tipsPercentage:0.1});
		}

		_setTips(tipsPercentage){
			this.setState({
				tips:(this.state.total * tipsPercentage).toFixed(2),
				tipsPercentage:tipsPercentage,
			})
		}

		_checkCouponOnPress(){
			Keyboard.dismiss();

			if (!this.state.couponCodeTextInput || this.state.couponCodeTextInput.length == 0){
				this.popupView.showAlert(this, "请输入优惠码");
				return;
			}
			CheckoutAction.checkCouponCode(this.state.couponCodeTextInput);
			// setTimeout(() => {
			// 	this.setState(Object.assign({}, this.state, {couponCodeTextInput: ''}));
			// }, 200);
		}
		_cancelCouponOnPress(){
			const data = {
				ticket_id: this.state.ticket_id,
				coupon_code: "",
			}
			this.setState({loading: true});
			CheckoutAction.beforeCheckoutUpdateCoupon(data);
		}
		_applyCouponOnPress(){
			if (!this.state.couponCodeTextInput || this.state.couponCodeTextInput.length == 0){
				this.popupView.showAlert(this, "请输入优惠码")
				return;
			}
			const data = {
				ticket_id: this.state.ticket_id,
				coupon_code: this.state.couponCodeTextInput,
			}
			this.setState({loading: true});
			CheckoutAction.beforeCheckoutUpdateCoupon(data);
		}
		_renderAndroidCheckoutButton(){
			if (Platform.OS !== 'ios') {
				if(this.state.selectedAddress && this.state.selectedAddress.hasOwnProperty("uaid") && !this.state.loading){
					return(
						<TouchableOpacity
										activeOpacity={0.4}
										onPress={this._checkout}>
								<View style={[styles.acceptButton, {marginBottom: 50, justifyContent: 'center'}]}>
									<Text style={styles.acceptText}
												allowFontScaling={false}>
										{Label.getCMLabel('CHECK_OUT')}
									</Text>
								</View>
						</TouchableOpacity>
					)
	      	}else if(this.state.loading){
				return(
					<View style={styles.acceptButton}>
							<Image source={require('./Image/Loading_dots_white.gif')}  style={{width:45,height:15}}/>
					</View>
				)
			}else{
	        return(
	          <TouchableOpacity activeOpacity={0.4}
															style={{marginBottom: 20}}
															onPress={()=>{this._goToAddressList()}}>
	            <View style={[styles.acceptButton, {justifyContent: 'center'}]}>
	              <Text style={{color:'#ffffff',fontSize:20,fontFamily:'FZZhunYuan-M02S',}}
											allowFontScaling={false}>{Label.getCMLabel('ADD_ADDRESS')}</Text>
	            </View>
	          </TouchableOpacity>

	        )
	      }
			}
		}

		renderCheckoutButton(){
			if (Platform.OS == 'ios') {
				if(this.state.selectedAddress && this.state.selectedAddress.hasOwnProperty("uaid") && !this.state.loading){
	        return(
	            <TouchableOpacity activeOpacity={0.4}
	                              onPress={this._checkout}>
										<View style={styles.acceptButton}>
											<Text style={styles.acceptText}
														allowFontScaling={false}>
												 实付: ${this.state.selectedCase.fees.charge_total}
											</Text>
											<Text style={styles.acceptText}
														allowFontScaling={false}>
												 {Label.getCMLabel('CHECK_OUT')}
											</Text>
										</View>
	            </TouchableOpacity>
	        )
	      }else if(this.state.loading){
					return(
						<View style={styles.pendingButton}>
								<Image source={require('./Image/Loading_dots_white.gif')}  style={{width:45,height:15}}/>
						</View>
					)
				}else{
	        return(
	          <TouchableOpacity activeOpacity={0.4}
															onPress={()=>{this._goToAddressList()}}>
	            <View style={styles.pendingButton}>
	              <Text style={{color:'#ffffff',fontSize:20,fontFamily:'FZZhunYuan-M02S',}}
											allowFontScaling={false}>
									{Label.getCMLabel('ADD_ADDRESS')}
								</Text>
	            </View>
	          </TouchableOpacity>

	        )
	      }
			}
    }
		_renderRestaurant(){
			return(
				<View>
					<Text style={{color:'#363646',
												fontSize:25,
												fontWeight:'500',
												textAlign:'center',
												marginTop:20,
												fontFamily:'FZZongYi-M05S',
											}}
								allowFontScaling={false}>
				 		{this.props.restaurant.name}
					</Text>
					<Text style={{color:'#ababb0',
												fontSize:13,
												fontWeight:'400',
												marginTop:10,
												textAlign:'center',
												fontFamily:'FZZhunYuan-M02S',}}
								allowFontScaling={false}>
						{this.props.restaurant.desc}
					</Text>
					<View style={{height:2,
												marginTop:10,
												marginBottom:10,
												width:40,
												backgroundColor:"#ff8b00",
												alignSelf:"center"}}/>
				</View>
			)
		}
		_renderAddress(){
			if(this.state.renderAddress && this.state.selectedAddress && this.state.selectedAddress.hasOwnProperty("uaid")){
				return(
						<Address selectedAddress = {this.state.selectedAddress}
										 goToAddressList = {this._goToAddressList}/>
				)
			}else{
				return(
          <View style={{height:100,width:width,alignItems:'center',justifyContent:'center'}} >

          </View>
					// <TouchableOpacity onPress={()=>{this._goToAddressList()}}>
					// 		<View style={{height:100,width:width,alignItems:'center',justifyContent:'center'}} >
          //       <Text style={{color:'#ea7b21',fontFamily:'FZZhunYuan-M02S',}}>请选择您的地址</Text>
          //     </View>
					// </TouchableOpacity>
				)
			}
		}
		_renderAddressReminder() {
			if (this.state.selectedCase && this.state.selectedCase.custom_dlexp) {
				return (
					<View>
						<Text style={{color: '#40a2e7',
													fontSize: 14,
													marginTop: 15,
													marginLeft: 20,
													marginRight: 20,
													fontFamily:'FZZhunYuan-M02S',}}
									allowFontScaling={false}>
							*此单为远距离配送，请核对餐厅地址及送餐地址是否正确(在线支付等待确认后扣款)
						</Text>
					</View>
				)
			}
		}
		_renderDeliverFee(){
			//自取
			if(this.state.dltype == '0') return;
			//送餐
			if(this.state.dlexp > 0){
				return(
					<CartItem icon={require('./Image/delivery-2.png')}
										title={Label.getCMLabel('DELIVER_FEE')}
										value={'$'+this.state.dlexp}/>
				)
			}else if(this.state.dltype == '2'){
				return(
					<CartItem icon={require('./Image/delivery-2.png')}
										title={Label.getCMLabel('DELIVER_FEE')}
										value={'客服将稍后与您联系确认运费'}/>
				)
			}

		}
		_renderVisaFee(){
			if(this.state.visa_fee > 0) {
				return(
					<CartItem icon={require('./Image/delivery-2.png')}
										title={"手续费"}
										value={'$'+this.state.visa_fee}/>
				)
			}
		}
		_deliverAnimation(deliverType){
			if(deliverType == 0){
				Animated.timing(
					this.state.tabAnim,
					{
						toValue: 130,
						duration: 200,
					}
				).start();
			}else{
				Animated.timing(
					this.state.tabAnim,
					{
						toValue: 12,
						duration: 200,
					}
				).start();
			}

		}
		_renderDeliverType(){
      let typeListData=[{
                          text:Label.getCMLabel('DELIVER'),
													type: 1,
                          // backgroundColor:"#fff",
                          // textColor:"#999999",
                          // borderColor:"#999999",
													backgroundColor:"#ccd3db",
                          textColor:"white",
                          borderColor:"#ccd3db",
                        },{
                          text:Label.getCMLabel('PICK_UP'),
													type: 0,
                          // backgroundColor:"#fff",
                          // textColor:"#999999",
                          // borderColor:"#999999",
													backgroundColor:"#ccd3db",
                          textColor:"white",
                          borderColor:"#ccd3db",
                        }]
			if(this.state.dltype != 0){
				typeListData[0].backgroundColor = "#ff8b00";
				typeListData[0].textColor = "#FFF";
				typeListData[0].borderColor = "#ff8b00";
			}else{
				typeListData[1].backgroundColor = "#ff8b00";
				typeListData[1].textColor = "#FFF";
				typeListData[1].borderColor = "#ff8b00";
			}
      let TypeList = typeListData.map((deliverType,index) => {
          return (
            <TouchableWithoutFeedback
								key={index}
                onPress={()=>{
									this._updateDltype(deliverType.type)
								}}
								>
							<View style={{
									width:118,
									alignItems:'center',
									alignSelf:'center',
									justifyContent:'center',
								}}>
                <Text style={{color:deliverType.textColor,fontFamily:'FZZhunYuan-M02S',}}
											allowFontScaling={false}>
                  {deliverType.text}
                </Text>
							</View>
            </TouchableWithoutFeedback>
          )
        })
      return(
        <View style={{
											height: 50,
											width:260,
											alignSelf:'center',
											flexDirection:"row",
											marginTop:25,
											backgroundColor: '#ccd3db',
					 						marginHorizontal: 30,
											paddingHorizontal:12,
											borderRadius: 25,
											marginBottom: 20}}>
						<Animated.View style={{
									height:35,
									width:118,
									backgroundColor:"#ff8b00",//deliverType.backgroundColor,
									borderColor:"#ff8b00",//deliverType.borderColor,
									borderWidth:1,
									borderRadius:25,
									marginLeft: this.state.tabAnim,
									marginTop:7.5,
									position:'absolute',
								}}>
						</Animated.View>
						 {TypeList}

        </View>
      )
    }

		_renderCoupeCode() {
			const _couponCode = [];
			_couponCode.push(
				<Text key={'coupon_title'}
							style={{color:'#666666',
											marginLeft: 25,
											marginTop: 20,
											fontSize:15,
											fontWeight: '800'}}
							allowFontScaling={false}>
					优惠
				</Text>
			);
			// const _couponCodeTextInput = () => {
			// 	if (this.state.coupon_code.length == 0) {
			// 		return (
			//
			// 		);
			// 	}
			// 	else {
			// 		return (
			// 			<TouchableOpacity onPress={this._checkCouponOnPress}>
			// 				<View style={{flex: 1,
			// 											justifyContent: 'center',
			// 											alignSelf: 'center',
			// 											paddingHorizontal: 20,
			// 											backgroundColor: "#40a2e7",
			// 											borderRadius: 25}}>
			// 					<Text style={{color: "white",
			// 												fontSize: 15}}
			// 								allowFontScaling={false}>
			// 						使用
			// 					</Text>
			// 				</View>
			// 			</TouchableOpacity>
			// 		);
			// 	}
			// }
			if (this.state.coupon_code.length > 0 && this.state.selectedCase.using_coupon) {
				const _discountList = () => {
					let _discountList = '';
					if (this.state.selectedCase.active_discounts && this.state.selectedCase.active_discounts.length > 0) {
						for (let _discount of this.state.selectedCase.active_discounts) {
							if (_discount.rule_type == 1) {
								_discountList += _discount.name + ' ';
							}
						}
					}
					return _discountList;
				};
				_couponCode.push(
					<View key={'coupon_code'}
								style={{flexDirection: 'row',
												justifyContent: 'space-between',
												marginTop: 10,
												marginLeft: 25,
												marginRight: 10}}>
						<Text style={{flex: 1,
													color: "#40a2e7",
													marginRight: 10,
													alignItems:'flex-start',
													alignSelf: 'center',
													borderRadius: 30}}
									allowFontScaling={false}>
								 正在使用：{_discountList()}
						</Text>
						<TouchableOpacity activeOpacity={0.4}
															style={{alignSelf: 'center'}}
															onPress={this._cancelCouponOnPress}>
							<View style={{height: 27,
														justifyContent: 'center',
														alignSelf: 'center',
														paddingHorizontal: 20,
														backgroundColor: "#DA4150",
														borderRadius: 25}}>
								<Text style={{color: "white",
															fontSize: 15}}
											allowFontScaling={false}>
									取消
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				);
			}
			else {
				_couponCode.push(
					<View key={'coupon_code'}
								style={{flexDirection: 'row',
												marginTop: 10,
												marginLeft: 25,
												marginRight: 10}}>
						<TextInput style={{flex: 1,
															 marginRight: 30,
															 alignItems:'flex-start',
															 alignSelf: 'center',
															 padding: 5,
															 borderRadius: 30,
															 backgroundColor: '#f4f4f4',
															 paddingLeft: 15,
														 }}
											 placeholder={'coupon code'}
											 onChangeText={(couponCode) => this.setState({couponCodeTextInput: couponCode.toUpperCase().replace(' ', '')})}
											 value={this.state.couponCodeTextInput}
											 editable={true}
											 underlineColorAndroid={"rgba(0,0,0,0)"}
											 >
						</TextInput>
						<TouchableOpacity activeOpacity={0.4}
															onPress={this._checkCouponOnPress}>
							<View style={{flex: 1,
														justifyContent: 'center',
														alignSelf: 'center',
														paddingHorizontal: 20,
														backgroundColor: "#40a2e7",
														borderRadius: 25}}>
								<Text style={{color: "white",
															fontSize: 15}}
											allowFontScaling={false}>
									使用
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				);
			}
			// _couponCode.push(
			//
			// 	<View key={'coupon_code'}
			// 				style={{flexDirection: 'row',
			// 								marginTop: 10,
			// 								marginLeft: 20,
			// 								marginRight: 10}}>
			// 		<TextInput style={{flex: 1,
			// 											 marginRight: 30,
			// 											 alignItems:'flex-start',
			// 											 alignSelf: 'center',
			// 											 padding: 5,
			// 											 borderRadius: 30,
			// 											 backgroundColor: '#f4f4f4',
			// 											 paddingLeft: 15,
			// 										 }}
			// 							 placeholder={'coupon code'}
			// 							 onChangeText={(couponCode) => this.setState({couponCodeTextInput: couponCode.toUpperCase().replace(' ', '')})}
			// 							 value={this.state.couponCodeTextInput}
			// 							 editable={this.state.coupon_code.length !== 0}
			// 							 >
			// 		</TextInput>
			// 		{_couponCodeTextInput()}
			// 	</View>
			// );
			// if (this.state.coupon_code.length > 0) {
			// 	_couponCode.push(
			// 		<Text key={'coupon_desc'}
			// 					style={{color: '#40a2e7',
			// 									fontSize: 15,
			// 									marginTop: 15,
			// 									marginLeft: 20}}
			// 					allowFontScaling={false}>
			// 			正在使用：{this.state.coupon_code}
			// 		</Text>
			// 	);
			// }
			return _couponCode;
		}
		_renderCouponReminder() {
			if (this.state.coupon_code.length > 0 && !this.state.selectedCase.using_coupon) {
				return (
					<View style={{marginHorizontal: 25,
												marginTop: 15}}>
						<Text style={{fontSize: 14,
													color:'#666666',
													fontFamily:'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							*优惠码条件不满足 无法在当前使用
						</Text>
					</View>
				)
      }
		}
		_renderChoosePayment() {
			if (this.state.cases && this.state.dltype != 0) {
				if (this.state.cases.length > 1) {
					let payment_description = '';
					if (this.state.payment_channel == 1) {
						payment_description = ' **** **** **** ' + this.state.last_payment.stripe_last4;
					}
					else if (this.state.payment_channel == 10) {
						// payment_description = '支付宝';
					}
					else if (this.state.payment_channel == 30) {
						// payment_description = 'Apple Pay';
					}
					else {
						payment_description = '现金到付';
					}
					const payment_section = [];
					payment_section.push(
						<TouchableOpacity key={'choosePayment'}
															activeOpacity={0.4}
															onPress={this._goToChoosePayment}>
							<CartItem title={Label.getCMLabel('PAY')}
												rightIcon={require('./Image/right.png')}
												paymentChannel={this.state.payment_channel}
												value={payment_description}/>
						</TouchableOpacity>
					)
					payment_section.push(
						<View key={'payment_warning'}
									style={{flexDirection: 'row',
													marginHorizontal: 20,
													marginTop: 5,
													marginBottom: 15}}>
							<Image source={require('./Image/warning.png')}
										 style={{width: 15,
										 				 height: 15,
										 				 alignSelf: 'flex-start'}}/>
 						  <Text style={{fontSize: 14,
														color: '#ea7b21',
														fontWeight: '800',
														fontFamily:'FZZhunYuan-M02S',
														marginHorizontal: 10}}
										allowFontScaling={false}>
							 使用微信代叫，刷假卡造成的订单取消平台将不予退款，可疑账户平台会配合警方调查
							</Text>
						</View>
					)
					return payment_section;
				}
			}

		}

		_renderPaymentWarning() {
		}

		_renderRestaurantName() {
			return (
				<View>
					<Text style={{color:'#404041',
												fontSize:21,
												fontWeight:'500',
												textAlign:'center',
												marginTop:20,
												fontFamily:'FZZongYi-M05S',
											}}
								allowFontScaling={false}>
						{this.props.restaurant.name}
					</Text>
					<View style={{height:2,
												marginTop:15,
												marginBottom:10,
												width:40,
												backgroundColor:"#ff8b00",
												alignSelf:"center"}}/>
				</View>
			);
		}
		_renderPriceDetail() {
			const _priceDetail = [];
			_priceDetail.push(
				<Text key={'price_title'}
							style={{color:'#666666',
											marginLeft: 20,
											marginTop: 20,
											fontSize:15,
											fontWeight: '800'}}
							allowFontScaling={false}>
					订单小计
				</Text>
			);
			if (this.state.selectedCase.fees.ori_pretax) {
				_priceDetail.push(
					<View key={'price_pretax'}
								style={{flex: 1,
												flexDirection: 'row',
												justifyContent: 'space-between',
												marginTop: 10,
												marginHorizontal: 20}}>
						<Text style={{fontSize: 15,
													color: '#9b9b9b',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							税前价格
						</Text>
						<Text style={{fontSize: 15,
													color: '#9b9b9b',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							${this.state.selectedCase.fees.ori_pretax}
						</Text>
					</View>
				)
			}
			if (this.state.selectedCase.fees.dlexp) {
				_priceDetail.push(
					<View key={'price_dlexp'}
								style={{flex: 1,
												flexDirection: 'row',
												justifyContent: 'space-between',
												marginTop: 10,
												marginHorizontal: 20}}>
						<Text style={{fontSize: 15,
													color: '#9b9b9b',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							运费
						</Text>
						<Text style={{fontSize: 15,
													color: '#9b9b9b',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							${this.state.selectedCase.fees.dlexp}
						</Text>
					</View>
				)
			}
			if (this.state.selectedCase.fees.ori_tax) {
				_priceDetail.push(
					<View key={'price_tax'}
								style={{flex: 1,
												flexDirection: 'row',
												justifyContent: 'space-between',
												marginTop: 10,
												marginHorizontal: 20}}>
						<Text style={{fontSize: 15,
													color: '#9b9b9b',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							税
						</Text>
						<Text style={{fontSize: 15,
													color: '#9b9b9b',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							${this.state.selectedCase.fees.ori_tax}
						</Text>
					</View>
				)
			}
			if (this.state.selectedCase.fees.ori_service_fee && this.state.selectedCase.fees.ori_service_fee > 0) {
				_priceDetail.push(
					<View key={'price_service_fee'}
								style={{flex: 1,
												flexDirection: 'row',
												justifyContent: 'space-between',
												marginTop: 10,
												marginHorizontal: 20}}>
						<View style={{flexDirection: 'row'}}>
							<Text style={{fontSize: 15,
														color: '#9b9b9b',
														fontFamily: 'FZZhunYuan-M02S'}}
										allowFontScaling={false}>
								服务费
							</Text>
							<TouchableOpacity activeOpacity={0.4}
																onPress={ () =>
																	this.popupView.showAlert(this, "服务费已包含线上支付手续费（只有使用信用卡，借记卡，Apple Pay和支付宝的时候才会产生）和司机服务费，无需再支付小费。")
																}>
								<Image source={require('./Image/more_info.png')}
											 style={{width:15,height:15, marginLeft: 5}}/>
							</TouchableOpacity>
						</View>
						<Text style={{fontSize: 15,
													color: '#9b9b9b',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							${this.state.selectedCase.fees.ori_service_fee}
						</Text>
					</View>
				)
			}
			if (this.state.selectedCase.fees.total_off > 0) {
				_priceDetail.push(
					<View key={'price_off'}
								style={{flex: 1,
												flexDirection: 'row',
												justifyContent: 'space-between',
												marginTop: 10,
												marginHorizontal: 20}}>
						<Text style={{fontSize: 15,
													color: '#40a2e7',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							折扣
						</Text>
						<Text style={{fontSize: 15,
													color: '#40a2e7',
													fontFamily: 'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							- ${this.state.selectedCase.fees.total_off}
						</Text>
					</View>
				)
			}
			return _priceDetail;
		}

		_renderPriceTotal() {
			const _originTotal = () => {
				if (this.state.selectedCase.fees.using_coupon) {
					return (
						<Text style={{color:'#9b9b9b',
													fontSize:19,
													fontFamily:'FZZhunYuan-M02S',
													textDecorationLine: 'line-through',
													marginLeft: 6}}
									allowFontScaling={false}>
							${this.state.selectedCase.fees.total}
						</Text>
					);
				}
			}
			return (
				<View style={{flexDirection: 'row',
											marginTop: 20,
											marginHorizontal: 20,
											justifyContent: 'space-between'}}>
					<Text style={{color:'#666666',
												fontSize:19,
												fontWeight: '800'}}
								allowFontScaling={false}>
						总计
					</Text>
					<View style={{flexDirection: 'row'}}>
						<Text style={{color:'#666666',
													fontSize:19,
													fontFamily:'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							${this.state.selectedCase.fees.charge_total}
						</Text>
						{_originTotal()}
					</View>
				</View>
			);
		}

		_renderComment(){
			return(
				<CommentModal  style={styles.modal}
											 position={"center"}
											 isOpen={this.state.openEditComment}
											 onClosed={()=>{this.setState({openEditComment:false})}}
											 onOpened={()=>{this._commentInput.setNativeProps({ text:this.state.comment })}}>
					<TextInput
										style={styles.TextInput}
										ref={component => this._commentInput = component}
										placeholder={Label.getCMLabel('`REMARK')}
										selectionColor="#ff8b00"
										multiline={true}
										onChangeText={(text)=>this.setState({comment:text})}
										underlineColorAndroid={"rgba(0,0,0,0)"}>
					</TextInput>
				</CommentModal>
			)

		}
		_renderTipInfo(){
			if (this.state.payment_channel && this.state.payment_channel != 0) {
				return(
					<View style={{
						height:100,
					}}>
					<View style={{flex:0.5, flexDirection:'row',alignItems:'center',}}>
					 <Text style={{marginLeft:20,
												 fontSize:15,
												 color:'#808080',
												 fontFamily:'FZZhunYuan-M02S',
											}}
									allowFontScaling={false}>
	              {Label.getCMLabel('TIPS')}:
	            </Text>
	            <Text style={{marginLeft:5,
													  fontSize:15,
													  color:'#ff8b00',
													  fontFamily:'FZZhunYuan-M02S',
													}}
										allowFontScaling={false}>
              {this.state.tips}
            </Text>
						</View>
						<View style={{flex:0.5, flexDirection:'row', paddingHorizontal:10}}>
							<TouchableOpacity activeOpacity={0.4}
																style={[styles.tipsView,
												{
													flex:0.2,
													borderColor:this.state.tipsPercentage == 0.1 ?'#ff8b00' :'#808080',
													backgroundColor: this.state.tipsPercentage == 0.1 ?'#ff8b00' :'white',
												}]} onPress={()=>this._setTips(0.1)}>
								<Text style={[styles.tipsFont,{color:this.state.tipsPercentage == 0.1 ?'#FFF': '#808080'}]}
											allowFontScaling={false}>10%</Text>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.4}
																style={[styles.tipsView,{
													flex:0.2,
													borderColor:this.state.tipsPercentage == 0.15 ?'#ff8b00' :'#808080',
													backgroundColor: this.state.tipsPercentage == 0.15 ?'#ff8b00' :'white',
												}]} onPress={()=>this._setTips(0.15)}>
								<Text style={[styles.tipsFont,{color:this.state.tipsPercentage == 0.15 ?'#FFF': '#808080'}]}
											allowFontScaling={false}>15%</Text>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.4}
																style={[styles.tipsView,{
													flex:0.2,
													borderColor:this.state.tipsPercentage == 0.2 ?'#ff8b00' :'#808080',
													backgroundColor: this.state.tipsPercentage == 0.2 ?'#ff8b00' :'white',
												}]}  onPress={()=>this._setTips(0.2)}>
								<Text style={[styles.tipsFont,{color:this.state.tipsPercentage == 0.2 ?'#FFF': '#808080'}]}
											allowFontScaling={false}>20%</Text>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.4}
																style={[styles.tipsView,{flex:0.4,flexDirection:'row',paddingLeft:10}]}>
								<Text allowFontScaling={false}>$</Text>
								<TextInput
													style={{flex:1,height: 40, marginHorizontal:5}}
													underlineColorAndroid={"rgba(0,0,0,0)"}
													placeholder={'Customized'}
													keyboardType={Platform.OS === 'ios' ?'decimal-pad':'numeric'}
													returnKeyType={'done'}
													value={this.state.tips.toString()}
													onChangeText={(text)=>{
														this.setState({
															tips:text.length == 0 ? 0 : parseFloat(text),
															tipsPercentage:this.state.tips/this.state.total,
														})
												}}
													/>
							</TouchableOpacity>
						</View>
					</View>
				)
			}
		}
		_renderOrderConfirm() {
			if(this.state.showOrderConfirm) {
				return(<OrderConfirm doCheckout={this._doCheckout}
														 closeOrderConfirm={this._closeOrderConfirm}
														 selectedAddress={this.state.selectedAddress}
														 total={this.state.selectedCase.fees.charge_total}
														 tips={this.state.selectedCase.fees.charge_total.service_fee}
														 visaFee={this.state.visa_fee}
														 paymentChannel={this.state.payment_channel}
														 dltype={this.state.dltype}/>)
			}
		}
    render(){
      let cartList = this.state.cart.map((item,index) => {

          const dish = item;
          return(
            <CheckoutItem key={index}
                      ds_name = {dish.ds_name}
                      dish = {dish}
                      qty = {dish.qty}
										  onPress = {this._handleProductOnPress.bind(null, dish)}/>
          )
      })
			// const margin = this.state.anim.interpolate({
			// 	inputRange: [0, 100],
			// 	outputRange: [10, 0],
			// 	extrapolate: 'clamp',
			// });
			let commentText = ()=>{
				if(this.state.comment){
					return(	<Text style={{color:'#666666'}}
												allowFontScaling={false}>
										{Label.getCMLabel('REMARK')}： {this.state.comment}
									</Text>)
				}else{
					return(<Text style={{color:'#666666'}}
											 allowFontScaling={false}>
									 	{Label.getCMLabel('ADD_REMARK')}
								 </Text>)
				}
			}
			const _discountList = () => {
				let _discountList = '';
				if (this.state.selectedCase.active_discounts && this.state.selectedCase.active_discounts.length > 0) {
					for (let _discount of this.state.selectedCase.active_discounts) {
						// _discountList.push(
						// 	<Text style={{color: '#40a2e7',
						// 								fontSize: 15,
						// 								marginTop: 15,
						// 								marginLeft: 20}}
						// 				allowFontScaling={false}>
						// 		*{_discount.name}
						// 	</Text>
						// )
						if (_discount.rule_type == 0) {
							_discountList += _discount.name + ' ';
						}
					}
					if (_discountList.length > 0) {
						return (
							<Text style={{color: '#40a2e7',
														fontSize: 15,
														marginTop: 15,
														marginLeft: 20}}
										allowFontScaling={false}>
								*{_discountList}
							</Text>
						);
					}
				}
				return;
			};
      return(
				<View style={styles.mainContainer} >
					{this.state.showPopup && this.popupView.show()}
					<Header title={'确认订单'}
									goBack={this._goBack}
									leftButtonText={'<'}/>
					<KeyboardAvoidingView style={{flex: 1,
																				backgroundColor: "#f4f4f4"}}
																behavior={Platform.OS === 'ios'?"padding":null}>
		          <ScrollView ref={(scrollView) => { this._scrollView = scrollView; }}
													style={styles.scrollView}
													scrollEventThrottle= {16}
													showsVerticalScrollIndicator={false}
													onScroll={ (e) => this._handleScroll(e)}
													keyboardDismissMode={Platform.OS === 'ios' ?'on-drag':'none'}
													keyboardShouldPersistTaps={"always"}
													{...this._gestureHandlers}>
								<View style={{marginLeft:10,
															marginRight:10,
															marginBottom: 20,
															paddingBottom:20,
															width: width - 20,
															backgroundColor:"#ffffff",
															borderRadius: 5,
															alignSelf:"center",
															shadowOffset: { width: 2, height: 2 },
															shadowOpacity: 0.15,
															shadowRadius: 3,
															elevation: 1}}>
										{this._renderRestaurantName()}
										{cartList}
										<TouchableWithoutFeedback onPress={()=>{this.setState({openEditComment:true})}}>
											<View style={{alignItems:'flex-start',
																		marginTop: 20,
																		marginLeft: 10,
																		marginRight: 10,
																		padding: 15,
																		borderRadius: 30,
																		backgroundColor: '#f4f4f4'}}>
													{commentText()}
											</View>
										</TouchableWithoutFeedback>
										{_discountList()}
								</View>


								<View style={{marginLeft:10,
															marginRight:10,
															marginBottom: 50,
															paddingBottom:20,
															width: width - 20,
															backgroundColor:"#ffffff",
															borderRadius: 5,
															alignSelf:"center",
															shadowOffset: { width: 2, height: 2 },
															shadowOpacity: 0.15,
															shadowRadius: 3,
															elevation: 1}}>
											{this._renderDeliverType()}
											<View style={{marginLeft: 10,
																		marginRight: 10,
																		borderColor:"#ccd3db",
																		borderBottomWidth: StyleSheet.hairlineWidth,}}>
											</View>
											{this._renderAddress()}
											{this._renderAddressReminder()}
											<View style={styles.seperateLine}>
											</View>
											{this._renderCoupeCode()}
											{this._renderCouponReminder()}
											<View style={styles.seperateLine}>
											</View>
											{this._renderChoosePayment()}
											{this._renderPaymentWarning()}
											<View style={{marginTop: 0,
																		marginLeft: 10,
																		marginRight: 10,
																		borderColor:"#ccd3db",
																		borderBottomWidth: StyleSheet.hairlineWidth,}}>
											</View>
											{this._renderPriceDetail()}
											<View style={styles.seperateLine}>
											</View>
											{this._renderPriceTotal()}
								</View>



								{this._renderAndroidCheckoutButton()}

		          </ScrollView>
					</KeyboardAvoidingView>
					{this.renderCheckoutButton()}
					{this._renderComment()}
					{this._renderOrderConfirm()}

        </View>
      )

    }

}

// <View style={{marginLeft:10,
// 							marginRight:10,
// 							paddingBottom:80,
// 							width: width - 20,
// 							backgroundColor:"#ffffff",
// 							borderRadius: 5,
// 							alignSelf:"center"}}>
// 	{this._renderRestaurant()}
// 	{this._renderAddress()}
// 	{cartList}
// 	{this._renderDeliverType()}
// 	<TouchableWithoutFeedback onPress={()=>{this.setState({openEditComment:true})}}>
// 		<View style={{alignItems:'flex-start',
// 									marginTop:10,
// 									padding:20,
// 									borderColor:"#e2e2e4",
// 									borderBottomWidth: StyleSheet.hairlineWidth,
// 									borderTopWidth: StyleSheet.hairlineWidth,}}>
// 				{commentText()}
// 		</View>
// 	</TouchableWithoutFeedback>
// 	<CartItem
// 						title={Label.getCMLabel('PRETAX_PRICE')}
// 						value={'$'+this.state.pretax}/>
//
// 	{this._renderDeliverFee()}
// 	<CartItem
// 						title={Label.getCMLabel('TAXED_PRICE')}
// 						value={'$'+this.state.total}/>
// 	{this._renderChoosePayment()}
// 	{this._renderVisaFee()}
// 	{this._renderTipInfo()}
// </View>


// {this.showLoading()}

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:"white",
  },
  scrollView:{
    flex: 1,
    // marginTop: 64,
		// backgroundColor:"#000000",
		paddingTop: 20,
  },
  orderContainer:{
    margin:10,
    backgroundColor:"#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: {
       height: 0.5,
       width: 0.5,
    },
  },
  orderTitleContainer:{
    height:60,
    backgroundColor: "#ff8b00",
    alignItems: 'center',
    justifyContent:"center",
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  orderTitle:{
    color: "#fff",
    fontSize:25,
  },
  acceptButton:{
		width:width,
		// position:Platform.OS == "ios"? null:'absolute',
		// top:Platform.OS == "ios"? null:height-acceptButtonHeight-StatusBar.currentHeight,
    height:acceptButtonHeight,
		paddingHorizontal: 20,
		flexDirection: 'row',
    backgroundColor:'#ea7b21',
		justifyContent:'space-between',
		alignItems:'center',
  },
	pendingButton: {
		width:width,
		// position:Platform.OS == "ios"? null:'absolute',
		// top:Platform.OS == "ios"? null:height-acceptButtonHeight-StatusBar.currentHeight,
    height:acceptButtonHeight,
		paddingHorizontal: 20,
    backgroundColor:'#ea7b21',
		justifyContent:'center',
		alignItems:'center',
	},
  acceptText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize:20,
		fontFamily:'FZZongYi-M05S',
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
	tipsView:{
		borderWidth:1,
		height:42,
		alignItems:'center',
		justifyContent:'center',
		marginHorizontal:5,
		marginBottom:15,
		borderRadius:30
	},
	tipsFont:{
		fontSize:15,
		fontFamily:'FZZhunYuan-M02S',
	},
	seperateLine: {
		marginTop: 20,
		marginLeft: 10,
		marginRight: 10,
		borderColor:"#ccd3db",
		borderBottomWidth: StyleSheet.hairlineWidth
	}


});

module.exports = Confirm;
