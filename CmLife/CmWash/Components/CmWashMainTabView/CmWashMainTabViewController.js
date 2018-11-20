/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Home from '../Home/Home';
import Orders from '../Orders/Orders';
import Settings from '../Settings/Settings';
export default class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      initialPage:0
    }
  }
  componentDidMount() {
    console.log('tabview');
    this.setState({
      initialPage:this.props.fromPage
    })
    if (this.props.fromPage==1) alert('下单成功');
  }
  render() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor={'#fff'}
        tabBarActiveTextColor={'#2ad3be'}
        tabBarUnderlineColor={'rgba(0,0,0,0)'}
        tabBarUnderlineStyle={{'backgroundColor':'rgba(0,0,0,0)'}}
        tabBarTextStyle={{fontSize:12,fontFamily:'NotoSansCJKsc-Regular',}}
        tabBarInactiveTextColor={'#666666'}
        prerenderingSiblingsNumber={3}
        tabBarPosition = "bottom"
        initialPage={this.state.initialPage}
        page={this.state.initialPage}
        style={{flex:1}}
      >
        <Home tabLabel='主页'
          activeIconImage={require("./Image/mainpage_green.png")}
          inactiveIconImage={require("./Image/mainpage_grey.png")}
              navigator={this.props.navigator}
              />
        <Orders
              tabLabel='订单'
              activeIconImage={require("./Image/order_green.png")}
              inactiveIconImage={require("./Image/order_grey.png")}
              navigator={this.props.navigator}

              />
        <Settings tabLabel='设置'
          activeIconImage={require("./Image/setting_green.png")}
          inactiveIconImage={require("./Image/setting_grey.png")}
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
