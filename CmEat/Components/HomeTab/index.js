'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
	Easing,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
	TouchableOpacity,
  TouchableWithoutFeedback,
  View,
	FlatList
} from 'react-native';
import RestaurantTab from '../Restaurant/RestaurantTab'
import RestaurantCard from '../Restaurant/RestaurantCard';
import HeaderWithBanner from './HeaderWithBanner';
import Label from '../../../App/Constants/AppLabel';
import DiscountView from './DiscountView'

import Carousel, { Pagination } from 'react-native-snap-carousel';

// import CheckoutModule from '../../Modules/CheckoutModule/CheckoutModule';


const {width,height} = Dimensions.get('window');
let marginTop;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 88;
}else{
  marginTop = 84;
}

const AD_INTERVAL = 7; // For every 7 cell, one cell of ad showed

export default class HomeTab extends Component {

  constructor(){
    super();
		this.state = {
			showScrollToResCards: true,
			scrollToResCardsOpacity: new Animated.Value(1),
		}
		this._handleOnPressAd = this._handleOnPressAd.bind(this);
		this._handleScrollToResCards = this._handleScrollToResCards.bind(this);
		this._handleOnScroll = this._handleOnScroll.bind(this);
		this._renderRestaurant = this._renderRestaurant.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
		this._renderScrollToResCards = this._renderScrollToResCards.bind(this);

  }

	_handleOnPressAd(advertisement){
		if(advertisement.navitype == 2){
      const {url} = advertisement.naviparam;
      this.props.navigator.showModal({
        screen: 'AdView',
        animated: true,
        navigatorStyle: {navBarHidden: true},
        passProps: {url: url}
      });
		}
		else if(advertisement.navitype == 3){
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
		else if(advertisement.navitype == 4) {
			if (advertisement.naviparam.target_page == 'cmwash') {
				this.props.navigator.resetTo({
		      screen: 'cmHome',
		      animated: true,
		      animationType: 'fade',
		      navigatorStyle: {
		        navBarHidden: true
		      },
		      passProps: {
		        goToCmLife: 'cmwash'
		      }
		    });
			}
		}
	}
	_handleScrollToResCards() {
		this.refs.flatlist.scrollToIndex({animated: true, index: 0, viewOffset: 50});
	}

	_handleOnScroll(event) {
		if (event.nativeEvent.contentOffset.y > (207 + parseInt(this.props.advertisement.length/2) * 160)) {
			// this.setState({showScrollToResCards: false});
			Animated.timing(this.state.scrollToResCardsOpacity, {
	        toValue: 0,
	        duration: 200,
	        easing: Easing.linear
	    }).start();
		}
		this.props.onScrollRestaurantsList(event);
	}

	_renderCarouselItem ({item, index}) {
		return (
			<TouchableOpacity
				activeOpacity={1}
				style={{ flex: 1 }}
				onPress={() => { alert(`You've clicked '${index}'`); }}
			>
				<View style={{
						flex: 1,
		        marginBottom: 0, // Prevent a random Android rendering issue
						width: width - 32 * 2,
						height: 160,
						paddingBottom: 18,
						shadowOpacity: 0.55,
						shadowRadius: 4,
						shadowColor: 'grey',
						shadowOffset: { height: 2, width: 2 },
					}}>
						<Image
	            source={{ uri: item.image }}
	            style={{
								...StyleSheet.absoluteFillObject,
								resizeMode: 'center',
								borderRadius: 8,
							}}
	          />
				</View>
			</TouchableOpacity>

		);
	}

	_renderHeader() {
		const items = [
			{image: "https://i.imgur.com/DDajebx.png"},
			{image: "https://i.imgur.com/DDajebx.png"},
			{image: "https://i.imgur.com/DDajebx.png"}
		]
		return(
			<View>
				<View style={{height: 180, backgroundColor: '#F2F2F2'}}>
					<Carousel
						ref={c => this._sliderRef = c}
						data={items}
						renderItem={this._renderCarouselItem}
						hasParallaxImages={true}
						sliderWidth={width}
						itemWidth={width - 32 * 2}
						hasParallaxImages={false}
						firstItem={0}
						inactiveSlideScale={0.9}
						inactiveSlideOpacity={0.6}
						containerCustomStyle={{
			        overflow: 'visible',
		    		}}
						contentContainerCustomStyle={{
		        	paddingVertical: 10
		    		}}
						loop={true}
						loopClonesPerSide={2}
						autoplay={true}
						autoplayDelay={500}
						autoplayInterval={5000}
						onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
					/>
					<Pagination
		        dotsLength={items.length}
		        activeDotIndex={this.state.slider1ActiveSlide ? this.state.slider1ActiveSlide : 0}
		        containerStyle={{paddingVertical: 6, marginBottom: 8}}
		        dotColor={'#D46A36'}
		        dotStyle={{ width: 6, height: 6, borderRadius: 6, marginHorizontal: -6 }}
		        inactiveDotColor={"#8E8E8E"}
		        inactiveDotOpacity={0.6}
		        inactiveDotScale={1}
		        carouselRef={this._sliderRef}
		        tappableDots={!!this._sliderRef}
	      	/>
				</View>
				<View style={{paddingTop: 14, height: 180, backgroundColor: 'white'}}>
					<DiscountView/>
				</View>

				<View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F2F2', height: 50, flexDirection: 'row'}}>
					<Image
						source={require('./Image/arrow-100x100.gif')}
						style={{height: 20, width: 20, marginRight: 8}}
					/>
					<Text
						style={{
							textAlign: 'center',
							fontSize: 14,
							fontWeight: '700',
							color: 'black',
							fontFamily:'NotoSans-Regular'
						}}
						allowFontScaling={false}>
					在下面点餐哟~
					</Text>
				</View>

			</View>

		)
	}

	_renderRestaurant({index, item}) {
		// Determine if ad will be inserted
		let adCell;
		if (index % AD_INTERVAL == 0 && index != 0){
			adCell = this._renderRestaurantAd(index);
		}

		const restaurant = item;
		return (
			<View>
				{adCell}
				<RestaurantCard
				restaurant={restaurant}
				navigator={this.props.navigator}></RestaurantCard>
			</View>

		)
	}

	_renderRestaurantAd(index) {
		index -= 1;
		let adIndex = ~~(index / AD_INTERVAL);
		adIndex += adIndex

		if (adIndex > this.props.advertisement.length - 2){
			return;
		}
		const advertisementLeft = this.props.advertisement[adIndex];
		const advertisementRight = this.props.advertisement[adIndex + 1];
		const adHeight = 110;
		return(
			<View style={{flexDirection: 'row', height: adHeight, marginBottom: 6}}>

				<TouchableWithoutFeedback onPress={this._handleOnPressAd.bind(null, advertisementLeft)}>
					<View style={[styles.adViewStyle, {marginLeft: 6, marginRight: 3}]}>
						<Image source={{uri: advertisementLeft.image}} style={styles.adLarger}/>
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback onPress={this._handleOnPressAd.bind(null, advertisementRight)}>
					<View style={[styles.adViewStyle, {marginRight: 6, marginLeft: 3}]}>
						<Image source={{uri: advertisementRight.image}} style={styles.adLarger}/>
					</View>
				</TouchableWithoutFeedback>

			</View>

		)
	}

	_renderScrollToResCards() {
		if (this.props.showIntroduction) {
			return(
				<Animated.View style={{position: 'absolute',
																	bottom: 0,
																	backgroundColor: 'rgba(1,1,1,0.7)',
																	height: 65,
																	left: 0,
																	right: 0,
																	paddingLeft: 50,
																	paddingRight: 50,
																	opacity: this.state.scrollToResCardsOpacity}}>
						<TouchableOpacity style={{flex: 1,
																			flexDirection: 'row',
																			justifyContent: 'space-around',
																			alignItems: 'center'}}
															activeOpacity={0.4}
															onPress={this._handleScrollToResCards}
															>
								<Text style={{textAlign: 'center',
															fontSize: 21,
															fontWeight: '700',
															color: 'white',
															fontFamily:'NotoSans-Regular'}}
											allowFontScaling={false}>
											下划点餐~
								</Text>
								<Image source={require('./Image/arrow-100x100.gif')}
											 style={{height: 40, width: 40}}/>
						</TouchableOpacity>
				</Animated.View>
			)
		}
	}


  render(){

    if (!this.props.restaurantList || this.props.restaurantList.length == 0){
			return <Image  style={{marginTop: 20, height: height, width: width}} source={require('./Image/no_restaurants_main.png')}/>;
		}
		let all = this.props.restaurantList;
		let keyExtractor = (item, index) => item.rid.toString();
		return (
			<View style={{marginTop: marginTop}}>
					<FlatList
							key='key'
							ref={'flatlist'}
							data={all}
							ListHeaderComponent={this._renderHeader}
							renderItem={this._renderRestaurant}
							keyExtractor={keyExtractor}
							extraData={all}
							onScroll={(ref) => this._handleOnScroll(ref)}
							scrollEventThrottle={200}
							contentContainerStyle={{backgroundColor: '#F2F2F2'}}
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
