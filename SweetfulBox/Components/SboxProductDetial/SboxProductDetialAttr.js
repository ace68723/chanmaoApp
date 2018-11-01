/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


import SboxProductAction from '../../Actions/SboxProductAction';

const {height, width} = Dimensions.get('window');
export default class SboxProductDetialAttr extends Component {




  renderAttrValue(sku, skuIndex) {
            let borderColor;
            if (this.props.selectedProduct.sku_id == sku.sku_id ){
                borderColor = '#ff768b';
            } else {
                borderColor = '#efefef';
            }
            return (
              <TouchableOpacity key={skuIndex}
                                onPress={SboxProductAction.changeSelectAttr.bind(null,sku)}>
                <View
                        style={{
                                  backgroundColor:"#ffffff",
                                  marginLeft:18,
                                  marginTop:18,
                                  borderColor: borderColor,
                                  borderWidth: 1,
                                  padding:10,
                                  paddingTop:5,
                                  paddingBottom:5,
                                }}>
                      <Text style={{ fontSize: 14, fontFamily:'NotoSansCJKsc-Regular', }}
                            allowFontScaling={false}>
                        {sku.sku_name}
                      </Text>
                </View>
                </TouchableOpacity>
            )
  }
  render() {
    const attrValues = this.props.sku_list.map((sku, skuIndex)=>{
      return(this.renderAttrValue(sku, skuIndex))
    })
    return (
      <View style={{flexDirection:'row',
      alignItems:'flex-start',
      paddingLeft:20,
      paddingRight:20,
      marginTop:0,
      flexWrap: 'wrap'
    }}>
    <Text style={{
                      color:'#848689',
                      fontWeight:'500',
                      fontSize:15,
                      marginTop:25,
                    }}
          allowFontScaling={false}>
          口味
        </Text>
        {attrValues}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
