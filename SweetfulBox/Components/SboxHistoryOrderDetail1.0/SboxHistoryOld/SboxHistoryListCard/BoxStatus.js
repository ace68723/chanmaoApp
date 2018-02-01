/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';


const viewHeight = Dimensions.get('window').height;
const statusHeight = viewHeight * 0.05;

const styles = StyleSheet.create({
	status: {
    textAlign: "left",
    fontSize: 15,
    fontWeight: "500"
	},
  text: {
    textAlign: "left",
    fontSize: 12, color: "#6D6E71",
    fontWeight: "500"
  },
  date: {
    textAlign: "right",
    fontSize: 12, color: "#6D6E71",
    fontWeight: "500"
  },
  container: {
    height: statusHeight,
    marginLeft: 17,
    marginRight: 10,
    marginTop: 0,
    justifyContent: "space-between",
    flexDirection: "row"
  }
})
// 50 = completed
// 40 = delivered
// 30 = distributed
// 20 = packed
// 10 = accepted
// 0 = error
//
// <View style={styles.container}>
//   <Text>{this.props.bbid}{this.props.trace.time}{this.props.trace.status}</Text>
// </View>
//
export default class BoxStatus extends Component {
  _renderStatus() {
    let status, statusColor;
      switch (this.props.trace.status) {
      case 0:
          status = '请联系客服';
          statusColor = '#e74136';
          break;
      case 10:
          status = '已确认';
          statusColor = '#ff7685';
          break;
      case 20:
          status = '打包中';
          statusColor = '#c88061';
          break;
      case 30:
          status = '配送中';
          statusColor = '#74b2e0';
          break;
      case 40:
          status = '已送达';
          statusColor = '#7fcba2';
          break;
      case 50:
          status = '已完成';
          statusColor = '#';
          break;
      default:
          status = '';
      }
    return(
      <View style={{flex: 0.3, justifyContent: "center"}}>
        <Text allowFontScaling={false}
            style={[styles.status,{ color: statusColor, }]}
        >
              {status}
        </Text>
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
            {this._renderStatus()}
            <View style={{flex: 0.2, justifyContent: "center"}}>
              <Text allowFontScaling={false}
                  style={styles.text}
              >箱子号: #{this.props.bbid}
              </Text>
            </View>
            <View style={{flex: 0.5, justifyContent: "center"}}>
              <Text allowFontScaling={false}
                  style={styles.date}
              >{this.props.trace.time}
              </Text>
            </View>
          </View>
    );
  }
}
