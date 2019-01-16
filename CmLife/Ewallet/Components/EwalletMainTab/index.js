/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Home from '../Home';
import About from '../About/AboutContact';
import EwalletBag from '../EwalletBag'
import TabBar from './TabBar';
export default class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      initialPage:0
    }
  }
  componentDidMount() {
  
  }
  goToPage(pageId) {
    this.tabView.goToPage(pageId);
  }
  render() {
    return (
      
      <ScrollableTabView
        tabBarBackgroundColor={'#fff'}
        tabBarActiveTextColor={'#ff7685'}
        tabBarUnderlineColor={'#ff7685'}
        tabBarUnderlineStyle={{'backgroundColor':'#ff7685'}}
        tabBarTextStyle={{fontSize:12}}
        tabBarInactiveTextColor={'#666666'}
        prerenderingSiblingsNumber={3}
        tabBarPosition = "bottom"
        ref={(tabView) => { this.tabView = tabView}}
        initialPage={this.state.initialPage}
        style={{flex:1}}
        renderTabBar={() => <TabBar />}
      >
        <Home tabLabel="商城"
              activeIconImage={require("./Image/icon_商城_red.png")}
              inactiveIconImage={require("./Image/icon_商城_Grey.png")}
              navigator={this.props.navigator}
              goToPage={ () => this.goToPage(1)}
              handleBackToHome={this.props.handleBackToHome}/>
        <EwalletBag
              tabLabel="卡包"
              activeIconImage={require("./Image/icon_卡包_red.png")}
              inactiveIconImage={require("./Image/icon_卡包_Grey.png")}
              navigator={this.props.navigator}
              tag={'fromMainTab'}
              />
            <About tabLabel="设置"
          activeIconImage={require("./Image/icon_设置_red.png")}
          inactiveIconImage={require("./Image/icon_设置_Grey.png")}
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
