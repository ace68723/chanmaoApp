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

    const attr = this.props.attr;
    return (
      <View style={{alignItems:'center',}}>
        <Text style={{fontSize:19,
                      fontFamily:'FZZhunYuan-M02S',
                    }}>
            {this.props.productName}
        </Text>



        <View style={{flexDirection:'row',
                      width:150,
                      marginTop:10,}}>
          <Text style={{color:'#ff768b',
                        fontFamily:'FZZhunYuan-M02S',
                        fontSize:15,
                        textAlign: 'right',
                        flex:0.55,
                        paddingRight:20,
                      }}>
              ${this.props.selectedProduct.price}
          </Text>
          <View style={{flex:0.45,}}>
            <View style={{backgroundColor:"#ff768b",
                         width:16,
                         height:16,
                         alignItems:'center',
                         justifyContent:'center',
                        }}>
                  <Text style={{color:'#ffffff',
                                fontFamily:'FZZhunYuan-M02S',
                                fontSize:13,
                              }}>
                      {this.props.selectedProduct.weights}
                  </Text>
            </View>
          </View>
        </View>
      </View>
    );
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
