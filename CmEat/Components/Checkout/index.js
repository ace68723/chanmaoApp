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
	Platform
} from 'react-native';

import {Navigation} from 'react-native-navigation';
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
  acceptButtonHeight = 40;
}


// const(refs): define comment refeneces
const COMMENT_INPUT = 'Comment_Input';
const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
class Confirm extends Component {
    constructor(props) {
				super(props);
				console.log(props)
        const cart = MenuStore.getCart();
        const total = MenuStore.getCartTotals().total;
        const state={ cart,
                      total,
											rid:this.props.restaurant.rid,
                      startAmount:this.props.restaurant.start_amount,
                      viewBottom:new Animated.Value(0),
											anim: new Animated.Value(0), //for background image
											AnimatedImage:props.restaurant.mob_banner,
											renderAddress:false,
											loading: true,
											showOrderConfirm:false,
											paymentStatus:'添加支付方式',
											tips:0,
											tipsPercentage:0.1,

                    }
				this.state = Object.assign({},state,CheckoutStore.getState())
        this._onChange = this._onChange.bind(this);
        this._updateUaid = this._updateUaid.bind(this);
				this._saveModificationCallback = this._saveModificationCallback.bind(this);
        this._updateDltype = this._updateDltype.bind(this);
        this._calculateDeliveryFee = this._calculateDeliveryFee.bind(this);
        this._checkout = this._checkout.bind(this);
				this._handleAddressAdded = this._handleAddressAdded.bind(this);
        this._goBack = this._goBack.bind(this);
        this._goToAddressList = this._goToAddressList.bind(this);
        this._goToHistory = this._goToHistory.bind(this);
        this._doCheckout = this._doCheckout.bind(this);
        this._handleCommentChange = this._handleCommentChange.bind(this);
        this._handleSubmitComment = this._handleSubmitComment.bind(this);
				this._handleProductOnPress = this._handleProductOnPress.bind(this);
				this._closeOrderConfirm = this._closeOrderConfirm.bind(this);
    }

    componentDidMount(){
			setTimeout(()=>{
				const rid = this.state.rid;
				const pretax = MenuStore.getCartTotals().total;
				const navigator = this.props.navigator;
				const startAmount = this.state.startAmount;
				CheckoutAction.beforCheckout(rid,pretax,startAmount);
				this.setState({renderAddress:true})
			}, 500);
      CheckoutStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
      CheckoutStore.removeChangeListener(this._onChange);
    }
    _onChange(){

				const state = Object.assign({},CheckoutStore.getState());
        this.setState(state,()=>this.setState({tips:(this.state.total*0.1).toFixed(2)}));

				setTimeout( () => {
					if(this.state.shouldAddAddress){
	          this.props.navigator.showModal({
	            screen: 'CmEatAddress',
	            animated: true,
	            passProps:{updateUaid:this._updateUaid,
												 handleAddressAdded: this._handleAddressAdded},
	            navigatorStyle: {navBarHidden: true},
	          });
	        }
				}, 500);

				if(this.state.checkoutSuccessful){
					this._goToHistory();
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
        this._calculateDeliveryFee()
      }
    }
    _updateDltype(deliverType){
			if(!this.state.loading){
				this.setState({dltype:deliverType.type,loading:true,})
				const dltype = deliverType.type
				CheckoutAction.updateDltype(dltype);
			}
    }
    _calculateDeliveryFee(){
			this.setState({
				loading:true,
			})
      CheckoutAction.calculateDeliveryFee()
    }
    _doCheckout(){
      this.setState({
        loading:true,
				showOrderConfirm:false,
      })
      CheckoutAction.checkout(this.state.comment);
      // CheckoutAction.checkout(this.state.comment);
    }
    _checkout(){

      let dldec;
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
			this.setState({
				showOrderConfirm:true
			});
			// console.log(this.state)
      // Alert.alert(
      //   dldec,
      //   '  税后总价: $' + this.state.total + '\n' +
      //   '确认就不可以修改了哟～' ,
      //   [ {text:'取消',onPress:() => { }, style: 'cancel'},
      //     {text: '确认', onPress: () => this._doCheckout()},
      //   ],
      // );
    }
		_closeOrderConfirm(){
			this.setState({showOrderConfirm:false});
		}
    _goBack(){
      this.props.navigator.pop();
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
        this.props.navigator.dismissModal({animationType: 'slide-down'});
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
      if(this.state.comment.length>0){
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
			}
		}
		_handleScroll(e) {
      if(e.nativeEvent.contentOffset.y < 300){
        this.state.anim.setValue(e.nativeEvent.contentOffset.y);
        const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      }
    }

		_saveModificationCallback() {
			const cart = MenuStore.getCart();
			const rid = this.state.rid;
			const pretax = MenuStore.getCartTotals().total;
			const startAmount = this.state.startAmount;
			CheckoutAction.beforCheckout(rid,pretax,startAmount);

			const state = Object.assign({},CheckoutStore.getState(),{cart:cart, pretax: pretax});
			this.setState(state);
		}
		_setTips(tipsPercentage){
			this.setState({
				tips:(this.state.total * tipsPercentage).toFixed(2),
				tipsPercentage:tipsPercentage,
			})
		}
		renderCheckoutButton(){
      if(this.state.selectedAddress && this.state.selectedAddress.hasOwnProperty("uaid") && !this.state.loading){
        return(
            <TouchableOpacity style={styles.acceptButton}
                              activeOpacity={0.4}
                              onPress={this._checkout}>
									<Text style={styles.acceptText}>
										 结账
									</Text>
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
          <TouchableOpacity onPress={()=>{this._goToAddressList()}}>
            <View style={styles.acceptButton}>
              <Text style={{color:'#ffffff',fontSize:20,fontFamily:'FZZhunYuan-M02S',}}>添加地址</Text>
            </View>
          </TouchableOpacity>

        )
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
											}}>
				 		{this.props.restaurant.name}
					</Text>
					<Text style={{color:'#ababb0',
												fontSize:13,
												fontWeight:'400',
												marginTop:10,
												textAlign:'center',
												fontFamily:'FZZhunYuan-M02S',}}>
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
		_renderDeliverFee(){
			if(this.state.dltype == '0') return
			if(this.state.dlexp > 0){
				return(
					<CartItem icon={require('./Image/delivery-2.png')}
										title={'运费'}
										value={'$'+this.state.dlexp}/>
				)
			}else if(this.state.dltype == '2'){
				return(
					<CartItem icon={require('./Image/delivery-2.png')}
										title={'运费'}
										value={'客服将稍后与您联系确认运费'}/>
				)
			}

		}
		_renderDeliverType(){
      let typeListData=[{
                          text:"送餐",
													type:'1',
                          backgroundColor:"#fff",
                          textColor:"#999999",
                          borderColor:"#999999",
                        },{
                          text:"自取",
													type:'0',
                          backgroundColor:"#fff",
                          textColor:"#999999",
                          borderColor:"#999999",
                        }]
			if(this.state.dltype != '0'){
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
                onPress={this._updateDltype.bind(null,deliverType)}>
              <View style={{flex:1,
                            alignItems:"center",
                            backgroundColor:deliverType.backgroundColor,
                            borderColor:deliverType.borderColor,
                            borderWidth:1,
                            borderRadius:15,
                            marginLeft:5,
                            marginRight:5,
                            padding:5
                          }}>
                <Text style={{color:deliverType.textColor,fontFamily:'FZZhunYuan-M02S',}}>
                  {deliverType.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })
      return(
        <View style={{flexDirection:"row",marginTop:25}}>
            {TypeList}
        </View>
      )
    }
		_renderComment(){
			return(
				<CommentModal  style={styles.modal}
											 position={"center"}
											 isOpen={this.state.openEditComment}
											 onClosed={()=>{this.setState({openEditComment:false})}}>
					<TextInput style={styles.TextInput}
										 placeholder="备注"
										 selectionColor="#ff8b00"
										 multiline={true}
										 value={this.state.comment}
										 onChangeText={(text) => {this.setState({comment:text})}}
                     underlineColorAndroid={"rgba(0,0,0,0)"}>
					</TextInput>
				</CommentModal>
			)

		}
		_renderTipInfo(){
			return(
				<View style={{
					height:100,

				}}>
				<View style={{flex:0.5, flexDirection:'row',alignItems:'center',}}>
				 <Text style={{
						marginLeft:20,
						fontSize:15,
						color:'#808080',
						fontFamily:'FZZhunYuan-M02S',
					}}>
              小费:
            </Text>
            <Text style={{
							 marginLeft:5,
							 fontSize:15,
							 color:'#ff8b00',
							 fontFamily:'FZZhunYuan-M02S',
						}}>
              {this.state.tips}
            </Text>
						</View>
						<View style={{flex:0.5, flexDirection:'row', paddingHorizontal:10}}>
							<TouchableOpacity style={[styles.tipsView,
												{
													flex:0.2,
													borderColor:this.state.tipsPercentage == 0.1 ?'#ff8b00' :'#808080',
													backgroundColor: this.state.tipsPercentage == 0.1 ?'#ff8b00' :'white',
												}]} onPress={()=>this._setTips(0.1)}>
								<Text style={[styles.tipsFont,{color:this.state.tipsPercentage == 0.1 ?'#FFF': '#808080'}]}>10%</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.tipsView,{
													flex:0.2,
													borderColor:this.state.tipsPercentage == 0.15 ?'#ff8b00' :'#808080',
													backgroundColor: this.state.tipsPercentage == 0.15 ?'#ff8b00' :'white',
												}]} onPress={()=>this._setTips(0.15)}>
								<Text style={[styles.tipsFont,{color:this.state.tipsPercentage == 0.15 ?'#FFF': '#808080'}]}>15%</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.tipsView,{
													flex:0.2,
													borderColor:this.state.tipsPercentage == 0.2 ?'#ff8b00' :'#808080',
													backgroundColor: this.state.tipsPercentage == 0.2 ?'#ff8b00' :'white',
												}]}  onPress={()=>this._setTips(0.2)}>
								<Text style={[styles.tipsFont,{color:this.state.tipsPercentage == 0.2 ?'#FFF': '#808080'}]}>20%</Text>
							</TouchableOpacity>
							<TouchableOpacity style={[styles.tipsView,{flex:0.4,flexDirection:'row',paddingLeft:10}]}>
								<Text>$</Text>
								<TextInput
													style={{flex:1,height: 40, marginHorizontal:5}}
													placeholder={'Customized'}
													keyboardType={Platform.OS === 'ios' ?'decimal-pad':'numeric'}
													returnKeyType={'done'}
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
		_renderOrderConfirm() {
			if(this.state.showOrderConfirm) {
				return(<OrderConfirm doCheckout={this._doCheckout}
														 closeOrderConfirm={this._closeOrderConfirm}
														 selectedAddress={this.state.selectedAddress}
														 total={this.state.total}
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
			const margin = this.state.anim.interpolate({
				inputRange: [0, 100],
				outputRange: [10, 0],
				extrapolate: 'clamp',
			});
			let commentText = ()=>{
				if(this.state.comment){
					return(	<Text>备注： {this.state.comment}</Text>)
				}else{
					return(<Text style={{color:'#ababb0'}}>添加备注（例如：忌口、过敏）</Text>)
				}
			}
      return(
        <View style={styles.mainContainer}>
					<Background
							 minHeight={0}
							 maxHeight={230}
							 offset={this.state.anim}
							 backgroundImage={{uri:this.state.AnimatedImage}}
							 backgroundShift={0}
							 backgroundColor={"rgba(0,0,0,0)"}>
					 </Background>

          <ScrollView ref={(scrollView) => { this._scrollView = scrollView; }}
											style={styles.scrollView}
											scrollEventThrottle= {16}
											showsVerticalScrollIndicator={false}
											onScroll={ (e) => this._handleScroll(e)}
											{...this._gestureHandlers}>
						<View style={{backgroundColor:"#000000",marginTop:200,}}>
							<Animated.View style={{
																		 bottom:this.state.viewBottom,
																		 marginLeft:margin,
																		 marginRight:margin,
																	   backgroundColor:"#ffffff",
																		 marginTop:-20,
																		 paddingBottom:200,
																	 }}>
								<View style={{width:width-20,alignSelf:"center"}}>
									{this._renderRestaurant()}
									{this._renderAddress()}
									{cartList}
									{this._renderDeliverType()}
									<TouchableWithoutFeedback onPress={()=>{this.setState({openEditComment:true})}}>
										<View style={{alignItems:'flex-start',
																	marginTop:10,
																	padding:20,
																	borderColor:"#e2e2e4",
																	borderBottomWidth: StyleSheet.hairlineWidth,
																  borderTopWidth: StyleSheet.hairlineWidth,}}>
												{commentText()}
										</View>
									</TouchableWithoutFeedback>
									<CartItem
														title={'税前价格'}
														value={'$'+this.state.pretax}/>

									{this._renderDeliverFee()}
									<CartItem
														title={'税后总价'}
														value={'$'+this.state.total}/>
									<TouchableOpacity onPress={()=>console.log('支付')}>
									<CartItem rightIcon={require('./Image/right.png')}
															title={'支付'}
															value={this.state.paymentStatus}/>
									</TouchableOpacity>
									{this._renderTipInfo()}
								</View>

	            </Animated.View>
						</View>

          </ScrollView>
					{this.renderCheckoutButton()}
					<TouchableOpacity style={{
																		paddingLeft:8,
																		paddingRight:20,
																		paddingBottom:20,
																		position:'absolute',
																		top:marginTop,
																		left:0,}}
														onPress={this._goBack}>
						<View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
							<Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
								×
							</Text>
						</View>
					</TouchableOpacity>
					{this._renderComment()}
					{this._renderOrderConfirm()}

        </View>
      )

    }

}


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
    height:acceptButtonHeight,
    backgroundColor:'#ea7b21',
		justifyContent:'center',
		alignItems:'center',
  },
  acceptText: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
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
	}


});

module.exports = Confirm;
