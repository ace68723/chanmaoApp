/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    flex: 1 - (212 / 2208),
  },
  orderDetails: {
    height: height * (105 / 2208),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: width * (84 / 1242),
  },
  orderFont: {
    fontSize: (36 / 0.75) / 2208 * height,
  },
  item: {
    height: height * (295 / 2208),
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    alignItems: 'center',
    marginHorizontal: width * (38 / 1242),
  },
  itemImage: {
    marginLeft: width * (54 / 1242),
    marginRight: width * (118 / 1242),
  },
  image: {
    height: height * (242 / 2208),
    width: width * (100 / 1242),
    resizeMode: 'contain',
  },
  itemName: {
    paddingBottom: height * (68 / 2208),
    fontSize: (38 / 0.75) / 2208 * height,
  },
  itemPrice: {
    fontSize: (38 / 0.75) / 2208 * height,
  },
  userInfo: {
    height: height * (415 / 2208),
    paddingVertical: height * (60 / 2208),
    marginHorizontal: width * (38 / 1242),
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
  },
  info: {
    flexDirection: 'row',
    marginRight: width * (300 / 1242),
  },
  userImage: {
    height: height * (60 / 2208),
    width: width * (60 / 1242),
    marginLeft: width * (86 / 1242),
    marginRight: width * (66 / 1242),
    marginBottom: height * (34 / 2208),
    resizeMode: 'contain',
  },
  userText: {
    fontSize: (40 / 0.75) / 2208 * height,
  },
  extraFee: {
    height: height * (145 / 2208),
    marginHorizontal: width * (38 / 1242),
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraFeeText: {
    marginLeft: width * (86 / 1242),
    width: width * (622 / 1242),
    fontSize: (40 / 0.75) / 2208 * height,
  },
  total: {
    paddingLeft: width * (124 / 1242),
    paddingTop: height * (74 / 2208),
    },
  totalText: {
    color: '#EC7381',
    fontSize: (50 / 0.75) / 2208 * height,
  },
});

export default class SboxHistoryOrderDetailOrderView extends Component {
  constructor(props) {
    super(props);
  }

  _renderOrderList() {
    let orderList = [];
    if (!this.props.orderDetail.boxes){
      return orderList;
    }
    for (var i = 0; i < this.props.orderDetail.boxes[0].prod.length; i++) {
      const order = this.props.orderDetail.boxes[0].prod[i];
      const image = order.image;
      const name = order.fullname;
      const amount = order.amount;
      const price = order.price;
      orderList.push(
        <View
        key={['order', i]}
        style={styles.item}
        >
          <View style={styles.itemImage}>
            <Image style={styles.image} source={{uri:image}}/>
          </View>
          <View>
            <Text style={styles.itemName}>{name} x {amount}</Text>
            <Text style={styles.itemPrice}>${price}</Text>
          </View>
        </View>
      );
    }
    return orderList;
  }

_renderUserInfo() {
  if (!this.props.orderDetail.addr){
    return;
  }
  return (
    <View
    key={'userInfo'}
    style={styles.userInfo}
    >
      <View style={styles.info}>
        <Image style={styles.userImage} source={require('./img/name.png')}/>
        <Text style={styles.userText}>{this.props.orderDetail.addr.name}</Text>
      </View>
      <View style={styles.info}>
        <Image style={styles.userImage} source={require('./img/phoneNum.png')}/>
        <Text style={styles.userText}>{this.props.orderDetail.addr.tel}</Text>
      </View>
      <View style={styles.info}>
        <Image style={styles.userImage} source={require('./img/address.png')}/>
        <Text style={styles.userText}>{this.props.orderDetail.addr.addr}</Text>
      </View>
    </View>
  );
}

  render() {
    return (
      <ScrollView >
        <View style={styles.content}>
          <View style={styles.orderDetails}>
            <Text style={styles.orderFont}>订单号：#{this.props.orderDetail.obid}</Text>
            <Text style={styles.orderFont}>{}</Text>
          </View>

          {this._renderOrderList()}
          {this._renderUserInfo()}

          <View style={styles.extraFee}>
            <Text style={styles.extraFeeText}>运费: ${this.props.orderDetail.delifee}</Text>
            <Text style={styles.extraFeeText} >税: ${this.props.orderDetail.tax}</Text>
          </View>

          <View style={styles.total}>
            <Text style={styles.totalText}>总价: ${this.props.orderDetail.total}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
