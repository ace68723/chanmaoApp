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
  TouchableWithoutFeedback,
  View,
	FlatList,
} from 'react-native';

import RestaurantTab from '../Restaurant/RestaurantTab'
import RestaurantCard from '../Restaurant/RestaurantCard';

const {width,height} = Dimensions.get('window');
let marginTop
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 88+200-44+30;
}else{
  marginTop = 54+200-20+30;
}
export default class LoginButton extends Component {

  constructor(){
    super();
		this._handleOnPress = this._handleOnPress.bind(this);
  }
	componentDidMount(){

    const index = this.props.index;
		const scrollView = this.refs._scrollVew;
		const scrollViewContent = this.refs._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref);
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
	_renderRestaurants() {
		if (this.props.restaurants.length == 0){
			return;
		}
		let all = [this.props.restaurants[0]];
		let restaurantTabs = all.map( (area,key) => {
			return 	(<RestaurantTab
									tabLabel={area.name}
									key={key}
									index={key}
									restaurantList={area.restaurantList}
									navigator={this.props.navigator}
									getScrollViewRefs={this.props.getScrollViewRefs}
									refsCurrentScrollView= {this.props.refsCurrentScrollView}
									hideTabBar = {this.props.hideTabBar}
									showTabBar = {this.props.showTabBar}
									scrollEventBind = {this.props.scrollEventBind}
									scrollY = {this.props.scrollY._value}/>)
		 });
		return restaurantTabs;



		let keyExtractor = (item, index) => item.area + item.rid;
		return (
			<FlatList
					scrollEventThrottle={1}
					data={all}
					renderItem={this._renderRestaurant}
					keyExtractor={keyExtractor}
					removeClippedSubviews={true}
					initialNumToRender={1}
					onEndReachedThreshold={0.5}
			/>
		)
	}
	_renderRestaurant({item}) {
		const restaurant = item;
			if(restaurant){
				return (<RestaurantCard restaurant={restaurant}/>)
			}
	}
  render(){
    return(
        <ScrollView style={styles.scrollView}
										ref={'_scrollVew'}
                    scrollEventThrottle={1}
				            onScroll={this.props.scrollEventBind()}
										showsVerticalScrollIndicator={false}>

             <View style={{marginTop:marginTop,height:0}}
                   ref={'_scrollViewContent'}/>
						 {this._renderAdv()}
						 {this._renderRestaurants()}
        </ScrollView>


    )
  }
}
const styles = StyleSheet.create({
	container: {
	 flex: 1,
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
