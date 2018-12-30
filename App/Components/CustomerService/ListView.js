import React, {
	Component,
} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
	Dimensions,
	FlatList
} from 'react-native';

import Header from '../General/Header';
import Cell from './cell.js'

const { height, width } = Dimensions.get('window');

class CustomerServiceListView extends Component {
  constructor(props){
    super(props);
    this.state={
			cells: this.props.options
		}
    this.goBack = this.goBack.bind(this);
		this.onPressedCell = this.onPressedCell.bind(this);
  }
  goBack(){
    this.props.navigator.pop();
		if(this.props.unmount){
			setTimeout( ()=> {
				this.props.unmount()
			}, 500);
		}
  }
	onPressedCell(key) {
		this.props.navigator.push({
			screen: 'CustomerServiceListView',
			animated: true,
			navigatorStyle: {navBarHidden: true},
			passProps: {
				options: [
					{
						title: "联系客服",
						key: "contact"
					},
					{
						title: "甜满箱 全场免运费 满$25起送",
						key: "sbox"
					},
					{
						title: "馋猫订餐",
						key: "cmeat"
					},
				]
			}
		});
	}
	renderCells(item) {
		return (
			<Cell cellStyle={styles.cellStyle} title={item.title} type={item.key} icon={item.icon} onPressedCell={this.onPressedCell} />
		)
	}
  render() {
    return (
      <View style={styles.container} >
        <Header goBack={this.goBack}/>
				<FlatList
					style={{paddingTop: 14, backgroundColor: '#f3f3f3', borderTopWidth: 0.7, borderColor: '#CCCCD3',}}
					data={this.state.cells}
					renderItem={({item}) => (this.renderCells(item))}
				/>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f3f3f3',
  },
	cellStyle: {
		height: 48,
	}
});

module.exports = CustomerServiceListView;
