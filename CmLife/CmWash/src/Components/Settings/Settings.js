import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import SettingsCell from './SettingsCell.js'

export default class Home extends Component {
  constructor(props) {
    super(props);
    const cellsData = [
      {
        icon: require("./Image/1.png"),
        title: "我的订单",
        key: "orders"
      },
      {
        icon: require("./Image/1.png"),
        title: "地址维护",
        key: "address"
      },
      {
        icon: require("./Image/1.png"),
        title: "联系客服",
        key: "contact"
      },
      {
        icon: require("./Image/1.png"),
        title: "甜满箱 全场免运费 满$25起送",
        key: "sbox"
      },
      {
        icon: require("./Image/1.png"),
        title: "馋猫订餐",
        key: "cmeat"
      },
      {
        icon: require("./Image/1.png"),
        title: "馋猫生活",
        key: "cmlife"
      },
      {
        icon: require("./Image/1.png"),
        title: "选择语言&地区",
        key: "language"
      },
      {
        icon: require("./Image/1.png"),
        title: "退出登录",
        key: "logout"
      },
    ]
    this.state = {
      cells: cellsData
    };
  }
  onPressedCell(key){
    console.log(key);
  }
  renderCells(item) {
    return (<SettingsCell cardStyle={styles.card} title={item.title} key={item.key} icon={item.icon} onPressedCell={this.onPressedCell} />)
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList style={{marginTop: 6}} data={this.state.cells} renderItem={({item}) => (this.renderCells(item))}/>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  card: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 6,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 2
  },
});
