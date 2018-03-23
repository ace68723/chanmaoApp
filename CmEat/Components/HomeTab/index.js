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
		this._renderRestaurant = this._renderRestaurant.bind(this);
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

	_renderHeader() {
		return(
			<View style={{paddingBottom: 8}}>
				<View style={{flexDirection: 'row', justifyContent: 'center'}}>
					<Image style={{height: 25, width: 25}} source={require('./Image/order.png')}/>
					<Text allowFontScaling={false}
								style={{alignSelf: 'center',
												fontSize: 16,
												fontWeight: '700',
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
	 flexDirection:'row',
	 flexWrap:'wrap',
	},
	scrollView:{
		flex: 1,
		marginTop: -30
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
