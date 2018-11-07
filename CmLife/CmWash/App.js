/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Common from './src/Constants/Common'

import Home from './src/Components/Home/Home';
import Orders from './src/Components/Orders/Orders';
import Settings from './src/Components/Settings/Settings';
import Checkout from './src/Components/Checkout/Checkout';


import CmWashingHomeAlert from './src/Components/HomeAlert/CmWashingHomeAlert';
Navigation.registerComponent('checkout', () => Checkout);
Navigation.registerComponent('home', () => Home);
Navigation.registerComponent('orders', () => Orders);
Navigation.registerComponent('settings', () => Settings);

Navigation.registerComponent('CmWashingHomeAlert', () => CmWashingHomeAlert);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: '主页',
      screen: 'home',
      icon: require('./Image/home.png'),
      title: '主页'
    }, {
      label: '订单',
      screen: 'orders',
      icon: require('./Image/orders.png'),
      title: '订单'
    }, {
      label: '设置',
      screen: 'settings',
      icon: require('./Image/settings.png'),
      title: '设置'
    }
  ],
  tabsStyle: {
    tabBarSelectedButtonColor: Common.MAIN_COLOR,
    initialTabIndex: 0,
  }
});
