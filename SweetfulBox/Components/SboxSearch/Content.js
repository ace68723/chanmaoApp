/* @flow */

import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: height * (548 / 2208),
    justifyContent: 'center',
    width: width * (390 / 1242),
  },
  box_image: {
    height: height * (400 / 2208),
    resizeMode: 'contain',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    width: width * (300 / 1242),
  },
  content: {
    flex: (1792 / 2208),
    marginHorizontal: width * (146 / 1242),
  },
  flexRow: {
    flexDirection: 'row',
  },
  horizontalSpace: {
    width: width * (170 / 1242),
  },
  prod: {
    height: height * (100 / 2208),
  },
  prodName: {
    fontWeight: 'bold',
    paddingVertical: height * (20 / 2208),
  },
  prodPrice: {
    fontWeight: 'bold',
    color: '#ff9999',
  },
  prodPrice_Num: {
    fontSize: (20 / 0.75) / 2208 * height,
    color: 'white',
  },
  prodPrice_Num_Form: {
    alignItems: 'center',
    height: height * (44 / 2208),
    justifyContent: 'center',
    width: width * (44 / 1242),
    backgroundColor: '#ff4d4d',
  },
  prodPrice_Form: {
    justifyContent: 'space-between',
  },
  verticalSpace: {
    height: height * (52 / 2208),
  },
  combination: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default class Content extends Component {
  constructor(props) {
    super(props);
  }

  _renderProductList() {
    let productList = [];
    let paddingLeft = 0;
    for (var i = 0; i < this.props.productList.length; i++) {
      const product = this.props.productList[i];
      const image = product.productParam.image;
      const name = product.productParam.name;
      const price = product.productParam.price;
      const amount = product.productParam.amount;
      paddingLeft = i % 2 !== 0 ? width * (170 / 1242) : 0;
      productList.push(
        <View key={[product, i]} style={{ paddingLeft: paddingLeft, paddingBottom: height * (52 / 2208) }}>
          <TouchableOpacity
          activeOpacity={0.6}
          style={styles.box}
          >
            <Image style={styles.box_image} source={image}/>
          </TouchableOpacity>
          <View>
            <Text style={styles.prodName}
                  allowFontScaling={false}>{name}</Text>
            <View style={[styles.flexRow, styles.prodPrice_Form]}>
              <Text style={styles.prodPrice}
                    allowFontScaling={false}>{price}</Text>
              <View style={styles.prodPrice_Num_Form}>
                <Text style={styles.prodPrice_Num}
                      allowFontScaling={false}>{amount}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return productList;
  }

  render() {
    return (
      <ScrollView style={styles.content}>
        <View style={styles.combination}>
          {this._renderProductList()}
        </View>
      </ScrollView>
    );
  }
}
