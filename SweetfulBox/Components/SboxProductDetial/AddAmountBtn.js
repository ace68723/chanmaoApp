/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import SboxProductAction from '../../Actions/SboxProductAction';
import Label from '../../../App/Constants/AppLabel';
export default class AddAmountBtn extends Component {
  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("addQuantity",nextProps.selectedProduct.sku_quantity,this.props.selectedProduct.sku_quantity)
  //   if(nextProps.selectedProduct !== this.props.selectedProduct ||
  //      nextProps.selectedProduct.sku_quantity !== this.props.selectedProduct.sku_quantity ){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
  render() {
    const disabled = this.props.selectedProduct.sku_amount <= 0 || this.props.selectedProduct.sku_status == 1;
    const quantity = disabled ? 0 : this.props.selectedProduct.sku_quantity;
    return (
      <View style={{flexDirection:'row',
                    alignItems:'flex-start',
                    paddingLeft:20,
                    paddingRight:20,
                  }}>
        <Text style={{
                      color:'#848689',
                      fontWeight:'500',
                      fontSize:15,
                      marginTop:25,
                    }}
              allowFontScaling={false}>
          {Label.getSboxLabel('QUANTITY')}
        </Text>
        <View style={{flexDirection:'row',
                      backgroundColor:"#ffffff",
                      marginLeft:18,
                      marginTop:18,
                    }}>
            <TouchableOpacity
                  onPress={SboxProductAction.subQuantity}
                  activeOpacity={0.6}
                  disabled = {disabled}
                  >
              <View style={{
                        width:33,
                        height:33,
                        borderColor:'#efefef',
                        borderWidth:1,
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                      <Text style={{
                                fontSize: 20,
                                fontFamily:'NotoSans-Regular',
                                color:'#ff768b',
                              }}
                            allowFontScaling={false}>
                        -
                      </Text>
              </View>
            </TouchableOpacity>


            <View style={{
                      width:80,
                      height:33,
                      borderColor:'#efefef',
                      borderTopWidth:1,
                      borderBottomWidth:1,
                      alignItems:'center',
                      justifyContent:'center',
                    }}>
                <Text style={{
                          fontSize: 18,
                          fontFamily:'NotoSans-Regular',
                          color:'#ff768b',
                        }}
                      allowFontScaling={false}>
                  {quantity}
                </Text>
            </View>
            <TouchableOpacity
                  onPress={SboxProductAction.addQuantity}
                  activeOpacity={0.6}
                  disabled = {disabled}
                  >
              <View style={{
                        width:33,
                        height:33,
                        borderColor:'#efefef',
                        borderWidth:1,
                        alignItems:'center',
                        justifyContent:'center',
                      }}>
                  <Text style={{
                            fontSize: 20,
                            fontFamily:'NotoSans-Regular',
                            color:'#ff768b',
                          }}
                        allowFontScaling={false}>
                    +
                  </Text>
              </View>

            </TouchableOpacity>

        </View>
      </View>
    );
  }
}
