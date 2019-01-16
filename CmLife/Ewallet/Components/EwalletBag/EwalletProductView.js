/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
const { width,height } = Dimensions.get('window');
import Settings from '../../Config/Setting';

export default class EwalletProductView extends Component {
  constructor(props)
  {
    super(props);
  }
  _renderProductPic(){
      return(
        <Image source={{uri:this.props.product.image_url}}
               style={{width: (width / 2) - 35,
                        height:((width / 2) - 35) /1.5,
                       alignSelf:'center'}}
        />
      )
  }
  _renderPriceText(){
        return (
          <Text style={{marginTop:6,
                                fontSize:12,
                                fontWeight:"700",
                                color:"#ff768b",
                                alignSelf:"center"}}
                allowFontScaling={false}>
                                ${this.props.product.min_price} - {this.props.product.max_price}
                  </Text>
        )
      }
  render() {
      return (

            <View style={styles.productContainer} >
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
            </View>

      );
  }
}

const styles = StyleSheet.create({
    productContainer: {
      width:width / 2,
      paddingHorizontal:5,
      // marginBottom: Settings.getY(72)
      marginBottom: 21.75,
    }
});
