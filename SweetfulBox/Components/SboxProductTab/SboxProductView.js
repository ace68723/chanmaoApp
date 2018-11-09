/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { cme_getLanguage } from '../../../App/Modules/Database';
const { width,height } = Dimensions.get('window');
import Settings from '../../Config/Setting';

export default class SboxProductView extends Component {
  _renderProductPic(){
    let language = cme_getLanguage();
    if (this.props.product.spu_status === 0 || this.props.product.sku_status === 0) {
      return(
        <Image source={{uri:this.props.product.image}}
               style={{width: (width / 3) - 35,
                        height:((width / 3) - 35) * 1.4,
                       alignSelf:'center'}}
        />
      )
    }else {
      let soldoutPic = language === 'chinese_simple' ? require('./Image/soldout.png') : require('./Image/soldout_eng.png');
      return(
        <View>
          <Image source={{uri:this.props.product.image}}
                 style={{width: (width / 3) - 35,
                          height:((width / 3) - 35) * 1.4,
                         alignSelf:'center'}}
          />
          <Image source={soldoutPic}
                 style={{width: (width / 3) - 35,
                          height:((width / 3) - 35) * 1.4,
                         alignSelf:'center',
                         position: 'absolute'}}
          />
        </View>
      )
    }
  }
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
                                alignSelf:"center"}}
                        allowFontScaling={false}>
                                ${this.props.product.sku_price}
                  </Text>
                  <Text style={{marginTop:6,
                                fontSize:9,
                                fontWeight:"700",
                                color:"black",
                                textDecorationLine: 'line-through',
                                alignSelf:"center"}}
                        allowFontScaling={false}>
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
                                alignSelf:"center"}}
                allowFontScaling={false}>
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
                    alignSelf:"center"}}
            allowFontScaling={false}>
                    ${this.props.product.spu_price}
      </Text>
    );
  }
  render() {
      return (

            <View style={styles.productContainer}>
            {this._renderProductPic()}
              <Text style={{marginTop:6,
                            fontSize:12,
                            fontWeight:"700",
                            color:"#6d6e71",
                            alignSelf:"center",
                            height: 26}}
                    numberOfLines={2}
                    allowFontScaling={false}>
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
      // marginBottom: Settings.getY(72)
      marginBottom: 21.75,
    }
});
