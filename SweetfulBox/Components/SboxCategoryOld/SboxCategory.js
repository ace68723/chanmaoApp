/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Content from './Content';
import SboxProductAction from '../../Actions/SboxProductAction';
import test from './test';




const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class ContentController extends Component {
  constructor() {
    super();
    this.state = test;
    this._handleOnPress = this._handleOnPress.bind(this);

  }
  // componentDidMount() {
  //   SboxProductAction.getCategoryList('232');
  // }
 //  async componentDidMount() {
 //   try {
 //    //  let response = await fetch('https://chanmao.us//storage/test.json');
 //    // //  let responseJson = await response.json();
 //    //
 //    //  return responseJson.movies;
 //    let test = require('./test.js');
 //
 //   } catch(error) {
 //   }
 // }
  // http://chanmao.us/storage/test.json
  _handleOnPress(data) {

    if (data.naviType === 2) {
      this.props.navigator.push({
         id: data.naviParam,
       })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Content
          categoryList={this.state.categoryList}
          searchRecordList={this.state.searchRecordList}
          handleOnPress={this._handleOnPress}
        />
      </View>
    );
  }
}
