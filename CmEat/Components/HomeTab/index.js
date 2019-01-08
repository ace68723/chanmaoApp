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
export default class HomeTab extends Component {

  constructor(){
    super();
		this.state = {
			showScrollToResCards: true,
			scrollToResCardsOpacity: new Animated.Value(1),
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
			        overflow: 'visible'
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
				<View style={{marginTop: 12, height: 170}}>
					<DiscountView/>
				</View>

			</View>

		)
	}

	_renderRestaurant({item}) {
		const restaurant = item;
			if(restaurant){
				return (<RestaurantCard
					restaurant={restaurant}
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
					style={{marginTop: 8, backgroundColor: '#F2F2F2'}}
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
