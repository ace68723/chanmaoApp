/* @flow */

import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  content: {
    height: height * (204 / 2208),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DCDCDC',
  },
  image: {
    marginLeft: width * (93 / 1242),
    marginRight: width * (65 / 1242),
    height: height * (84 / 2208),
    width: width * (76 / 1242),
    resizeMode: 'contain',
  },
  forwordButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: width * (84 / 1242),
  },
  forwardIcon: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    color: '#A9A9A9',
  },
});

export default class MyComponent extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <View  style={styles.content}>
        <Image style={styles.image} source={this.props.sectionParam.image}/>
        <Text style={styles.name}>{this.props.sectionParam.name}</Text>
        <Text style={styles.description}>{this.props.sectionParam.description}</Text>
        <View style={styles.forwordButton}>
          <TouchableOpacity>
            <Text style={styles.forwardIcon}>{'\u232A'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
