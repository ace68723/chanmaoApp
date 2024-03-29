/* @flow */

import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import SboxProductAction from '../../Actions/SboxProductAction';

const { height, width } = Dimensions.get('window');
import Label from '../../../App/Constants/AppLabel';
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
    width: height * (242 / 2208) * 0.72,
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
    paddingBottom: height * (74 / 2208),
    },
  totalText: {
    color: '#EC7381',
    fontSize: (50 / 0.75) / 2208 * height,
  },
});

export default class SboxHistoryOrderDetailOrderView extends Component {
  constructor(props) {
    super(props);
    this._renderProduct = this._renderProduct.bind(this);
    this._handleOnPressIn = this._handleOnPressIn.bind(this);
    this._renderProductImage = this._renderProductImage.bind(this);

    // this._goToSboxProductDetial = this._goToSboxProductDetial.bind(this);
  }
  _handleOnPressIn(item) {
    const {spu_id} = item;
    SboxProductAction.getSingleProduct(spu_id);
  }
  _renderProductImage(product){
    if (product.sku_status === 0) {
      return(
        <Image source={{uri:product.sku_image}}
               style={styles.image}
        />
      )
    }else {
      return(
        <View>
          <Image source={{uri:product.sku_image}}
                 style={styles.image}
          />
        <Image source={require('./img/soldout.png')}
                 style={[styles.image,{position: 'absolute'}]}
          />
        </View>
      )
    }
  }
  _renderOrderList() {
    let orderList = [];
    if (!this.props.orderDetail.prod){
      return orderList;
    }
    for (var i = 0; i < this.props.orderDetail.prod.length; i++) {
      const order = this.props.orderDetail.prod[i];
      const image = order.sku_image;
      const name = order.sku_fullname;
      const amount = order.sku_quantity;
      const price = order.sku_price;
      const spu_id = order.spu_id;
      orderList.push(
        <TouchableWithoutFeedback onPress={() => this.props.goToSboxProductDetial(order)}>
          <View key={['order', i]}
                style={styles.item}>
            <View style={styles.itemImage}>
              {this._renderProductImage(order)}
            </View>
            <View>
              <Text style={styles.itemName}
                    allowFontScaling={false}>{name} x {amount}</Text>
              <Text style={styles.itemPrice}
                    allowFontScaling={false}>${price}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return orderList;
  }

_renderProduct(itemObject) {
  var item = itemObject.item;
  return(
    <TouchableWithoutFeedback
    onPressIn={this._handleOnPressIn.bind(null,item)}
    onPress={() => this.props.goToSboxProductDetial(item)}>
      <View style={styles.item}>
        <View style={styles.itemImage}>
          {this._renderProductImage(item)}
        </View>
        <View>
          <Text style={styles.itemName}
                allowFontScaling={false}>{item.sku_fullname} x {item.sku_quantity}</Text>
          <Text style={styles.itemPrice}
                allowFontScaling={false}>${item.sku_price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
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
        <Text style={styles.userText}
              allowFontScaling={false}>{this.props.orderDetail.addr.name}</Text>
      </View>
      <View style={styles.info}>
        <Image style={styles.userImage} source={require('./img/phoneNum.png')}/>
        <Text style={styles.userText}
              allowFontScaling={false}>{this.props.orderDetail.addr.tel}</Text>
      </View>
      <View style={styles.info}>
        <Image style={styles.userImage} source={require('./img/address.png')}/>
        <Text style={styles.userText}
              allowFontScaling={false}>{this.props.orderDetail.addr.addr}</Text>
      </View>
    </View>
  );
}

  render() {
    return (
      <ScrollView >
        <View style={styles.content}>
          <View style={styles.orderDetails}>
            <Text style={styles.orderFont}
                  allowFontScaling={false}>{Label.getSboxLabel('ORDER_NUMBER')}{this.props.orderDetail.obid}</Text>
            <Text style={styles.orderFont}
                  allowFontScaling={false}>{this.props.orderDetail.created_date}</Text>
          </View>
          <FlatList
            data={this.props.orderDetail.prod}
    				enableEmptySections
    				keyExtractor={(item, index) => item.sku_id.toString()}
    				renderItem={this._renderProduct}>

          </FlatList>
          {this._renderUserInfo()}

          <View style={styles.extraFee}>
            <Text style={styles.extraFeeText}
                  allowFontScaling={false}>Delivery Fee: ${this.props.orderDetail.delifee}</Text>
            <Text style={styles.extraFeeText}
                  allowFontScaling={false}>Tax: ${this.props.orderDetail.tax}</Text>
          </View>

          <View style={styles.total}>
            <Text style={styles.totalText}
                  allowFontScaling={false}>Total: ${this.props.orderDetail.total}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
