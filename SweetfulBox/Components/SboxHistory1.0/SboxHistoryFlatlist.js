import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";
import SboxHistoryRow from "./SboxHistoryRow";


class App extends Component {


	render() {
		console.log(this.props.items);
		return (
			<FlatList
				data={this.props.items}
				enableEmptySections
				refreshing={this.props.refreshing}
				onRefresh={() => this.props.onRefresh()}
				style={styles.list}
				renderItem={({item}) => {
          if(!item ) return;
					const obid = item.obid;
					const delifee = item.delifee;
					const total = item.total;
					const prod = item.prod;
					const created_date = item.created_date;
					return (
						<SboxHistoryRow
							key={item.obid}
							{...{obid,
                   delifee,
                   total,
                   prod,
                   created_date,
                   item,
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
		backgroundColor: "#f4f4f4"
	}
});

export default App;
