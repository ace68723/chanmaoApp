import React, {Component} from 'react';
import {Animated, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import RestaurantHours from './RestaurantInfoTab/RestaurantHours'

class RestaurantInfoTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpandingHours: false,
    }
    this._onClickRestaurantHours = this._onClickRestaurantHours.bind(this)
  }
  _onClickRestaurantHours(){
    this.setState({isExpandingHours: !this.state.isExpandingHours});
  }
  render() {
    var expandingIcon = this.state.isExpandingHours ? require('./Image/icon-arrow-up.png') : require('./Image/icon-arrow-down.png');
    return (
      <View style={styles.container}>
        <Text style={styles.restaurantName}>抹布小官(North York)</Text>
        <View style={styles.line}/>
        <View>
          <View style={styles.cell}>
            <Image style={styles.icon} source={require('./Image/icon-location.png')}/>
            <Text style={[styles.text, {color: '#F58330'}]}>5545 Young Stree, North York, ON</Text>
          </View>
          <View style={styles.cell}>
            <Image style={styles.icon} source={require('./Image/icon-telephone.png')}/>
            <Text style={styles.text}>(416) 551-2441</Text>
          </View>
          <TouchableOpacity style={styles.cell} onPress={this._onClickRestaurantHours}>
            <Image style={styles.icon} source={require('./Image/icon-time.png')}/>
            <Text style={styles.text}>营业时间：今日 12:00 - 19:00</Text>
            <Image style={[styles.icon, {marginLeft: 8}]} source = {expandingIcon}/>
          </TouchableOpacity>
          {
            this.state.isExpandingHours &&
            <View style={styles.cell}>
              <RestaurantHours hours={[]}/>
            </View>
          }
        </View>
      </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginLeft: 34,
    marginRight: 34,
  },
  restaurantName: {
    fontSize: 13,
    fontWeight: '900',
  },
  line: {
    borderWidth: 0.4,
    borderColor: '#DCDCDC',
    marginTop: 18,
    marginBottom: 6,
    marginLeft: -6,
    marginRight: -6,
  },
  cell: {
    flexDirection: 'row',
    marginTop: 12,
    marginBottom: 12,
    alignItems: 'center'
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    fontSize: 11,
    marginLeft: 8,
    fontWeight: '600',
  },
});

module.exports = RestaurantInfoTab;
