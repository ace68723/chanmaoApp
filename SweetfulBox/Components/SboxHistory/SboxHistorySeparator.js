/* @flow */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Separator extends Component {
	render() {
		return (
			<View style={styles.separator}>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	separator: {
		height: 1,
		borderWidth: 0.6,
		borderColor: "#D5D5D5",
    marginLeft: 10,
    marginRight: 10
	}
});

export default Separator;
