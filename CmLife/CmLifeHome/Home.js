import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';

import HomeCell from './HomeCell'
import BaseComponent from '../Common/BaseComponent'

export default class Home extends BaseComponent {
  constructor(props) {
    super(props);
    const cellsData = [
      {
        icon: require("./Image/washing-icon.png"),
        title: "馋猫干洗",
        key: "washing",
        backgroundImage: require("./Image/washing-background.png"),
      },
      {
        icon: null,
        title: "",
        key: null,
        backgroundImage: require("./Image/coming_soon.png"),
      },
      {
        icon: null,
        title: "",
        key: "washing",
        backgroundImage: require("./Image/coming_soon.png"),
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
    return (<HomeCell
      cardStyle={styles.card}
      title={item.title}
      key={item.key}
      icon={item.icon}
      backgroundImage={item.backgroundImage}
      onPressedCell={this.onPressedCell}
    />)
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
    borderRadius: 10,
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'grey',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 160,
    width: this.mScreenWidth,
    overflow: 'hidden'
  },
});
