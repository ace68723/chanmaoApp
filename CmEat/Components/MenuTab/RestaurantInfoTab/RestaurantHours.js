import React, {Component} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import moment from 'moment';

class RestaurantHours extends Component {
  constructor(props) {
    super(props);
  }
  renderHourCells(){
    let hourCells = [];
    const currentWeek = moment().format('e') - 1;
    const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日", ];
    const data = ['11:30-23:00','11:30-23:00','11:30-23:00','11:30-23:00','11:30-23:00','11:30-23:00','11:30-23:00']
    for (var i = 0; i < week.length; i++) {
      if (currentWeek == i){
        hourCells.push(
          <Text style={[styles.cell, {color: 'black'}]}>{week[i]}  {data[i]}</Text>
        )
      }
      else{
        hourCells.push(
          <Text style={styles.cell}>{week[i]}  {data[i]}</Text>
        )
      }
    }

    return hourCells;
  }
  render() {
    return (
      <View style = {styles.container}>
        {this.renderHourCells()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 28,
    marginRight: 28,
    marginTop: -12,
  },
  cell: {
    color: "#C5C5C5",
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  }
});

module.exports = RestaurantHours;
