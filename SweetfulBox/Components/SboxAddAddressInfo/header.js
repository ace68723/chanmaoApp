/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

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
    cancleIcon: {
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

export default class Header extends Component {
  render() {
      return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.left} onPress={this.props.goBack}>
                <Text style={styles.cancleIcon}
                      allowFontScaling={false}>{String.fromCharCode(10005)}</Text>
            </TouchableOpacity>
            <Text style={styles.headTitle}
                  allowFontScaling={false}>添加地址</Text>
            <View style={styles.right}/>
          </View>
      );
  }
}
