/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import {
    findIndex,
} from 'lodash';
const {height, width} = Dimensions.get('window');
export default class SboxProductDetialAttr extends Component {
  renderAttrValue(attr, attrIndex) {

      const selectedIndex = findIndex(this.props.selectAttr, { value_id: attr.attr_name });
      const selected = this.props.selectAttr[selectedIndex].selected;
      const attrValues = attr.attr_value.map((attrValue, attrValueIndex)=>{
        const disable = findIndex(this.props.disable_attr, {sku_id: attrValue.sku_id});
        if(disable !== -1) {
          return (
            <View key={attrValueIndex}
                style={{
                          backgroundColor:"#efefef",
                          marginLeft:18,
                          marginTop:18,
                          borderColor: '#efefef',
                          borderWidth: 1,
                          padding:10,
                          paddingTop:5,
                          paddingBottom:5,
                        }}>
              <Text style={{ fontSize: 14, fontFamily:'FZZhunYuan-M02S', }}>
                {attrValue.value_desc}
              </Text>
            </View>
          )
        }
        const disable_attr = attrValue.disable_attr;
        let borderColor;
          if (selected == attrValueIndex ){
              borderColor = '#ff768b';
          } else {
              borderColor = '#efefef';
          }
        return (
          <TouchableWithoutFeedback key={attrValueIndex}
                                    onPress={this.props.changeSelectAttr.bind(null,{attrIndex,attrValueIndex,disable_attr})}
                                    >
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
            <Text style={{ fontSize: 14, fontFamily:'FZZhunYuan-M02S', }}>
              {attrValue.value_desc}
            </Text>
          </View>
          </TouchableWithoutFeedback>
        )
      });
      return(
      <View style={{flexDirection:'row',
                    alignItems:'flex-start',
                    paddingLeft:20,
                    paddingRight:20,
                  }}
                  key={attrIndex}>
        <Text style={{
                      color:'#848689',
                      fontWeight:'500',
                      fontSize:15,
                      marginTop:25,
                    }}>
          {attr.attr_desc}
        </Text>
        <View style={{flexDirection:'row',
                      alignItems:'center',
                      flexWrap:'wrap',
                    }}>
                    {attrValues}
        </View>
      </View>
    )
  }
  render() {
    const attrValues = this.props.attr.map((attr, attrIndex)=>{
      return(this.renderAttrValue(attr, attrIndex))
    })
    return (
      <View style={{marginTop:0}}>
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
