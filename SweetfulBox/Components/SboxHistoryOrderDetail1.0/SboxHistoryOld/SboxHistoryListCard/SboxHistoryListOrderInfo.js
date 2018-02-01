/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

const viewHeight = Dimensions.get('window').height;
const buttonHeight = viewHeight * 0.06;
const priceHeight = viewHeight * 0.07;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 10,
        marginBottom: 7,
        marginTop: 5,
    },
    shadowIOS: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 3,
        shadowOpacity: 0.25,
    },
    shadowAndroid: {
        elevation: 3,
    },
    button: {
        backgroundColor: '#f4f4f4',
        flexDirection: 'row',
    },
});
export default class SboxHistoryListOrderInfo extends Component {
  render() {
      return (
        <View>

          <View style={{ flex: 0.12,
                         flexDirection: 'row',
                         height: priceHeight }}
          >
            <View style={{ flex: 1,
                           justifyContent: 'center' }}
            >
              <Text allowFontScaling={false}
                  style={{ textAlign: 'center',
                             fontSize: 16,
                             fontWeight: '500' }}
              >
                运费: ${parseFloat(this.props.delifee).toFixed(2)}
              </Text>
            </View>

            <View style={{ flex: 1,
                           justifyContent: 'center' }}
            >
              <Text allowFontScaling={false}
                  style={{ textAlign: 'center',
                             fontSize: 16,
                             fontWeight: '500' }}
              >
                总价: ${parseFloat(this.props.total).toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={{ height: 1,
                         borderWidth: 0.6,
                         borderColor: '#D5D5D5' }}
          />

          <View style={[styles.button, { height: buttonHeight }]}>

            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
              <Text allowFontScaling={false}
                  style={{ textAlign: 'center',
                             fontSize: 13,
                             color: '#6D6E71',
                             fontWeight: '500' }}
              >
                详情
              </Text>
            </TouchableOpacity>

            <View style={{ width: 1,
                           borderWidth: 0.4,
                           borderColor: '#D5D5D5' }}
            />

            <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }}>
              <Text allowFontScaling={false}
                  style={{ textAlign: 'center',
                             fontSize: 13,
                             color: '#6D6E71',
                             fontWeight: '500' }}
              >
                客服
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      );
  }
}
