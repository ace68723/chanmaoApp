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
		borderBottomWidth: 1,
		borderColor: "#D5D5D5",
    marginLeft: 10,
    marginRight: 10
	}
});

export default Separator;
