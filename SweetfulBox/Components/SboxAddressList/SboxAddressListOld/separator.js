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
		borderWidth: 1,
		borderColor: "#D5D5D5"
	}
});

export default Separator;
