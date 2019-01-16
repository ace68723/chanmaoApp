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

class CustomerServiceContentView extends Component {
  constructor(props){
    super(props);
		const cellsData = [
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
    this.state={
			cells: cellsData
		}
    this.goBack = this.goBack.bind(this);
  }
  goBack(){
    this.props.navigator.pop();
		if(this.props.unmount){
			setTimeout( ()=> {
				this.props.unmount()
			}, 500);
		}
  }
	renderCells(item) {
		return (
			<Cell cardStyle={styles.card} title={item.title} type={item.key} icon={item.icon} onPressedCell={this.onPressedCell} />
		)
	}
  render() {
    return (
      <View style={styles.container} >
        <Header goBack={this.goBack}/>
				<View style={{width: width, height: width * 0.35}}>
					<Image style={{flex: 1}} source={{uri: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg'}}/>
				</View>
				<View style={{marginTop: 18, marginBottom: 18}}>
					<Text allowFontScaling={false}
								style={{color: 'grey', textAlign: 'center', fontWeight: '600', fontSize: 12}}>- 选择问题 -</Text>
				</View>

				<FlatList
					style={{marginTop: 6, backgroundColor: 'grey'}}
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
});

module.exports = CustomerServiceContentView;
