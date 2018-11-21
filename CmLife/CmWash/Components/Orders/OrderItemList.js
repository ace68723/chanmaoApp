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
import Common from '../../Constants/Common'

export default class OrderItemList extends Component{
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
        <View style={{flex: 3,justifyContent: 'center',}}>
          <Text style={[styles.text, {marginLeft: 10, textAlign: 'right'}]}>$ {item.price}</Text>
        </View>
      </View>
    )
  }

  renderItemList(){
    let cells = []
    for (i of this.props.item){
      cells.push(this.renderCell(i));
    }
    return cells;
  }

  render() {
    const listHeight = 30 * this.props.item.length;
    return (
      <View style={{height: listHeight}}>
        {this.renderItemList()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '600',
    fontSize: 14,
    fontFamily:'NotoSans-Regular',
  },
  quantityText: {
    width: 18,
    height: 18,
    backgroundColor: 'grey',
    textAlign: 'center',
    color: 'white',
  }
});
