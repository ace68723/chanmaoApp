import React, {Component} from 'react';
import {Animated, Image, StyleSheet, Text, View} from 'react-native';

class RestaurantReviewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <View style = {styles.container}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = RestaurantReviewTab;
