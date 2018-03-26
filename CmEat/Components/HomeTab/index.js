'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
	TouchableOpacity,
  TouchableWithoutFeedback,
  View,
	FlatList,
} from 'react-native';

import RestaurantTab from '../Restaurant/RestaurantTab'
import RestaurantCard from '../Restaurant/RestaurantCard';
import HeaderWithBanner from './HeaderWithBanner';

const {width,height} = Dimensions.get('window');
let marginTop;
let tabBarHeight;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 88+200-44;
	tabBarHeight = 80;
}else{
  marginTop = 54+200-20;
	tabBarHeight = 50;
}
export default class HomeTab extends Component {

  constructor(){
    super();
		this.state = {
			showScrollToResCards: true,
		}
		this._handleOnPress = this._handleOnPress.bind(this);
		this._handleScrollToResCards = this._handleScrollToResCards.bind(this);
		this._handleOnScroll = this._handleOnScroll.bind(this);
		this._renderRestaurant = this._renderRestaurant.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
		this._renderScrollToResCards = this._renderScrollToResCards.bind(this);
  }
	_handleOnPress(advertisement){
		if(advertisement.navitype == 2){
      const {url} = advertisement.naviparam;
      this.props.navigator.showModal({
        screen: 'AdView',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps: {url: url}
      });
		}
		if(advertisement.navitype == 3){
        this.props.navigator.showModal({
          screen: 'CmEatMenu',
          animated: false,
          navigatorStyle: {navBarHidden: true},
          passProps: {
            py:height,
            restaurant:advertisement.naviparam,
          },
        });
		}
	}
	_handleScrollToResCards() {
		this.refs.flatlist.scrollToIndex({animated: true, index: 0, viewOffset: 50});
	}

	_handleOnScroll(event) {
		if (event.nativeEvent.contentOffset.y > (207 + parseInt(this.props.advertisement.length/2) * 160)) {
			this.setState({showScrollToResCards: false});
		}
		else if (!this.state.showScrollToResCards) {
			this.setState({showScrollToResCards: true});
		}
	}

  _renderAdv(){
    if(this.props.advertisement && this.props.advertisement.length>0){
				let Ad = this.props.advertisement.map((advertisement,index)=>{
					return(
						<TouchableWithoutFeedback key={index} onPress={this._handleOnPress.bind(null,advertisement)}>
							<View style={styles.autoViewStyle}>
								<Image source={{uri:advertisement.image}} style={styles.adLarger}/>
							</View>
						</TouchableWithoutFeedback>
					)

				})
      return(
        <View style={styles.container}>
					{Ad}
        </View>

      )
    }
  }

	_renderHeader() {
		return(
			<View style={{paddingBottom: 8}}>
      <HeaderWithBanner
           bannerList={this.props.bannerList}
           navigator={this.props.navigator}/>
          {this._renderAdv()}
				<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 8}}>
					<Image style={{height: 25, width: 25}} source={require('./Image/order.png')}/>
					<Text allowFontScaling={false}
								style={{alignSelf: 'center',
												fontSize: 16,
												fontWeight: '500',
												fontFamily:'FZZhunYuan-M02S'}}>在下面点餐呦</Text>
				</View>
				<View style={{justifyContent: 'center'}}>
					<Image style={{height: 12, width: 12, alignSelf: 'center'}} source={require('./Image/order_down.png')}/>
				</View>
			</View>
		)
	}

	_renderRestaurant({item}) {
		const restaurant = item;
			if(restaurant){
				return (<RestaurantCard
					restaurant={restaurant}
					openMenu={this.props.openMenu}
					navigator={this.props.navigator}
					/>);
			}
	}
	_renderRestaurants() {
		if (this.props.restaurants.length == 0){
			return;
		}
		let all = this.props.restaurants[0].restaurantList;
		let keyExtractor = (item, index) => item.area + item.rid;
		return (
			<FlatList
					style={{marginTop: 8,}}
					key='key'
					ref={(comp) => this._scrollVew = comp}
					data={all}
					ListHeaderComponent={this._renderHeader}
					renderItem={this._renderRestaurant}
					keyExtractor={keyExtractor}
					extraData={all}
			/>
		);
	}

	_renderScrollToResCards() {
		if (this.state.showScrollToResCards) {
			return(
				<TouchableOpacity style={{position: 'absolute',
																	flexDirection: 'row',
																	justifyContent: 'space-around',
																	alignItems: 'center',
																	bottom: tabBarHeight,
																	backgroundColor: 'rgba(1,1,1,0.7)',
																	height: 65,
																	left: 0,
																	right: 0,
																	paddingLeft: 50,
																	paddingRight: 50}}
													activeOpacity={0.4}
													onPress={this._handleScrollToResCards}
													>
						<Text style={{textAlign: 'center',
													fontSize: 21,
													fontWeight: '700',
													color: 'white',
													fontFamily:'FZZongYi-M05S'}}
									allowFontScaling={false}>
									下划点餐哦~
						</Text>
						<Image source={require('./Image/arrow-100x100.gif')}
									 style={{height: 40, width: 40}}/>
				</TouchableOpacity>
			)
		}
	}


  render(){

    if (this.props.restaurants.length == 0){
			return <View/>;
		}
		let all = this.props.restaurants[0].restaurantList;
		let keyExtractor = (item, index) => item.area + item.rid;
		return (
			<View style={{marginTop: 8}}>
					<FlatList
							style={{}}
							key='key'
							ref={'flatlist'}
							data={all}
							ListHeaderComponent={this._renderHeader}
							renderItem={this._renderRestaurant}
							keyExtractor={keyExtractor}
							extraData={all}
							onScroll={(ref) => this._handleOnScroll(ref)}
							scrollEventThrottle={200}
					/>
					{this._renderScrollToResCards()}
			</View>
		);



    // return(
    //     <ScrollView style={styles.scrollView}
		// 								ref={'_scrollVew'}
    //                 scrollEventThrottle={1}
		// 		            onScroll={this.props.scrollEventBind()}
		// 								showsVerticalScrollIndicator={false}>
    //
    //         <View style={{marginTop:marginTop,height:0}}
    //                ref={'_scrollViewContent'}/>
    //
		// 				{this._renderAdv()}
		// 				{this._renderRestaurants()}
    //     </ScrollView>
    //
    //
    // )
  }
}
const styles = StyleSheet.create({
	container: {
	 flexDirection:'row',
	 flexWrap:'wrap',
	},
	scrollView:{
		flex: 1,
	},
	autoViewStyle:{
		alignItems:'center',
		width:(width-9)/2,
		height:(width-9)/(2*1.157),
		marginLeft:3,
		marginTop:3,
	},
  adLarger:{
    borderRadius:5,
    width:(width-9)/2,
    height:(width-9)/(2*1.157),
  },
  adSmall:{
    width:(width-7)/2,
    height:(width-7)/(2*2.358),
  },
});
