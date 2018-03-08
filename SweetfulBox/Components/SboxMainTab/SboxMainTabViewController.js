/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SboxHome from '../SboxHome/SboxHome';
import SboxProductAction from '../../Actions/SboxProductAction'
import SboxHistory from '../SboxHistory/SboxHistoryViewController';
import SboxCart from '../SboxCart';
import About from '../SboxAbout/index'
import TabBar from './TabBar';
export default class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      initialPage:0
    }
  }
  componentDidMount() {
    if(this.props.checkoutStatus === 'successful') {
      this.setState({
        initialPage:2,
      });
      this.props.navigator.push({
        screen: 'SboxHistory',
        navigatorStyle: {navBarHidden: true},
      });
      this.props.navigator.showModal({
        screen: 'SboxNotification',
        passProps: {checkoutSuccessful: true},
        navigatorStyle: {navBarHidden: true},
      });
    }else {
      setTimeout(() => {
        this.props.navigator.showModal({
           screen: "SboxHomeAlert",
           passProps: {
             message:`我们的配送范围已扩大至图中红框区域，包括所有Condo或House均可送达~具体地址可在填写订单时确认。`
           },
           animated: false,
           navigatorStyle: {navBarHidden: true},
          });
      }, 6000);
    }
  }
  render() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor={'#fff'}
        tabBarActiveTextColor={'#ff7685'}
        tabBarUnderlineColor={'#ff7685'}
        tabBarUnderlineStyle={{'backgroundColor':'#ff7685'}}
        tabBarTextStyle={{fontSize:12,fontFamily:'FZZhunYuan-M02S',}}
        tabBarInactiveTextColor={'#666666'}
        prerenderingSiblingsNumber={3}
        tabBarPosition = "bottom"
        initialPage={this.state.initialPage}
        style={{flex:1}}
        renderTabBar={() => <TabBar />}
      >
        <SboxHome tabLabel="首页"
              activeIconImage={require("./Image/home.png")}
              inactiveIconImage={require("./Image/homegrey.png")}
              navigator={this.props.navigator}
              handleBackToHome={this.props.handleBackToHome}/>
        <SboxCart
              tabLabel="购物车"
              activeIconImage={require("./Image/box.png")}
              inactiveIconImage={require("./Image/boxgrey.png")}
              navigator={this.props.navigator}
              tag={'fromMainTab'}
              />
            <About tabLabel="我的"
          activeIconImage={require("./Image/setting.png")}
          inactiveIconImage={require("./Image/settinggrey.png")}
          navigator={this.props.navigator}
          handleBackToHome={this.props.handleBackToHome}/>
      </ScrollableTabView>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
