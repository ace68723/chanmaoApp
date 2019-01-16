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
      return (
        <View style={{alignItems:'center',}}>
          <Text style={{fontSize:19,
                      }}
                allowFontScaling={false}>
              {this.props.productName} 
          </Text>



          <View style={{flexDirection:'row',
                        width:150,
                        marginTop:10,}}>
            <Text style={{color:'#ff768b',
                          fontSize:15,
                          textAlign: 'center',
                          flex:1,
                          paddingRight:20,
                        }}
                  allowFontScaling={false}>
                 $ {this.props.selectedProduct.min_price} - {this.props.selectedProduct.max_price}
            </Text>
          </View>
        </View>
      );

  }
}
// <Text style={{color:'#848689',
//               
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
