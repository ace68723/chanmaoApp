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
              <Image source={{uri:this.props.product.image}}
                     style={{width:width/5,
                             height:0.15*height,
                             alignSelf:'center',
                            marginBottom:7}}
              />
              <Text style={{fontSize:14,alignSelf:'center',fontFamily:'FZZhunYuan-M02S',color:'#6d6e71',marginBottom:7}}>{this.props.product.name}</Text>
              <Text style={{fontSize:13,alignSelf:'center',fontFamily:'FZZhunYuan-M02S',color:'#ff768b'}}>$ {this.props.product.retail_price}</Text>
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
      height: '100%',
      marginHorizontal:10
    }
});
