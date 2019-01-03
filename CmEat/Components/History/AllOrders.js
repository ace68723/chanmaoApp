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

class AllOrders extends Component {
    constructor(props) {
        super(props);
				this._getCurrentPosition = this._getCurrentPosition.bind(this);
				this._renderContent = this._renderContent.bind(this);
    }

		_getCurrentPosition(){
			return this.currentPosition
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
									 isRefreshing={this.props.isRefreshing}/>
					)
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
		fontFamily:'NotoSans-Black',
  },
	modal: {
		justifyContent: 'center',
		height: 400,
		width: 300,
	},

});

module.exports = AllOrders;
