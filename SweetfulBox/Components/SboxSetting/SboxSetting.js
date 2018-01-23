/* @flow */

import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Content from './Content';
export default class SboxSetting extends Component {
  constructor() {
    super();
    this.state = {
      settingButtonList: [
        {
          name: '客服',
          navitype: 2,
          naviparam: 'SboxService',
          image: require('./Images/客服.png'),
        }, {
          name: '地址',
          navitype: 2,
          naviparam: '',
          image: require('./Images/地址.png'),
        }, {
          name: '招聘',
          navitype: 3,
          naviparam: {
            url: '',
          },
          image: require('./Images/招聘.png'),
        }, {
          name: '关于',
          navitype: 2,
          naviparam: '',
          image: require('./Images/关于我们.png'),
        }, {
          name: '账户',
          navitype: 2,
          naviparam: '',
          image: require('./Images/账户安全.png'),
        }, {
          name: '退出',
          navitype: 2,
          naviparam: '',
          image: require('./Images/退出登录.png'),
        },

      ],
    };
    this._handleOnPress = this._handleOnPress.bind(this);
  }
  _handleOnPress(data) {

    if (data.navitype === 2) {
      this.props.navigator.push({
         id: data.naviparam,
       })
    }
  }
  render() {
    return (
      <View style={{ flex: 1,backgroundColor:'#ffffff', }}>
        <Content
            handleOnPress={this._handleOnPress}
            settingButtonList={this.state.settingButtonList}
        />
      </View>
    );
  }
}
