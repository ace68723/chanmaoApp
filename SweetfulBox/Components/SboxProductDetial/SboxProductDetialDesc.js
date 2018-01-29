/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
    findIndex,
} from 'lodash';
export default class SboxProductDetialDesc extends Component {
  render() {
    if (this.props.selectedProduct.sku_original_price == this.props.selectedProduct.sku_price) {
      return (
        <View style={{alignItems:'center',}}>
          <Text style={{fontSize:19,
                        fontFamily:'FZZhunYuan-M02S',
                      }}>
              {this.props.productName} | {this.props.selectedProduct.sku_name}
          </Text>
  
  
  
          <View style={{flexDirection:'row',
                        width:150,
                        marginTop:10,}}>
            <Text style={{color:'#ff768b',
                          fontFamily:'FZZhunYuan-M02S',
                          fontSize:15,
                          textAlign: 'center',
                          flex:1,
                          paddingRight:20,
                        }}>
                ${this.props.selectedProduct.sku_price}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={{alignItems:'center',}}>
          <Text style={{fontSize:19,
                        fontFamily:'FZZhunYuan-M02S',
                      }}>
              {this.props.productName} | {this.props.selectedProduct.sku_name}
          </Text>
          <View style={{flexDirection:'row',
                        width:150,
                        marginTop:10,}}>
            <Text style={{color:'#ff768b',
                          fontFamily:'FZZhunYuan-M02S',
                          fontSize:15,
                          textAlign: 'center',
                          flex:1,
                          paddingRight:20,
                        }}>
                $ {this.props.selectedProduct.sku_price} <Text style = {{textDecorationLine: 'line-through',color:'grey'}}>( {this.props.selectedProduct.sku_original_price} )</Text>
            </Text>
          </View>
        </View>
      );
    }

  }
}
// <Text style={{color:'#848689',
//               fontFamily:'FZZhunYuan-M02S',
//               fontSize:15,
//               marginTop:10,
//             }}>
//     {attr.value_desc}
// </Text>
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
