/* @flow */

import React, { Component } from 'react';
import { View, Text, Image,StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: (212 / 2208),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DCDCDC',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
    },
    backIcon: {
        fontSize: 20,
        paddingLeft: width * (60 / 1242),
    },
    headTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    right: {
        flex: 1,
    },
});

export default class SboxHistoryOrderDetailHeader extends Component {
  render() {
      return (
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={this.props.goBack}>
              <View style={{flex:0.17, top:10,justifyContent:'center'}}>
                <Image source={require('./img/icon_back.png')}
                       style={{
                               marginLeft:10,
                               height:height*0.032,
                               width:height*0.032,}}/>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.headTitle}>订单详情</Text>
            <View style={styles.right}/>
          </View>
      );
  }
}