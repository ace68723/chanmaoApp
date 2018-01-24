/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Platform,
  Text,
  StyleSheet,
} from 'react-native';
import _forEach from 'lodash/forEach';

import SboxHomeAction from '../../Actions/SboxHomeAction';
import SboxHomeStore from '../../Stores/SboxHomeStore';

import SboxHomeHeader from './SboxHomeHeader';
import HeaderWithBanner from './HeaderWithBanner';
import SboxProductTab from '../SboxProductTab/';

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
      this._goToSboxProductDetial = this._goToSboxProductDetial.bind(this);
      this._backToHome = this._backToHome.bind(this);
  }

  componentDidMount() {
      SboxHomeStore.addChangeListener(this._onChange);
      SboxHomeAction.getHomeData();
      setTimeout(() => {
        this.props.navigator.showLightBox({
           screen: "SboxHomeAlert", // unique ID registered with Navigation.registerScreen
           passProps: {
             message:`我们的配送范围已添加Markham、Unionville和Richmond Hill的Condo。查看您的住址是否属于送货范围，请点击“填写地址”。`}, // simple serializable object that will pass as props to the lightbox (optional)
           style: {
            //  backgroundBlur: "dark", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
            //  backgroundColor: "#ff000080" // tint color for the background, you can specify alpha here (optional)
           },
           adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
          });
      }, 6000);
  }
  componentWillUnmount(){
      SboxHomeStore.removeChangeListener(this._onChange);
  }
  _goToSboxProductDetial(product) {
    this.props.navigator.push({
      screen: 'SboxProductDetial',
      navigatorStyle: {navBarHidden: true},
      passProps:{pmid: product.pmid,},
    })
  }
  _backToHome() {
    this.props.handleBackToHome();
  }
  setPositionStarted = '';
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
  _onChange() {
      this.setState(SboxHomeStore.getState());
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
                      tmid={theme.tmid}
                      prod_list={theme.prod_list}
                      tabLabel={theme.name+ '|' +theme.icon_active + '|' + theme.icon_deactive}
                      scrollEventBind={this._scrollEventBind}
                      getScrollViewRefs={this._getScrollViewRefs}
                      goToSboxProductDetial={this._goToSboxProductDetial}/>
      )
    }
    return(
      <ScrollableTabView style={{}}
                          tabBarPosition={'bottom'}
                          tabBarBackgroundColor={'#fff'}
                          tabBarActiveTextColor={'#ff7685'}
                          tabBarUnderlineColor={'#ff7685'}
                          tabBarTextStyle={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}
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
          {themeList}
      </ScrollableTabView>
    );
  }
  _renderSingleTabView() {
    if(!this.state.themeList[0]) return;
    const theme = this.state.themeList[0];
    return (
      <SboxProductTab
                  tmid={theme.tmid}
                  prod_list={theme.prod_list}
                  scrollEventBind={this._scrollEventBind}
                  getScrollViewRefs={this._getScrollViewRefs}
                  goToSboxProductDetial={this._goToSboxProductDetial}/>
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
        />
      )
    }
  }
  // {this._renderScrollableTabView()}
  render() {
      return (
        <View style={{ flex: 1}}>
          {this._renderSingleTabView()}
          {this._renderHeaderWithBanner()}
          <SboxHomeHeader scrollY = {this.state.scrollY}
                          backToHome={this._backToHome}/>
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
