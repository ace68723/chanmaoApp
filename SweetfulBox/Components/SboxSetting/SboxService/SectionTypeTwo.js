/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  title: {
    marginLeft: width * (93 / 1242),
    // paddingTop: height * (52 / 2208),
    // paddingBottom: height * (68 / 2208),
    fontWeight: 'bold',
  },
});
import Option from './Option';
export default class MyComponent extends Component {
  constructor() {
    super();
  }
  _renderOption() {
    let optionList = [];
    for (var i = 0; i < this.props.sectionParam.optionList.length; i++) {
      const option = this.props.sectionParam.optionList[i];
      optionList.push(<Option option={option} key={'option' + i}/>)
    }
    return optionList
  }
  render() {
    return (
      <View style={{
          paddingTop: height * (52 / 2208),
          paddingBottom: height * (68 / 2208),
          borderBottomWidth: 1,
          borderColor: '#DCDCDC',}}>
        <Text style={styles.title}
              allowFontScaling={false}>
              {this.props.sectionParam.title}
        </Text>
        {this._renderOption()}
      </View>
    );
  }
}
