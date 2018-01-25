import React, { Component } from "react";
import { View,
	Text,
	StyleSheet,
	Switch,
	TouchableOpacity
} from "react-native";
import Dimensions from 'Dimensions';
import Checkbox from "./checkbox";

class Row extends Component {

	/**
	 * Prevent unchanged components to re-render
	 * 只重新render state有改变的物体
	 * @param {Object} nextProps new props
	 * @param {Object} nextState new states
	 */
	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.selected != this.props.selected){
			return true
		}else{
			return false
		}
	}
	render() {
		// console.log('row',this.props);
		var { selected } = this.props;
    const viewHeight = Dimensions.get('window').height;
		const viewWidth = Dimensions.get('window').width;
		const rowHeight = viewHeight * 0.11;
		const checkboxWidth = viewWidth * 0.07;

		const str1 = this.props.addr.split(',');
		const locationText = str1[0] + ",\n" + str1[1] + ", "
			+ str1[2] + ", "+ str1[3];

		return (
			<TouchableOpacity onPress={() => (this.props.onselected(this.props.selected))}>
				<View style={[styles.container, selected && styles.selected,
					{height: rowHeight}]}>


	        <View style={styles.textWrap}>
	          <Text style={{textAlign:'left', fontSize: 16}}>{locationText}</Text>
	        </View>



				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center"
	},
	textWrap: {
		flex: 0.75,
    justifyContent: "center"
	},
  selected: {
    backgroundColor: "#f4f4f4"
  }
})

export default Row;
