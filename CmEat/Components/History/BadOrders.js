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

import Order from './Order';
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';
import HomeStore from '../../Stores/HomeStore'
import Header from '../General/Header';
import HistoryOrderDetail from './HistoryOrderDetail';
import Modal from 'react-native-modalbox';
import PopupView from '../Popup/PopupView'

class AllOrders extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({},HistoryStore.getState(),{showHistoryOrderDetail:false, renderingPage: 0});
        this._onChange = this._onChange.bind(this);
				this._goBack = this._goBack.bind(this);
				this._goBackToHistory = this._goBackToHistory.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._doAutoRefresh = this._doAutoRefresh.bind(this);
        this._HistoryOrderDetailVisible = this._HistoryOrderDetailVisible.bind(this);
				this._goToComments = this._goToComments.bind(this);
        this._reorder = this._reorder.bind(this);
				this._handleAppStateChange = this._handleAppStateChange.bind(this);
				this._getCurrentPosition = this._getCurrentPosition.bind(this);
				this._renderContent = this._renderContent.bind(this);
				this._goToRestaurant = this._goToRestaurant.bind(this);

				this.popupView = PopupView.getInstance();
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

					this.popupView.setMessagePopup({
					  title: "验证码错误",
					  subtitle: "请检查您输入的验证码",
					  onDismiss: () => {
					    this.setState({showPopup: false})
					  }
					});
					this.setState({showPopup: true});

          // Alert.alert(
          //   '验证码错误',
          //   '请检查您输入的验证码',
          //   [
          //     {text: '确认', onPress: () => {}},
          //   ],
          // );
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
      // }
    }
		_goToRestaurant(state) {
	    this.props.navigator.showModal({
	      screen: 'CmEatMenu',
	      animated: false,
	      navigatorStyle: {navBarHidden: true},
	      passProps: {
	        py:272,
	        restaurant:state.orderInfo,
	      },
	    });
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
				// setTimeout( () =>{
				// 	if(this.state.showHistoryOrderDetail){
				// 		this.props.hideTabBar();
				// 	}else{
				// 		this.props.showTabBar();
				// 	}
				// }, 400);
    }
		_goToComments(orderInfo){
				this.props.navigator.showModal({
		      screen: 'CmCommentDetail',
		      animated: false,
		      navigatorStyle: {navBarHidden: true},
		      passProps: {
		        py:272,
						goBack: this._goBackToHistory,
						orderInfo: orderInfo
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
		_renderContent(){
			if (this.state.orderData.length > 0) {
				let orderList = this.state.orderData.map( order => {
					if (order.order_payment_status === 30 || order.order_payment_status === 40) {
						return (
							<Order key={ order.order_oid }
										 order={order}
										 orderOnClick = {this.props.orderOnClick}
										 goToRestaurant = {this._goToRestaurant}
										 scrollRef={this._scrollView}
										 getCurrentPosition={this._getCurrentPosition}
										 page={2}
										 reorder={this._reorder}/>
						)
					}
				});
				return(
					orderList
				)
			}else {
				const { height, width } = Dimensions.get('window');
				return(
					<Image style={{height: height, width: width}} source={require('./Image/cm_no_order.png')}></Image>
				)
			}
		}
    render(){
      return(
         <View style={styles.mainContainer}>
							{this.state.showPopup && this.popupView.show()}
             <ScrollView style={styles.scrollView}
   										 scrollEventThrottle= {16}
   										 onScroll={(e)=>{this.currentPosition = e.nativeEvent.contentOffset.y}}
   										 refreshControl={
   											 <RefreshControl
   												 refreshing={this.state.isRefreshing}
   												 onRefresh={this._onRefresh}
   												 tintColor="#ff8b00"
   												 title="正在刷新啦..."
   												 titleColor="#ff8b00"
   											 />
   										 }
   										 ref={(ref) => this._scrollView = ref}
   										 keyboardShouldPersistTaps={"always"}
   										 >

                {this._renderContent()}

   					</ScrollView>
         </View>
      )



    }

}


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
		fontFamily:'NotoSans-Regular',
  },
	modal: {
		justifyContent: 'center',
		height: 400,
		width: 300,
	},

});

module.exports = AllOrders;
