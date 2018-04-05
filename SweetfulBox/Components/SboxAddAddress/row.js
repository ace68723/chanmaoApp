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


	shouldComponentUpdate(nextProps, nextState){
		if(nextProps.place_id != this.props.place_id){
			return true;
		}else{
			return false;
		}
	}
	render() {
		var { selected } = this.props;
    const viewHeight = Dimensions.get('window').height;
		const viewWidth = Dimensions.get('window').width;
		// const rowHeight = viewHeight * 0.11;
		const checkboxWidth = viewWidth * 0.07;
		const str1 = this.props.addr.split(',');
		const locationText = str1[0] + ",\n" + str1[1] + ", "
			+ str1[2] + ", "+ str1[3];

		return (
			<TouchableOpacity
        onPress={() => (this.props.onselected(this.props.selected))}>
				<View style={[styles.container,
                      selected && styles.selected,
					            {paddingTop:15,paddingBottom:15}]}>

	        <View style={styles.textWrap}>
	          <Text style={{textAlign:'left', fontSize: 16}}
									allowFontScaling={false}>{locationText}</Text>
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
