import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import CartItemListCell from './CartItemListCell'

export default class CartItemList extends Component {

  constructor(props) {
    super(props);
  }
  renderItemCells(){
    let cells = [];
    console.log();
    if (!this.props.items){
      return cells;
    }
    for (i of this.props.items){
      cells.push(
        <CartItemListCell item={i} onPressedQuantity={this.props.onPressedQuantity} />
      );
    }
    return cells;
  }
  render() {
    return (
      <View style={{flex: 1}}>
        {this.renderItemCells()}
      </View>
    )
  }
}
