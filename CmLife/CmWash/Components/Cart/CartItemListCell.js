import React, {Component} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';

export default class CartItemListCell extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{backgroundColor: 'white', height: 40, flexDirection: 'row', flex: 1}}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => this.props.onPressedQuantity(this.props.item.sku_id, -1) }>
            <Image style={styles.quantityButtonImage} source={require('./Image/minus.png')}/>
          </TouchableOpacity>
          <Text style={[styles.text, {marginRight: 12}]}>{this.props.item.amount}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => this.props.onPressedQuantity(this.props.item.sku_id, 1) }>
            <Image style={styles.quantityButtonImage} source={require('./Image/add.png')}/>
          </TouchableOpacity>
        </View>
        <View style={{flex: 2,justifyContent: 'center',}}>
          <Text style={[styles.text, {marginLeft: 20,}]}>{this.props.item.name_zh}</Text>
        </View>
        <View style={{flex: 1,justifyContent: 'center',}}>
          <Text style={[styles.text, {marginLeft: 20, textAlign: 'right'}]}>$ {parseFloat(Math.round(this.props.item.display_price * this.props.item.amount * 100) / 100).toFixed(2)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  quantityButton: {
    marginRight: 12,
  },
  quantityButtonImage: {
    width: 18,
    height: 18,
  },
  text: {
    fontWeight: '600',
    fontSize: 13,
  }
});
