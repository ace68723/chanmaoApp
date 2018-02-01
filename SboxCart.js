/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SBOX_REALM_PATH } from '../../Config/API'

const Realm = require('realm');
const realm = new Realm({path: SBOX_REALM_PATH});


const {height, width} = Dimensions.get('window');
export default class SboxCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _allBoxes: realm.objects('sbox_box'),
    }
  }

  _renderBoxes(){
    let _boxes = [];
    for (var i = 0; i < this.state._allBoxes.length; i++) {
      const box = this.state._allBoxes[i];
      const productList = box.product;
      const key = 'cart'+i;
      _boxes.push(
        <View key={key} style={{}}>
          <View style={{backgroundColor:'#aa623f',
                        width:width,
                        height:30,
                        marginTop:20,
                        justifyContent:'center'
                      }}>
            <Text style={{color:'white',
                          marginLeft:10,
                          fontFamily:'FZZhunYuan-M02S',
                          }}>
              购物箱 NO.{box.boxId}
            </Text>
          </View>
          {this._renderBoxItem(productList)}
        </View>
      )
    }
    return _boxes;
  }
  _renderBoxItem(productList){
    let _productList = []
    for (var i = 0; i < productList.length; i++) {
      const product = productList[i]
      console.log(product)
      const key = 'cartItem'+i;
      _productList.push(
        <View key={key}
              style={{height:80}}
              >
          <Text>
            {product.fullname}
          </Text>
          <Text>
            ${product.price}
          </Text>
        </View>
      )
    }
    return _productList;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
          {this._renderBoxes()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
});
