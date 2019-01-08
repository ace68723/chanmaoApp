/* @flow */

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

import DiscountItem from './Discount/DiscountItem'
import DiscountTypeLabel from './Discount/DiscountTypeLabel'

const {height, width} = Dimensions.get('window');
const contentHeight = 120;

export default class DiscountView extends Component {
  constructor(props) {
    super(props)
  }
  _renderTypeLabel(){
    return (
      <View style={{marginRight: 10}}>
        <DiscountTypeLabel selected={false}/>
      </View>
    )
  }
  _renderItem(){
    return (
      <View style={{marginRight: 18}}>
        <DiscountItem/>
      </View>)
  }
  render() {
    const types = ["一元特价", "新进商家", "限时优惠", ];
    const items = [
      {
        'image': 'http://ronntorossian.com/wp-content/uploads/2018/11/kfc-pr-stunt.png',
        'resName': "开封菜",
        'title': "炸鸡一元"
      },
      {
        'image': 'http://ronntorossian.com/wp-content/uploads/2018/11/kfc-pr-stunt.png',
        'resName': "开封菜",
        'title': "炸鸡一元"
      },
      {
        'image': 'http://ronntorossian.com/wp-content/uploads/2018/11/kfc-pr-stunt.png',
        'resName': "开封菜",
        'title': "炸鸡一元"
      }
    ]
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <FlatList
            show
            horizontal={true}
            data={types}
            renderItem={this._renderTypeLabel}
            showsHorizontalScrollIndicator={false}
            contentOffset={{x: -16}}
          />
        </View>

        <View style={{flex: 3}}>
          <FlatList
            horizontal={true}
            data={items}
            renderItem={this._renderItem}
            showsHorizontalScrollIndicator={false}
            contentOffset={{x: -16}}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'column',
	}
});
