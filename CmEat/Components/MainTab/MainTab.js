'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
	AppState,
  Dimensions,
  Image,
  Platform,
	findNodeHandle,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import _forEach from 'lodash/forEach';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';
import HeaderWithBanner from './HeaderWithBanner';
import CmEatHomeHeader from './CmEatHomeHeader';

import HomeTab from '../Home/HomeTab'
import RestaurantTab from '../Restaurant/RestaurantTab'
import Menu from '../Restaurant/Menu';

import HomeAction from '../../Actions/HomeAction';
import RestaurantAction from '../../Actions/RestaurantAction';
import HomeStore from '../../Stores/HomeStore';

const UIManager = require('NativeModules').UIManager;

const {width,height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200+height*0.081;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
let _scrollY = 0;
export default class MainTab extends Component {

  constructor(){
    super()
    this.scrollViewRefs = [];
		const state = {
      scrollY: new Animated.Value(0),
			restaurantCoverOpacity: new Animated.Value(0), // init restaurant tab view opacity 0
		}
		this.state = Object.assign({},state,HomeStore.getHomeState());
    this._onChange = this._onChange.bind(this);
    this._scrollEventBind = this._scrollEventBind.bind(this);
    this._getScrollViewRefs= this._getScrollViewRefs.bind(this);
		this._openMenu = this._openMenu.bind(this);
		this._closeMenu = this._closeMenu.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this._handleAppStateChange = this._handleAppStateChange.bind(this);
		this.showBanner = true;
  }
	componentDidMount(){
    HomeAction.getHomeData();
		RestaurantAction.getRestaurant();
    HomeStore.addChangeListener(this._onChange);
		AppState.addEventListener('change', this._handleAppStateChange);
	}
	componentWillUnmount(){
		HomeStore.removeChangeListener(this._onChange);
		AppState.removeEventListener('change', this._handleAppStateChange);
	}
	shouldComponentUpdate(nextProps, nextState){
		if( nextState != this.state){
			return true
		}else{
			return false
		}
	}
  _onChange(){
    const newState = HomeStore.getHomeState();
    this.setState(newState);
    console.log('_onChange',this.state)
  }
	_handleAppStateChange(currentAppState) {
		if(currentAppState === 'active'){
			HomeAction.getHomeData();
		}
	}
  // ui methond
  _scrollEventBind(){
    return(
      Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
          // { useNativeDriver: true }
        )
    )
  }
  _getScrollViewRefs(ref:object){
      this.scrollViewRefs = [...this.scrollViewRefs,ref]
  }

  setPosition(){
		if(_scrollY != this.state.scrollY._value ){
		   if(this.state.scrollY._value<=200+height*0.081){

					 _scrollY = this.state.scrollY._value;

					 _forEach(this.scrollViewRefs,(ref,index)=>{
             if(!ref.scrollView.scrollTo){console.log(ref,index);return}
						//  if(ref.index != this.state.currentTab){
							 ref.scrollView.scrollTo({y: this.state.scrollY._value,animated:false});
						//  }
					 })

		   }else {
		     _forEach(this.scrollViewRefs,(ref,index)=>{
           if(!ref.scrollView.scrollTo){console.log(ref,index);return}
		      //  if(ref.index != this.state.currentTab){
		         ref.scrollViewContent.measure((ox, oy, width, height, px, py) => {
		           if(py>40 ){
		             ref.scrollView.scrollTo({y: 200+height*0.081,animated:false});
		           }
		          });
		      //  }
		     })
		   }
		}
  }
	_onChangeTab(tabRef){
		this.setState(
			{ currentTab:tabRef.i,
				oldTab:tabRef.from,
				updatePosition:false
			})
			if(tabRef.i == 0){
				// this.props.showTabBar();
			}else{
				// this.props.hideTabBar();
			}
	}
	_openMenu(py,restaurant){
			// this.props.navigator.push({
			// 	 id: 'Menu',
			// 	 py:py,
			// 	 restaurant:restaurant,
			//  })
			this.setState({
        py:py,
  			restaurant:restaurant,
        showAnimatedView:true,
      })
	}

	_renderRestaurantCover(){
      // if(this.state.showAnimatedView){
      //   return(
      //     <Animated.View style={{position:'absolute',
      //                            top:0,
      //                            left:0,
      //                            right:0,
      //                            bottom:0,
      //                            backgroundColor:'#ffffff',
      //                            opacity:this.state.restaurantCoverOpacity}}>
      //     </Animated.View>
      //   )
      // }
  }
	_closeMenu(){
      // Animated.timing(          // Uses easing functions
      //   this.state.restaurantCoverOpacity,    // The value to drive
      //   {toValue: 0,
      //    duration: 400,
      //   }            // Configuration
      // ).start();
      // setTimeout(() => {
			// 	this.setState({
			// 		showAnimatedView:false
			// 	})
      // },500)
			// setTimeout(()=>{
			// 	this.props.showTabBar();
			// }, 700);
      this.setState({
        showAnimatedView:false,
      })
    }
	_renderMenuView(){
		if(this.state.showAnimatedView){
			return(
				<Menu  restaurant={this.state.restaurant}
							 py={this.state.py}
							 closeMenu={this._closeMenu}
							 navigator={this.props.navigator}/>
			)
		}
	}
	renderScrollableTabView(){
		if(this.state.areaList && this.state.areaList.length>0){
      let restaurantTabs
      if(Platform.OS === 'ios') {
        restaurantTabs = this.state.areaList.map( (area,key) => {
  					return 	(<RestaurantTab
  														tabLabel={area.name}
  														key={key+2}
  														index={key+2}
  														restaurantList={area.restaurantList}
  														currentTab={this.state.currentTab}
  														area={area.area}
  														navigator={this.props.navigator}
  														openMenu={this._openMenu}
  														scrollEventBind={this._scrollEventBind}
  														getScrollViewRefs={this._getScrollViewRefs}
  														refsCurrentScrollView= {this.refsCurrentScrollView}
  														hideTabBar = {this.props.hideTabBar}
  														showTabBar = {this.props.showTabBar}
  														scrollY = {this.state.scrollY._value}/>)

  				});
      } else {
        const areaListAndroid = [this.state.areaList[0]]
        restaurantTabs = areaListAndroid.map( (area,key) => {
  					return 	(<RestaurantTab
  														tabLabel={area.name}
  														key={key+2}
  														index={key+2}
  														restaurantList={area.restaurantList}
  														currentTab={this.state.currentTab}
  														area={area.area}
  														navigator={this.props.navigator}
  														openMenu={this._openMenu}
  														scrollEventBind={this._scrollEventBind}
  														getScrollViewRefs={this._getScrollViewRefs}
  														refsCurrentScrollView= {this.refsCurrentScrollView}
  														hideTabBar = {this.props.hideTabBar}
  														showTabBar = {this.props.showTabBar}
  														scrollY = {this.state.scrollY._value}/>)

  				});
      }

			return(
				<ScrollableTabView  style={{}}
														tabBarPosition={'bottom'}
														tabBarBackgroundColor={'#fff'}
														tabBarActiveTextColor={'#ff8b00'}
														tabBarUnderlineColor={'#ff8b00'}
														tabBarTextStyle={{fontSize:18,fontFamily:'FZZhunYuan-M02S',}}
														tabBarInactiveTextColor={'#666666'}
														initialPage={0}
														prerenderingSiblingsNumber={7}
														renderTabBar={() =>
																				<DefaultTabBar
																				scrollY = {this.state.scrollY}
																				HEADER_SCROLL_DISTANCE = {HEADER_SCROLL_DISTANCE}/>}
														onScroll={(argument)=>{
															this.setPosition()
														}}
														page={this.state.page}
														onChangeTab={this._onChangeTab}>
							<HomeTab  tabLabel='主页'
												index={0}
												scrollEventBind={this._scrollEventBind}
												getScrollViewRefs={this._getScrollViewRefs}
												navigator={this.props.navigator}
												refsCurrentScrollView= {this.refsCurrentScrollView}
												advertisement={this.state.advertisement}
												hideTabBar = {this.props.hideTabBar}
												showTabBar = {this.props.showTabBar}
												openMenu = {this._openMenu}/>
							{restaurantTabs}
				</ScrollableTabView>
			)
		}
	}
  render(){
    return(
      <View style={{flex: 1}}>
				{this.renderScrollableTabView()}
        <HeaderWithBanner
						bannerList={this.state.bannerList}
						scrollY = {this.state.scrollY}
						openMenu = {this._openMenu}
						navigator={this.props.navigator}/>
        <CmEatHomeHeader scrollY = {this.state.scrollY}
                         handleBackToHome={this.props.handleBackToHome}/>
				{this._renderRestaurantCover()}
				{this._renderMenuView()}
     </View>
    )
  }
}
// <HomeTab  tabLabel='首页2'
// 					index={1}
// 					scrollEventBind={this._scrollEventBind}
// 					getScrollViewRefs={this._getScrollViewRefs}
// 					navigator={this.props.navigator}
// 					refsCurrentScrollView= {this.refsCurrentScrollView}
// 					advertisement={this.state.advertisement}/>

const styles = StyleSheet.create({

});
