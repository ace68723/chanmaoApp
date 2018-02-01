/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import SboxUserAction from '../../Actions/SboxUserAction';
import SboxUserStore from '../../Stores/SboxUserStore';

import SboxHistoryList from './SboxHistoryList';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
export default class SboxHistory extends Component {
  constructor() {
      super();
      this.state = {
          orderHistory: [],
      };
      this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
      SboxUserAction.getOrderHistory();
      SboxUserStore.addChangeListener(this._onChange);
  }
  _onChange() {

      this.setState(SboxUserStore.getState());
  }
  render() {
      return (
        <View style={styles.container}>
          <SboxHistoryList orderHistory={this.state.orderHistory}/>
        </View>
      );
  }
}
