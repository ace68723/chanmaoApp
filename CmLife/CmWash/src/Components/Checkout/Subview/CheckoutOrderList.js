import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

export default class CheckoutOrderList extends Component{
  constructor(props) {
    super(props);
  }
  renderCell(item){
    return (
      <View style={{height: 30, flexDirection: 'row', flex: 1}}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center',alignItems: 'center'}}>
          <Text style={[styles.text, styles.quantityText]}>{item.amount}</Text>
        </View>
        <View style={{flex: 8,justifyContent: 'center', marginLeft: -4}}>
          <Text style={[styles.text, {marginLeft: 20,}]}>{item.name_zh}</Text>
        </View>
        <View style={{flex: 3,justifyContent: 'flex-end', flexDirection: 'row', alignItems:'center'}}>
          <Text style={[styles.text, {marginLeft: 10, textAlign: 'right'}]}>$ {item.display_price}</Text>
        </View>
      </View>
    )
  }

  renderItemList(){
    let cells = []
    for (i of this.props.productList){
      cells.push(this.renderCell(i));
    }
    return cells;
  }

  render() {
    const listHeight = 30 * this.props.productList.length;
    return (
      <View style={{height: listHeight, marginBottom: 8}}>
        {this.renderItemList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 13,
  },
  quantityText: {
    width: 18,
    height: 18,
    backgroundColor: 'grey',
    textAlign: 'center',
    color: 'white',
  }
});
