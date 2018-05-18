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

} from 'react-native';

import Order from './Order';
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';
import HomeStore from '../../Stores/HomeStore'
import Header from '../General/Header';
import HistoryOrderDetail from './HistoryOrderDetail';
import Modal from 'react-native-modalbox';

class OrdersNotReviewed extends Component {
    constructor(props) {
        super(props);
				this._getCurrentPosition = this._getCurrentPosition.bind(this);
				this._renderContent = this._renderContent.bind(this);
    }

		_getCurrentPosition(){
			return this.currentPosition
		}
		// _reorder(rid){
    //   this.props.navigator.showModal({
    //     screen: 'CmEatMenu',
    //     navigatorStyle: {navBarHidden: true},
    //     passProps: {
    //       py:800,
    //       restaurant:HomeStore.getRestaurantWithRid(rid),
    //     },
    //   });
		// }
		_renderContent(){
			if (this.props.orderData.length > 0) {
				let _orderList = [];
				for (let order of this.props.orderData) {
					if (order.order_review_status === 0 && order.order_status == 40) {
						_orderList.push(
							<Order key={ order.order_oid }
										 order={order}
										 orderOnClick = {this.props.goToComments}
										 goToRestaurant = {this.props.goToRestaurant}
										 scrollRef={this._scrollView}
										 getCurrentPosition={this._getCurrentPosition}
										 page={1}
										 reorder={this.props.reorder}/>
						)
					}
				}
				if (_orderList.length > 0) {
					return(
						_orderList
					)
				}
				else {
					const { height, width } = Dimensions.get('window');
					return(
						<Image style={{height: height, width: width}} source={require('./Image/cm_no_order_for_review.png')}></Image>
					)
				}
			}else {
				const { height, width } = Dimensions.get('window');
				return(
					<Image style={{height: height, width: width}} source={require('./Image/cm_no_order_for_review.png')}></Image>
				)
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

module.exports = OrdersNotReviewed;
