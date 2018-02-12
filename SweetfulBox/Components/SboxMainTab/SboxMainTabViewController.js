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
    }
  }
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
        initialPage={this.state.initialPage}
        style={{flex:1, }}
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
              inactiveIconImage={require("./Image/box.png")}
              navigator={this.props.navigator}/>
        <About tabLabel="设置"
          activeIconImage={require("./Image/setting.png")}
          inactiveIconImage={require("./Image/settingb.png")}
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
