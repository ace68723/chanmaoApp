/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
  Alert,
	AppState,
	Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
	TouchableOpacity,
  TouchableHighlight,
  NativeAppEventEmitter,
  View,

} from 'react-native';

const {height, width} = Dimensions.get('window');
let marginTop,headerHeight,acceptButtonHeight;
if(height == 812){
  marginTop = 34;
  headerHeight = 88;
  acceptButtonHeight = 80;
}else{
  marginTop = 20;
  headerHeight = 64;
  acceptButtonHeight = 40;
}
import Order from './Order';
import TabBar from './TabBar';
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';
import HomeStore from '../../Stores/HomeStore'
import Header from '../General/Header';
import HistoryOrderDetail from './HistoryOrderDetail';
import Modal from 'react-native-modalbox';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import AllOrders from './AllOrders';
import OrdersNotReviewed from './OrdersNotReviewed';
import BadOrders from './BadOrders';
import CMLabel from '../../Constants/AppLabel';

import Alipay from '../../../Alipay/Alipay';
import CheckoutAction from '../../Actions/CheckoutAction';

class HistoryTab extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({},HistoryStore.getState(),{showHistoryOrderDetail:false, renderingPage: 0});
        this._onChange = this._onChange.bind(this);
				this._goBack = this._goBack.bind(this);
				this._goBackToHistory = this._goBackToHistory.bind(this);
				this._setOnRefresh = this._setOnRefresh.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._doAutoRefresh = this._doAutoRefresh.bind(this);
        this._HistoryOrderDetailVisible = this._HistoryOrderDetailVisible.bind(this);
				this._goToComments = this._goToComments.bind(this);
        this._reorder = this._reorder.bind(this);
				this._handleAppStateChange = this._handleAppStateChange.bind(this);
				this._getCurrentPosition = this._getCurrentPosition.bind(this);
				// this._renderContent = this._renderContent.bind(this);
				this._renderFilter = this._renderFilter.bind(this);
				// this._goToRestaurant = this._goToRestaurant.bind(this);
				this._handleOnChangeTab = this._handleOnChangeTab.bind(this);
				this._handlePaymentRetry = this._handlePaymentRetry.bind(this);
				this._alipaySelected = this._alipaySelected.bind(this);
				this._cashSelected = this._cashSelected.bind(this);
		
    }

    componentDidMount(){
      // setTimeout( () =>{
				const _doAutoRefresh = this._doAutoRefresh;
	      HistoryStore.addChangeListener(this._onChange);
	      this._doAutoRefresh();
				HistoryStore.autoRefresh();
        console.log('need rebuild currentRoutes')
	      // const currentRoutes = this.props.navigator.getCurrentRoutes();
				AppState.addEventListener('change', this._handleAppStateChange);
      // }, 4000);
    }
    componentWillUnmount() {
         HistoryStore.removeChangeListener(this._onChange);
				 AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _onChange(){
				const state = Object.assign({},this.state,HistoryStore.getState())
        this.setState(state)
        if(this.state.verifyPhoneResult === 'FAIL'){
          HistoryStore.initVerifyPhoneResult();
          Alert.alert(
            '验证码错误',
            '请检查您输入的验证码',
            [
              {text: '确认', onPress: () => {}},
            ],
          );
        }else if(this.state.verifyPhoneResult === 'SUCCESS'){
            HistoryStore.initVerifyPhoneResult();
            this._doAutoRefresh();
        }
				if(this.state.doRefresh){
					this._doAutoRefresh();
				}

    }
		_goBack() {
			this.props.navigator.pop();
		}
		_goBackToHistory() {
			this.props.navigator.dismissModal();
		}

		_handleAppStateChange(currentAppState) {
			if(currentAppState === 'active'){
				HistoryAction.getOrderData()
			}
		}

    _doAutoRefresh(){
      console.log('need rebuild _doAutoRefresh')
      // const currentRoutes = this.props.navigator.getCurrentRoutes();
      // if(currentRoutes.length == 1 && currentRoutes[0].name == 'Home'){
        this.setState({
          isRefreshing: true,
        })
        HistoryAction.getOrderData();
    }
		_setOnRefresh() {
			this.setState({
				isRefreshing: true,
			});
			this._onRefresh();
		}
    _onRefresh(){
      this.setState({
        isRefreshing: true,
      })
      HistoryAction.getOrderData()
    }
    _HistoryOrderDetailVisible(orderInfo){
				if (orderInfo) {
					this.setState({
						showHistoryOrderDetail: !this.state.showHistoryOrderDetail,
						historyDetailOid:orderInfo.order_oid,
					});
				}
				else {
					this.setState({
						showHistoryOrderDetail: !this.state.showHistoryOrderDetail
					});
				}
    }
		_handlePaymentRetry(orderInfo) {
			this.props.navigator.showModal({
				screen: 'CmChooseCardType',
				animated: true,
				passProps:{available_payment_channels: orderInfo.available_payment_channels,
									 alipaySelected: this._alipaySelected,
									 cashSelected: this._cashSelected,
								 	 flag: 'fromHistory',
								 	 orderInfo: orderInfo},
				navigatorStyle: {navBarHidden: true,},
			});
		}

		_alipaySelected(orderInfo) {
			Alipay.constructAlipayOrder({total: parseFloat(orderInfo.order_total).toString(),
																	 oid: orderInfo.order_oid});
		}
		_cashSelected(orderInfo) {
			HistoryAction.changePaymentToCash({oid: orderInfo.order_oid});
			this._onRefresh();
		}
		// _applePaySelected(){
		// 		CheckoutAction.checkoutByApplepay()
		// }
	
		_handleOnChangeTab(tabRef) {
			this.setState({renderingPage: tabRef.i});
		}

		_goToComments(orderInfo){
				this.props.navigator.showModal({
		      screen: 'CmCommentDetail',
		      animated: false,
		      navigatorStyle: {navBarHidden: true},
		      passProps: {
						goBack: this._goBackToHistory,
						orderInfo: orderInfo,
						onRefresh: this._onRefresh,
						setOnRefresh: this._setOnRefresh,
		      },
		    });
    }
    _HistoryOrderDetail(){
      if(this.state.showHistoryOrderDetail){
        return(
          <HistoryOrderDetail historyDetailOid = {this.state.historyDetailOid}/>
        )
      }

    }
		_getCurrentPosition(){
			return this.currentPosition
		}
		_reorder(rid){
      this.props.navigator.showModal({
        screen: 'CmEatMenu',
        navigatorStyle: {navBarHidden: true},
        passProps: {
          py:800,
          restaurant:HomeStore.getRestaurantWithRid(rid),
        },
      });
		}
		_renderFilter(renderingPage) {
			let firstFilterColor = 'black';
			let secondFilterColor = 'black';
			let thirdFilterColor = 'black';
			if (renderingPage === 0) {
				firstFilterColor = '#ff8b00';
			}
			else if (renderingPage === 1) {
				secondFilterColor = '#ff8b00';
			}
			else if (renderingPage === 2) {
				thirdFilterColor = '#ff8b00';
			}
			return(
				<View style={{flexDirection: 'row',
											alignItems: 'center',
											backgroundColor: '#f4f4f4',
											borderBottomWidth: 1,
											borderBottomColor: '#ddd'}}>
					<TouchableOpacity
						style={{flex: 1, padding: 20}}
						onPress={() => this.setState({renderingPage: 0})}>
						<Text style={{textAlign: 'center',
													color: firstFilterColor,
													fontFamily:'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							{CMLabel.getCNLabel('ALL_ORDER')}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{flex: 1, padding: 20}}
						onPress={() => this.setState({renderingPage: 1})}>
						<Text style={{textAlign: 'center',
													color: secondFilterColor,
													fontFamily:'FZZhunYuan-M02S'}}
									allowFontScaling={false}>
							{CMLabel.getCNLabel('YET_COMMENT')}
						</Text>
					</TouchableOpacity>

				</View>
			)
			// <TouchableOpacity
			// 	style={{flex: 1, padding: 20}}
			// 	onPress={() => this.setState({renderingPage: 2})}>
			//  <Text style={{textAlign: 'center', color: thirdFilterColor}}>
			// 	 退款
			//  </Text>
		 // </TouchableOpacity>
		}
    render(){
      return(
         <View style={styles.mainContainer}>
						 <ScrollableTabView
	 			        tabBarBackgroundColor={'#fff'}
	 			        tabBarActiveTextColor={'#ff8b00'}
	 			        tabBarUnderlineColor={'#ff8b00'}
	 			        tabBarUnderlineStyle={{'backgroundColor':'#ff8b00'}}
	 			        tabBarTextStyle={{fontSize:12,fontFamily:'FZZhunYuan-M02S',}}
	 			        tabBarInactiveTextColor={'#666666'}
	 			        prerenderingSiblingsNumber={3}
	 			        tabBarPosition = "top"
	 			        initialPage={0}
	 			        style={{flex:1, marginTop: marginTop}}
				        renderTabBar={() => <TabBar
																			orderData={this.state.orderData}
																		/>}
								onChangeTab={this._handleOnChangeTab}
		 			      >
		 			      <AllOrders
										navigator={this.props.navigator}
										orderData={this.state.orderData}
										isRefreshing={this.state.isRefreshing}
										onRefresh={this._onRefresh}
										goToRestaurant={this._goToRestaurant}
										reorder={this._reorder}
										orderOnClick={this._HistoryOrderDetailVisible}
										handlePaymentRetry={this._handlePaymentRetry}
										tabLabel={CMLabel.getCNLabel('ALL_ORDER')}/>
								<OrdersNotReviewed
										navigator={this.props.navigator}
										orderData={this.state.orderData}
										isRefreshing={this.state.isRefreshing}
										onRefresh={this._onRefresh}
										goToComments={this._goToComments}
										goToRestaurant={this._goToRestaurant}
										reorder={this._reorder}
										tabLabel={CMLabel.getCNLabel('YET_COMMENT')}/>
	 			     </ScrollableTabView>
						 <Modal style={styles.modal}
						 			 position={"center"}
						 			 isOpen={this.state.showHistoryOrderDetail}
						 			 onClosed={this._HistoryOrderDetailVisible}
						 			 swipeToClose={false}>
						 		 {this._HistoryOrderDetail()}
						 </Modal>
						 <TouchableOpacity style={{paddingTop:5,
	                                     paddingLeft:10,
	                                     paddingRight:20,
	                                     paddingBottom:20,
	                                     position:'absolute',
	                                     top:marginTop,
	                                     left:0,}}
	                             onPress={this._goBack}>
	             <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
	               <Text style={{fontSize:25,
									 						 textAlign:"center",
									 						 color:"#ffffff",
									 						 marginTop:-2}}
											 allowFontScaling={false}>
	                 ×
	               </Text>
	             </View>
	           </TouchableOpacity>

         </View>
      )



    }

}

// <ScrollView style={{flex: 1}}
// 　　keyboardShouldPersistTaps={'always'}ref='scroll'>
//  <TextInput
// 		 style={{height: 40,
// 						 borderColor: '#d9d9d9',
// 						 fontFamily:'FZZhunYuan-M02S',
// 						 fontSize:13,
// 						 borderWidth: 1,
// 						 paddingLeft:10,
// 						 marginLeft:15,
// 						 marginRight:15,}}
// 		 onChangeText={(code) => this.setState({code})}
// 		 value={this.state.text}
// 		 placeholderTextColor={'#ff8b00'}
// 		 placeholder={'请输入验证码'}
// 	 />
// </ScrollView>


let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView:{
    flex: 1,
  },

  orderTitleContainer:{
    height:40,
    backgroundColor: '#ff8b00',
    alignItems: 'center',
    justifyContent:"center",
    borderBottomColor:'#ddd',
    borderBottomWidth:1,
  },
  orderTitle:{
    color: "#fff",
    fontSize:20,
		fontFamily:'FZZongYi-M05S',
  },
	modal: {
		justifyContent: 'center',
		height: 400,
		width: 300,
	},

});

module.exports = HistoryTab;
