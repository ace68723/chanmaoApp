/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Platform,
  Text,
  NativeModules,
  StyleSheet,
} from 'react-native';
import _forEach from 'lodash/forEach';

import SboxHomeAction from '../../Actions/SboxHomeAction';
import SboxHomeStore from '../../Stores/SboxHomeStore';
import SboxProductTabStore from '../../Stores/SboxProductTabStore';

import {DatabaseInit} from '../../Modules/Database';
import Util from '../../Modules/Util';

import SboxHomeHeader from './SboxHomeHeader';
import HeaderWithBanner from './HeaderWithBanner';
import SboxProductTab from '../SboxProductTab/';
import SboxProductAction from '../../Actions/SboxProductAction';
// import SboxProductTab from '../SboxProductTab1.0/SboxProductTabViewController';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from './DefaultTabBar';

import SboxHomeBanner from './SboxHomeBanner';
const { width,height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = width*0.4831*1.3699;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
let _scrollY = 0;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class SboxHome extends Component {
  constructor() {
      super();
      this.state = SboxHomeStore.getState();
      this.state = {
        ...this.state,
        scrollY: new Animated.Value(0),
        scrollY2: new Animated.Value(0),
      }
      this.scrollViewRefs = [];
      this._onChange = this._onChange.bind(this);
      this.scrollY = new Animated.Value(0);
      this._setPosition = this._setPosition.bind(this);
      this._scrollEventBind = this._scrollEventBind.bind(this);
      this._getScrollViewRefs = this._getScrollViewRefs.bind(this);
      this._backToHome = this._backToHome.bind(this);
      this._renderScrollableTabView = this._renderScrollableTabView.bind(this);
      this._jumpToItem = this._jumpToItem.bind(this);
      this._goToSboxSearch = this._goToSboxSearch.bind(this);

  }
  componentWillMount() {
    DatabaseInit();
  }
  componentDidMount() {
      SboxHomeStore.addChangeListener(this._onChange);
      SboxHomeAction.getHomeData();
  }
  componentWillUnmount(){
      SboxHomeStore.removeChangeListener(this._onChange);
  }
  _onChange() {
      this.setState(SboxHomeStore.getState());
  }
  _goToSboxSearch(){
    this.props.navigator.push({
      screen: 'SboxProductSearch',
      animated: false,
      navigatorStyle: {navBarHidden: true},
      passProps: {
         productList:SboxProductTabStore.getProductList(),
         scrollEventBind: () => this._scrollEventBind(),
      },
    });
  }
  _backToHome() {
    this.props.navigator.resetTo({
        screen: 'cmHome',
        animated: true,
        animationType: 'fade',
        navigatorStyle: {navBarHidden: true},
      });
  }
  _jumpToItem(spu_id, sku_id){
    if (Util.getWaitingStatus() === true){
      return;
    }
    Util.toggleWaitingStatus();

    SboxProductAction.getSingleProduct(spu_id,sku_id);
    setTimeout( () => {
      this.props.navigator.push({
        screen: 'SboxProductDetial',
        navigatorStyle: {navBarHidden: true},
      })
    }, 150);
  }
  _setPosition(){
    if (this.setPositionStarted) return
    this.setPositionStarted = true;
    setTimeout(()=>{
      this.setPositionStarted = false;
    }, 500);
    if(_scrollY != this.state.scrollY._value ){
       if(this.state.scrollY._value <= HEADER_MAX_HEIGHT){
           _scrollY = this.state.scrollY._value;

           _forEach(this.scrollViewRefs,(ref,index)=>{
               ref.scrollView.scrollToOffset({offset: this.state.scrollY._value,animated:false});
           })

       } else {
         _forEach(this.scrollViewRefs,(ref,index)=>{
             ref.scrollViewContent.measure((ox, oy, width, height, px, py) => {
               if( py>40 ){
                 _scrollY = HEADER_MAX_HEIGHT;
                 ref.scrollView.scrollToOffset({offset: HEADER_MAX_HEIGHT,animated:false});
               }
              });
         })
       }
    }
  }
  _getScrollViewRefs(ref:object){
      this.scrollViewRefs = [...this.scrollViewRefs,ref]
  }

  _scrollEventBind(){
    return(
      Animated.event(
          [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
          //  { useNativeDriver: true }
        )
    )
  }
  _renderScrollableTabView() {
    let themeList = [];
    for (var index = 0; index < this.state.themeList.length; index++) {
      const theme = this.state.themeList[index];
      themeList.push(
          <SboxProductTab
              key={index}
              index={index}
              style={{marginTop:90}}
              tmid={theme.tmid}
              section_list={theme.section_list}
              prod_list={theme.prod_list}
              tabLabel={theme.name+ '|' +theme.icon_active + '|' + theme.icon_deactive}
              scrollEventBind={this._scrollEventBind}
              getScrollViewRefs={this._getScrollViewRefs}
              navigator={this.props.navigator}/>
      )
    }
    return(
      <ScrollableTabView style={{}}
                          tabBarPosition={'bottom'}
                          tabBarBackgroundColor={'#fff'}
                          tabBarActiveTextColor={'#ff7685'}
                          tabBarUnderlineColor={'#ff7685'}
                          tabBarTextStyle={{fontSize:15,fontFamily:'NotoSansCJKsc-Regular',}}
                          tabBarInactiveTextColor={'#666666'}
                          initialPage={0}
                          prerenderingSiblingsNumber={3}
                          renderTabBar={() =>
                                      <DefaultTabBar
                                      scrollY = {this.state.scrollY}
                                      HEADER_SCROLL_DISTANCE = {HEADER_SCROLL_DISTANCE}/>}
                          onScroll={(argument)=>{
                            this._setPosition()
                          }}
                          page={this.state.page}
                          onChangeTab={this._onChangeTab}>
          {themeList}
      </ScrollableTabView>
    );
  }
  _renderSingleTabView() {

    if(!this.state.themeList[0]) return;
    if (this.state.themeList.length > 1 && this.state.themeList[1].prod_list.length != 0){
      return this._renderScrollableTabView()
    }

    const theme = this.state.themeList[0];
    return (
      <SboxProductTab
        style={{ marginTop: -70}}
        tmid={theme.tmid}
        prod_list={theme.prod_list}
        section_list={theme.section_list}
        scrollEventBind={this._scrollEventBind}
        getScrollViewRefs={this._getScrollViewRefs}
        navigator={this.props.navigator}/>
    )
  }
  _renderHeaderWithBanner() {
    if (this.state.bannerList.length > 0) {
      return(
        <HeaderWithBanner
            bannerList={this.state.bannerList}
            navigator={this.props.navigator}
            openMenu = {this._openMenu}
            scrollY = {this.state.scrollY}
            jumpToItem = {this._jumpToItem}
        />
      )
    }
  }
  //
  render() {
      return (
        <View style={{ flex: 1,backgroundColor:'white'}}>
          {this._renderSingleTabView()}
          {this._renderHeaderWithBanner()}
          <SboxHomeHeader scrollY = {this.state.scrollY}
                          backToHome={this._backToHome}
                          goToSboxSearch={this._goToSboxSearch}
                          />
        </View>
      );
  }
}

// <View style={{ flex: 1, backgroundColor:'rgba(0,0,0,0)'}}>
//
// </View>
// <SboxHomeBanner banner={this.state.banner}/>
//
//
//
//
