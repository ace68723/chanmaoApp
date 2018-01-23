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

export default class Content extends Component {
  constructor(){
    super();
  }
    componentWillReceiveProps(nextProps){

    }
    _renderAddress(){
      if(this.props.orderHistory.addr.unit){
        return <Text style={styles.userText}>{this.props.orderHistory.addr.unit} - {this.props.orderHistory.addr.addr}</Text>
      }else{
        return <Text style={styles.userText}>{this.props.orderHistory.addr.addr}</Text>
      }
    }
    _renderItem(productList){
      return productList.map((product,key) => {
        return (
          <View style={styles.product} key={key}>
            <View style={styles.itemImage}>
              {/* <Image style={styles.image} source={require('./img/food.png')}/> */}
            </View>
            <View>
              <Text style={styles.itemName}>{product.fullname} x {product.amount}</Text>
              <Text style={styles.itemPrice}>${product.price}</Text>
            </View>
          </View>
        )
      })
    }
    _renderBox(){
      return this.props.orderHistory.boxes.map((box,key) => {
        return(
          <View key={key}>
            <Text>BOX</Text>
            {this._renderItem(box.prod)}
          </View>
        )
      })
    }
    render() {
        return (
            <ScrollView style={styles.content}>
              <View style={styles.orderDetails}>
                <Text style={styles.orderFont}>订单号：#{this.props.orderHistory.obid}</Text>
                <Text style={styles.orderFont}>{this.props.orderHistory.created}</Text>
              </View>
              {this._renderBox()}

              <View style={styles.userInfo}>
                <View style={styles.info}>
                  {/* <Image style={styles.userImage} source={require('./img/name.png')}/> */}
                  <Text style={styles.userText}>{this.props.orderHistory.addr.name}</Text>
                </View>
                <View style={styles.info}>
                  {/* <Image style={styles.userImage} source={require('./img/phoneNum.png')}/> */}
                  <Text style={styles.userText}>{this.props.orderHistory.addr.tel}</Text>
                </View>
                <View style={styles.info}>
                  {/* <Image style={styles.userImage} source={require('./img/address.png')}/> */}
                  {this._renderAddress()}
                </View>
              </View>

              <View style={styles.extraFee}>
                <Text style={styles.extraFeeText}>Delivery Fee: ${this.props.orderHistory.delifee}</Text>
                <Text style={styles.extraFeeText} >Tax: $6.45</Text>
              </View>

              <View style={styles.total}>
                <Text style={styles.totalText}>Total: ${this.props.orderHistory.total}</Text>
              </View>
            </ScrollView>
        );
    }
}
