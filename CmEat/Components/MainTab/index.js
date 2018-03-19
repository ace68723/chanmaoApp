'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
	FlatList
} from 'react-native';

import _forEach from 'lodash/forEach';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';
import HeaderWithBanner from './HeaderWithBanner';
import CmEatHomeHeader from './CmEatHomeHeader';

import HomeTab from '../HomeTab/'
import RestaurantTab from '../Restaurant/RestaurantTab'
import RestaurantCard from '../Restaurant/RestaurantCard';
// import Menu from '../Restaurant/Menu';

import HomeAction from '../../Actions/HomeAction';
import AddressAction from '../../Actions/AddressAction';
import HomeStore from '../../Stores/HomeStore';


const {width,height} = Dimensions.get('window');
// const HEADER_MAX_HEIGHT = width*0.45+6;
const HEADER_MAX_HEIGHT = 220;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
let _scrollY = 0;
let marginTop;
if(height == 812){
  //min 34
  //header 88 + swiper 200 - FlatList margin 34 + tabbar 30
  marginTop = 34;
}else{
  marginTop = 20;
}
export default class MainTab extends Component {

  constructor(){
    super()
    this.scrollViewRefs = [];
		const state = {
      scrollY: new Animated.Value(0),
			restaurantCoverOpacity: new Animated.Value(0), // init restaurant tab view opacity 0
      renderSearch:false,
		}
		this.state = Object.assign({},state,HomeStore.getHomeState());
    this._onChange = this._onChange.bind(this);
    this._scrollEventBind = this._scrollEventBind.bind(this);
    this._getScrollViewRefs= this._getScrollViewRefs.bind(this);
    this._handleBackToHome = this._handleBackToHome.bind(this);
    this._goToRestaurantSearch = this._goToRestaurantSearch.bind(this);
		this._onChangeTab = this._onChangeTab.bind(this);
		this.showBanner = true;
  }
	async componentDidMount(){
    await AddressAction.getAddress();
    HomeAction.getHomeData();
    HomeStore.addChangeListener(this._onChange);
	}
	componentWillUnmount(){
		HomeStore.removeChangeListener(this._onChange);
	}
	shouldComponentUpdate(nextProps, nextState){
		if( nextState != this.state){
			return true
		}else{
			return false
		}
	}
  _onChange(){
    const newState = Object.assign({},HomeStore.getHomeState(),{renderSearch:true,});
    this.setState(newState);

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
  _handleBackToHome(){
    this.props.navigator.resetTo({
        screen: 'cmHome',
        animated: true,
        animationType: 'fade',
        navigatorStyle: {navBarHidden: true},
      });
  }
  _setPosition(){
    try {
      if (this.setPositionStarted) return
      this.setPositionStarted = true;
      setTimeout(()=>{
        this.setPositionStarted = false;
      }, 500);
      if(_scrollY != this.state.scrollY._value ){
         if(this.state.scrollY._value <= HEADER_MAX_HEIGHT){
             _scrollY = this.state.scrollY._value;

             _forEach(this.scrollViewRefs,(ref,index)=>{
                  if(index == 0) {ref.scrollView.scrollTo({y:this.state.scrollY._value,animated: false});return};
                  ref.scrollView.scrollToOffset({offset: this.state.scrollY._value,animated:false});
             })

         } else {
           _forEach(this.scrollViewRefs,(ref,index)=>{
              if(index == 0) {ref.scrollView.scrollTo({y:this.state.scrollY._value,animated: false});return};
               // ref.scrollViewContent.measure((ox, oy, width, height, px, py) => {
                 // if( py>40 ){
                   _scrollY = HEADER_MAX_HEIGHT;
                   ref.scrollView.scrollToOffset({offset: HEADER_MAX_HEIGHT,animated:false});
                 // }
                // });
           })
         }
      }
    } catch (e) {
      console.log(e)
    }

  }
  // setPosition(){
  //   try {
  //     if(this.scrollViewRefs.length === 0 || _scrollY === this.state.scrollY._value) return
  //
  //     if(this.state.scrollY._value<=200+width*0.4831*1.3699){
  //       _forEach(this.scrollViewRefs,(ref,index)=>{
  //         if(index == 0) {ref.scrollView.scrollTo({y:this.state.scrollY._value,animated: false});return};
  //         ref.scrollView.scrollToOffset({offset:this.state.scrollY._value,animated: false});
  //       })
  //     }
       // if(this.state.scrollY._value<=200+height*0.081){
       //
    		// 	 _scrollY = this.state.scrollY._value;
    		// 	 _forEach(this.scrollViewRefs,(ref,index)=>{
       //       if(index == 0) {ref.scrollView.scrollTo({y:this.state.scrollY._value,animated: false});return};
       //       if(!ref.scrollView.scrollToOffset){console.log(ref,index);return}
    		// 		  if(ref.index != this.state.currentTab){
    		// 			 ref.scrollView.scrollToOffset({offset:this.state.scrollY._value,animated: false});
    		// 		  }
    		// 	 })
       //
       // }else {
       //
       //   _forEach(this.scrollViewRefs,(ref,index)=>{
       //
       //     if(index == 0) {ref.scrollView.scrollTo({y:200+height*0.081,animated: false});return};
       //     // if(!ref.scrollView.scrollToOffset){console.log(ref,index);return}
       //     if(ref.index != this.state.currentTab){
       //       console.log(ref.scrollViewContent)
       //       // ref.scrollViewContent.measure((ox, oy, width, height, px, py) => {
       //     //     if(py>40 ){
       //           ref.scrollView.scrollToOffset({offset:200+height*0.081,animated: false});
       //     //
       //     //     }
       //        // });
       //      }
       //   })
       // }
  //   } catch (e) {
  //     console.log(e)
  //   }
  //
  //
  // }
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
  _goToRestaurantSearch(){
    this.props.navigator.push({
      screen: 'CmRestaurantSearch',
      animated: false,
      navigatorStyle: {navBarHidden: true},
      passProps: {
        restaurant:this.state.areaList[0].restaurantList,
      },
    });
  }
	renderScrollableTabView(){
		return(
			<ScrollableTabView  style={{flex:1,}}
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
														this._setPosition()
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
											restaurants = {this.state.areaList}
											scrollY = {this.state.scrollY}
											openMenu = {this._goToRestaurantSearch}
											/>
			</ScrollableTabView>
		)
  }
  render(){
    return(
      <View style={{flex: 1}}>
				{this.renderScrollableTabView()}
        <CmEatHomeHeader scrollY = {this.state.scrollY}
                         handleBackToHome={this._handleBackToHome}
                         renderSearch={this.state.renderSearch}
                         goToRestaurantSearch={this._goToRestaurantSearch}/>
         <HeaderWithBanner
              bannerList={this.state.bannerList}
              scrollY = {this.state.scrollY}
              navigator={this.props.navigator}/>
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
