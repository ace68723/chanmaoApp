import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions} from "react-native";
import SboxHistoryRow from "./SboxHistoryRow";

const { height } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const flatlistPaddingTop = viewHeight * (60/2208);


class App extends Component {


	render() {
		return (
			<FlatList
				data={this.props.items}
				enableEmptySections
				refreshing={this.props.refreshing}
				onRefresh={() => this.props.onRefresh()}
				style={styles.list}
				keyExtractor={(item, index) => item.obid}
				renderItem={({item}) => {
          if(!item ) return;
					const obid = item.obid;
					const delifee = item.delifee;
					const total = item.total;
					const prod = item.prod;
					const created = item.created_date;
					const trace = item.trace;
					return (
						<SboxHistoryRow
							key={item.obid}
							{...{obid,
                   delifee,
                   total,
                   prod,
                   created,
                   item,
									 trace,
                   goToSboxHistoryOrderDetail:this.props.goToSboxHistoryOrderDetail
                 }}
						/>
					)
				}}
			/>
			);
	}
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		backgroundColor: "#f4f4f4",
		paddingTop: flatlistPaddingTop,
	}
});

export default App;
