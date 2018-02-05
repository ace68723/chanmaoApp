/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
const { width,height } = Dimensions.get('window');
import Settings from '../../Config/Setting';

export default class SboxProductView extends Component {
  _renderPriceText(){
    if (this.props.product.type == 'sku'){
      if (this.props.product.sku_original_price != this.props.product.sku_price){
        return(
                <View style={{flex: 1, flexDirection: 'row', alignSelf:"center"}}>
                  <Text style={{marginTop:6,
                                fontSize:12,
                                fontWeight:"700",
                                color:"#ff768b",
                                marginRight: 2,
                                alignSelf:"center"}}>
                                ${this.props.product.sku_price}
                  </Text>
                  <Text style={{marginTop:6,
                                fontSize:9,
                                fontWeight:"700",
                                color:"black",
                                textDecorationLine: 'line-through',
                                alignSelf:"center"}}>
                                $({this.props.product.sku_original_price})
                  </Text>
                </View>
              );
      }
      else{
        return (
          <Text style={{marginTop:6,
                                fontSize:12,
                                fontWeight:"700",
                                color:"#ff768b",
                                alignSelf:"center"}}>
                                ${this.props.product.sku_price}
                  </Text>
        )
      }
    }
    return (
      <Text style={{marginTop:6,
                    fontSize:12,
                    fontWeight:"700",
                    color:"#ff768b",
                    alignSelf:"center"}}>
                    ${this.props.product.spu_price}
      </Text>
    );
  }
  render() {
      return (

            <View style={styles.productContainer}>
              <Image source={{uri:this.props.product.image}}
                     style={{width:Settings.getX(300),
                              height:Settings.getY(426),
                             alignSelf:'center'}}
              />
              <Text style={{marginTop:6,
                            fontSize:12,
                            fontWeight:"700",
                            color:"#6d6e71",
                            alignSelf:"center"}}
                            numberOfLines={2}>
                            {this.props.product.name}
              </Text>
              {this._renderPriceText()}
            </View>

      );
  }
}

const styles = StyleSheet.create({
    productContainer: {
      width:width / 3,
      paddingHorizontal:5,
      marginBottom: Settings.getY(72)
    }
});
