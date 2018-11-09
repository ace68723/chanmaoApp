import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

class Checkbox extends Component {
	render() {
    const { selected } = this.props;
    const viewWidth = Dimensions.get('window').width;
    const checkboxWidth = viewWidth * 0.065;
		return (
			<View style={[styles.checkbox, selected && styles.selected,
        {width: checkboxWidth, height: checkboxWidth}]}>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	checkbox: {
		height: 25,
    width: 25,
		borderWidth: 1,
		borderColor: "black"
	},
  selected: {
    backgroundColor: "#FF7583"
  }
});

export default Checkbox;
