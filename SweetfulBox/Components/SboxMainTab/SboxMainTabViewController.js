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
import SboxCheckout from '../SboxCheckout';
import About from '../SboxAbout/index'
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
        prerenderingSiblingsNumber={3}
        tabBarPosition = "bottom"
        initialPage={0}
        style={{flex:1, }}
        renderTabBar={() => <TabBar />}
      >
        <SboxHome tabLabel="首页"
              activeIconImage={require("./Image/home.png")}
              inactiveIconImage={require("./Image/homegrey.png")}
              navigator={this.props.navigator}
              />
        <SboxCheckout
              tabLabel="购物车"
              activeIconImage={require("./Image/box.png")}
              inactiveIconImage={require("./Image/box.png")}
              navigator={this.props.navigator}/>
        <About tabLabel="订单"
              activeIconImage={require("./Image/setting.png")}
              inactiveIconImage={require("./Image/settingb.png")}
              navigator={this.props.navigator}
              />
      </ScrollableTabView>

  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
