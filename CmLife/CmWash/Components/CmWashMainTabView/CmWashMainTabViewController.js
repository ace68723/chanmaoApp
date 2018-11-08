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
  }
  render() {
    return (
      <ScrollableTabView
        tabBarBackgroundColor={'#fff'}
        tabBarActiveTextColor={'#ff7685'}
        tabBarUnderlineColor={'#ff7685'}
        tabBarUnderlineStyle={{'backgroundColor':'#ff7685'}}
        tabBarTextStyle={{fontSize:12,fontFamily:'NotoSansCJKsc-Regular',}}
        tabBarInactiveTextColor={'#666666'}
        prerenderingSiblingsNumber={3}
        tabBarPosition = "bottom"
        initialPage={this.state.initialPage}
        style={{flex:1}}

      >
        <Home tabLabel='主页'
              activeIconImage={require("./Image/home.png")}
              inactiveIconImage={require("./Image/homegrey.png")}
              navigator={this.props.navigator}
              />
        <Orders
              tabLabel='订单'
              activeIconImage={require("./Image/box.png")}
              inactiveIconImage={require("./Image/boxgrey.png")}
              navigator={this.props.navigator}

              />
              <Settings tabLabel='设置'
                    navigator={this.props.navigator}
                    inactiveIconImage={require("./Image/settinggrey.png")}

                    activeIconImage={require("./Image/setting.png")}
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
