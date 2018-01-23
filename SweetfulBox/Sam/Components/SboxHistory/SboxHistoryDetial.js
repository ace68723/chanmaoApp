/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './header';
import Content from './content';


import SboxHistoryAction from '../../Actions/SboxHistoryAction';
import SboxHistoryStore from '../../Stores/SboxHistoryStore';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default class SboxHistoryDetial extends Component {
  constructor(props) {
      super(props);
      this.state = {addr:{},boxes:[{prod:[]}]};
      this._onChange = this._onChange.bind(this);
   }
  componentDidMount() {
    SboxHistoryAction.getOrderHistory();
    SboxHistoryStore.addChangeListener(this._onChange);
  }
  _onChange() {
    this.setState(SboxHistoryStore.getState().orderHistory[0]);

  }
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Content orderHistory={this.state}/>
      </View>
    );
  }
}
