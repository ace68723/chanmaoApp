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
  _renderRelated() {
    let relatedItems = [];
    for (var index = 0; index < this.props.product.related.length; index++) {
      const relatedItem = this.props.product.related[index];
      relatedItems.push(
        <TouchableWithoutFeedback key={index}
                          onPress={this.props.goToSboxProductDetial.bind(null,relatedItem)}>
          <Image
                 source={{uri:relatedItem.image}}
                 style={{ width: width * 0.1997,
                          height: width * 0.1997 * 1.4032,
                          marginLeft: width * 0.0306
                         }}
          />
        </TouchableWithoutFeedback>
      )
    }
    return(
      <ScrollView horizontal
                  showsHorizontalScrollIndicator = {false}
            style={{ marginLeft: width * 0.0596, marginRight: width * 0.0596, }}>
          {relatedItems}
      </ScrollView>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.goToSboxProductDetial.bind(null,this.props.product)}>
          <Image source={{uri:this.props.product.banner}}
                 style={{width:width*0.8808,
                         alignSelf:'center',
                         height:width*0.8808/1.8127}}
          />
        </TouchableWithoutFeedback>
        {this._renderRelated()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: width * 0.1997 * 1.4032 + width * 0.8808 / 1.8127 + 10,
    },
});
