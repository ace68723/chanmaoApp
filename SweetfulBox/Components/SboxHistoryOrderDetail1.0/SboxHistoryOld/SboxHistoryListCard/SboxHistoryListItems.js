/* @flow */

import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

export default class SboxHistoryListItems extends Component {
  // _renderRow({ lv_focus, pbid, fullname, price, amount }) {
  //     // return (
  //     //   <TouchableOpacity
  //     //       onPress={() => this.props.onSelected(pbid)}
  //     //       style={{ marginBottom: 20,
  //     //                flexDirection: 'row',
  //     //                justifyContent: 'space-between' }}
  //     //   >
  //     //     <Text allowFontScaling={false}
  //     //         style={[{ fontSize: 13,
  //     //                    fontWeight: '400' },
  //     //                    lv_focus && { color: '#FF7583' }]}
  //     //     >
  //     //                    {fullname} x {amount}
  //     //     </Text>
  //     //     <Text allowFontScaling={false}
  //     //         style={[{ fontSize: 13,
  //     //                   fontWeight: '400' },
  //     //                   focus && { color: '#FF7583' }]}
  //     //     >
  //     //                   ${parseFloat((price * amount).toFixed(6))}
  //     //     </Text>
  //     //   </TouchableOpacity>
  //     // );
  // }
  render() {
      return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.props.onSelected(this.props.pbid)}
            style={{ marginBottom: 20,
                     flexDirection: 'row',
                     justifyContent: 'space-between' }}
        >
          <Text allowFontScaling={false}
              style={[{ fontSize: 13,
                         fontWeight: '400' },
                         this.props.lv_focus && { color: '#FF7583' }]}
          >
                         {this.props.fullname} x {this.props.amount}
          </Text>
          <Text allowFontScaling={false}
              style={[{ fontSize: 13,
                        fontWeight: '400' },
                        this.props.lv_focus && { color: '#FF7583' }]}
          >
                        ${parseFloat((this.props.price * this.props.amount).toFixed(6))}
          </Text>
        </TouchableOpacity>
      );
  }
}
