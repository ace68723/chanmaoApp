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

export default class MyComponent extends Component {
  render() {
    return (
      <ScrollableTabView style={{}}
                          tabBarPosition={'bottom'}
                          tabBarBackgroundColor={'#fff'}
                          tabBarActiveTextColor={'#ff7685'}
                          tabBarUnderlineColor={'#ff7685'}
                          tabBarUnderlineStyle={{'backgroundColor':'#ff7685'}}
                          tabBarTextStyle={{fontSize:15,fontFamily:'FZZhunYuan-M02S',}}
                          tabBarInactiveTextColor={'#666666'}
                          initialPage={0}
                          prerenderingSiblingsNumber={2}>
            <SboxHome tabLabel="首页"
              {...{navigator:this.props.navigator,handleBackToHome:this.props.handleBackToHome}}
            />
            <SboxHistory tabLabel="订单"
              {...{navigator:this.props.navigator}}
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
