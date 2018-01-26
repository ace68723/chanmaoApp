/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
const { width,height } = Dimensions.get('window');
import Settings from '../../Config/Setting';

export default class SboxProductView extends Component {
  render() {
    console.log(this.props)
      return (
          <TouchableWithoutFeedback  onPress={this.props.goToSboxProductDetial.bind(null,this.props.product)}>
            <View style={styles.productContainer}>
              <Image source={{uri:this.props.product.image}}
                     style={{width:Settings.getX(300),
                              height:Settings.getY(426),
                             alignSelf:'center'}}
              />
              <Text style={{marginTop:6,
                            fontSize:15,
                            fontWeight:"700",
                            color:"#6d6e71",
                            alignSelf:"center"}}
                     numberOfLines={2}>
                            {this.props.product.name}
              </Text>
              <Text style={{marginTop:6,
                            fontSize:12,
                            fontWeight:"700",
                            color:"#ff768b",
                            alignSelf:"center"}}>
                            ${this.props.product.retail_price}
              </Text>
            </View>
          </TouchableWithoutFeedback>

      );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:width,
      height:100,
    },
    productContainer: {
      flex:1,
      marginHorizontal:5
    }
});
