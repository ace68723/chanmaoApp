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

import {
    findIndex,
} from 'lodash';
const {height, width} = Dimensions.get('window');
export default class SboxProductDetialAttr extends Component {

  renderAttrValue(attr, attrIndex) {
            let borderColor;
            if (this.props.selectAttr.sku_id == attr.sku_id ){
                borderColor = '#ff768b';
            } else {
                borderColor = '#efefef';
            }
            return (
              <TouchableOpacity key={attrIndex} onPress={this.props.changeSelectAttr.bind(null,{attr})}>
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
                        {attr.sku_name}
                      </Text>
                </View>
                </TouchableOpacity>
            )
  }
  render() {
    const attrValues = this.props.attr.map((attr, attrIndex)=>{
      return(this.renderAttrValue(attr, attrIndex))
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
                    }}>
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
