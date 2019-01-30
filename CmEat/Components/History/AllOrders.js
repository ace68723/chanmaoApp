/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
	Dimensions,
  Image,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  View,
	TouchableWithoutFeedback
} from 'react-native';

import {cme_getLanguage} from '../../../App/Modules/Database';

import Order from './Order';
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';
import HomeStore from '../../Stores/HomeStore'
import Header from '../General/Header';
import HistoryOrderDetail from './HistoryOrderDetail';
import Modal from 'react-native-modalbox';

const {width,height} = Dimensions.get('window');

class AllOrders extends Component {
    constructor(props) {
        super(props);
				this._getCurrentPosition = this._getCurrentPosition.bind(this);
				this._renderContent = this._renderContent.bind(this);
				this._handleOnPressedAd = this._handleOnPressedAd.bind(this);
    }

		_getCurrentPosition(){
			return this.currentPosition
		}
		_handleOnPressedAd(advertisement){
			if(advertisement.navi_type == 2){
	      this.props.navigator.showModal({
	        screen: 'AdView',
	        animated: true,
	        navigatorStyle: {navBarHidden: true},
	        passProps: advertisement.navi_param
	      });
			}
			else if(advertisement.navi_type == 3){
	        this.props.navigator.showModal({
	          screen: 'CmEatMenu',
	          animated: false,
	          navigatorStyle: {navBarHidden: true},
	          passProps: {
	            py:height,
	            restaurant:advertisement.navi_param,
	          },
	        });
			}
		}
		_renderContent(){
			if (this.props.orderData.length > 0) {
				let orderList = this.props.orderData.map( order => {
					return (
						<Order key={ order.order_oid }
									 order={order}
									 orderOnClick = {this.props.orderOnClick}
									 goToRestaurant = {this.props.goToRestaurant}
									 scrollRef={this._scrollView}
									 getCurrentPosition={this._getCurrentPosition}
									 page={0}
									 handlePaymentRetry={this.props.handlePaymentRetry}
									 reorder={this.props.reorder}
									 isRefreshing={this.props.isRefreshing}
									 handleContactCustomerService={this.props.handleContactCustomerService}
									 />
					)
				});
				// show order ad
				if (this.props.orderAdData.length > 0){
					console.log(123);
					const adHeight = 110;
					const ad = this.props.orderAdData[0];
					const adCell = (
						<View style={{flexDirection: 'row', height: adHeight,}}>
							<TouchableWithoutFeedback onPress={this._handleOnPressedAd.bind(null, ad)}>
								<View style={[styles.adViewStyle, {marginLeft: 10, marginRight: 10}]}>
									<Image source={{uri: ad.image_url}} style={styles.adLarger}/>
								</View>
							</TouchableWithoutFeedback>
						</View>
					)
					orderList.splice(1, 0, adCell);
				}
				return(
					orderList
				)
			}else {
				const { height, width } = Dimensions.get('window');
				const language = cme_getLanguage();
				if (language == 'chinese_simple') {
					return(
						<Image style={{height: height, width: width}} source={require('./Image/cm_no_order.png')}></Image>
					)
				}
				else {
					return(
						<Image style={{height: height, width: width}} source={require('./Image/cm_no_order.png')}></Image>
					)
				}
			}
		}
    render(){
      return(
         <View style={styles.mainContainer}>
             <ScrollView style={styles.scrollView}
   										 scrollEventThrottle= {16}
   										 onScroll={(e)=>{this.currentPosition = e.nativeEvent.contentOffset.y}}
   										 refreshControl={
   											 <RefreshControl
   												 refreshing={this.props.isRefreshing}
   												 onRefresh={this.props.onRefresh}
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

// <ScrollView style={{flex: 1}}
// 　　keyboardShouldPersistTaps={'always'}ref='scroll'>
//  <TextInput
// 		 style={{height: 40,
// 						 borderColor: '#d9d9d9',
// 						 fontFamily:'NotoSans-Regular',
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
		fontFamily:'NotoSans-Regular',
  },
	modal: {
		justifyContent: 'center',
		height: 400,
		width: 300,
	},
	adViewStyle:{
		alignItems:'center',
		flex: 1,
		borderRadius: 6,
		overflow: 'hidden',
	},
  adLarger:{
		...StyleSheet.absoluteFillObject,
  },
});

module.exports = AllOrders;
