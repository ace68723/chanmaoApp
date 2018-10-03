/* @flow */

import React, { Component } from 'react';
import { View, Text, Image,StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native';

const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const navigationHeight = viewHeight * (212/2208) - 12;
import Label from '../../../App/Constants/AppLabel';
const styles = StyleSheet.create({
    container: {
        height: navigationHeight,
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
            <View style={{flex:1, justifyContent:'center'}}>
              <TouchableWithoutFeedback onPress={this.props.goBack}>
                <Image source={require('./img/icon_back.png')}
                       style={{
                               marginLeft:10,
                               height:height*0.032,
                               width:height*0.032,}}/>
               </TouchableWithoutFeedback>
            </View>
            <Text style={styles.headTitle}
                  allowFontScaling={false}>{Label.getSboxLabel('ORDER_DETAIL')}</Text>
            <View style={styles.right}/>
          </View>
      );
  }
}
