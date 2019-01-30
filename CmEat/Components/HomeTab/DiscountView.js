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

export default class DiscountView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0,
    }
    this._renderItem = this._renderItem.bind(this);
    this._renderTypeLabel = this._renderTypeLabel.bind(this);
    this._onPressedTypeLabel = this._onPressedTypeLabel.bind(this);
  }

  _onPressedTypeLabel(index){
    this.setState({selectedIndex: index});
  }
  _renderTypeLabel({index, item}){
    return (
      <View style={{marginRight: 10}}>
        <DiscountTypeLabel
          selected={index == this.state.selectedIndex}
          labelName={item}
          index={index}
          onPressed={this._onPressedTypeLabel}/>
      </View>
    )
  }
  _renderItem({item}){
    return (
      <View style={{marginRight: 18}}>
        <DiscountItem data={item} onPressedCell={this.props.onPressedCell}/>
      </View>)
  }
  render() {
    const discountTypes = this.props.discountData.map(value => value.theme_name);
    const discountItems = this.props.discountData[this.state.selectedIndex].adlist;

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <FlatList
            horizontal={true}
            data={discountTypes}
            renderItem={this._renderTypeLabel}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginLeft: 16 }}
          />
        </View>

        <View style={{flex: 3}}>
          <FlatList
            refref={c => this._itemlList = c}
            horizontal={true}
            data={discountItems}
            renderItem={this._renderItem}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginLeft: 16 }}
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
