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


export default class SboxProductView extends Component {
  render() {
    if(this.props.product.header){
      return (
        <View style={styles.container}>
          <View>
            <Text style={{fontSize:20}}>{this.props.product.name}</Text>
          </View>
        </View>
      );
    }
    else{
      return (

          <TouchableWithoutFeedback  onPress={this.props.goToSboxProductDetial.bind(null,this.props.product)}>
            <View style={styles.productContainer}>
              <Image source={this.props.product.image}
                     style={{width:width/5,
                             height:80,
                             alignSelf:'center'}}
              />
              <Text style={{fontSize:10}}>{this.props.product.name}</Text>
              <Text style={{fontSize:5}}>{this.props.product.price}</Text>
            </View>
          </TouchableWithoutFeedback>

      );
    }

  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:width,
      height:100,
    },
    productContainer: {
      width: width/4,
      height: 120,
      backgroundColor:'green',
      marginHorizontal:10
    }
});
