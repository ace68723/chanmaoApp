/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Content from './Content';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default class ContentController extends Component {
  constructor() {
    super();
    this.state = {
      productList: [
        {
          productType: 1,
          productParam: {
            image: require('./Images/泡面.png'),
            name: '泡面',
            price: '$4.99',
            amount: '6',
          },
          naviType: '',
          naviParam: '',
        },
        {
          productType: 1,
          productParam: {
            image: require('./Images/泡面.png'),
            name: '泡面',
            price: '$4.99',
            amount: '6',
          },
          naviType: '',
          naviParam: '',
        },
        {
          productType: 1,
          productParam: {
            image: require('./Images/泡面.png'),
            name: '泡面',
            price: '$4.99',
            amount: '6',
          },
          naviType: '',
          naviParam: '',
        },
        {
          productType: 1,
          productParam: {
            image: require('./Images/泡面.png'),
            name: '泡面',
            price: '$4.99',
            amount: '6',
          },
          naviType: '',
          naviParam: '',
        },
        {
          productType: 1,
          productParam: {
            image: require('./Images/泡面.png'),
            name: '泡面',
            price: '$4.99',
            amount: '6',
          },
          naviType: '',
          naviParam: '',
        },
        {
          productType: 1,
          productParam: {
            image: require('./Images/泡面.png'),
            name: '泡面',
            price: '$4.99',
            amount: '6',
          },
          naviType: '',
          naviParam: '',
        },
      ],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Content productList={this.state.productList} />
      </View>
    );
  }
}
