/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SboxHome from '../SboxHome/SboxHome';
import SboxHistory from '../SboxHistory/SboxHistoryViewController';
import SboxCheckout from '../SboxCheckout/SboxCheckout';
import TabBar from './TabBar';
export default class MyComponent extends Component {
  render() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor={'#fff'}
        tabBarActiveTextColor={'#ff7685'}
        tabBarUnderlineColor={'#ff7685'}
        tabBarUnderlineStyle={{'backgroundColor':'#ff7685'}}
        tabBarTextStyle={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}
        tabBarInactiveTextColor={'#666666'}
        prerenderingSiblingsNumber={2}
        tabBarPosition = "bottom"
        initialPage={0}
        style={{flex:1, }}
        renderTabBar={() => <TabBar />}
      >
        <SboxHome tabLabel="首页"
              activeIconImage={require("./Image/home.png")}
              inactiveIconImage={require("./Image/homegrey.png")}
              navigator={this.props.navigator}/>
        <SboxHistory tabLabel="订单"
              activeIconImage={require("./Image/order.png")}
              inactiveIconImage={require("./Image/ordergrey.png")}
              navigator={this.props.navigator}/>
        <SboxCheckout
              tabLabel="购物车"
              activeIconImage={require("./Image/box.png")}
              inactiveIconImage={require("./Image/box.png")}
              navigator={this.props.navigator}/>
      </ScrollableTabView>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
