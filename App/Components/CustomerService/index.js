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
import Options from './data.js'

import { GetUserInfo } from '../../Modules/Database';
import Intercom from 'react-native-intercom';

const { height, width } = Dimensions.get('window');

class CustomerService extends Component {
  constructor(props){
    super(props);

		const options = Options.cmEat;
    this.state={
			cells: options.unfinishedOptions
		}
    this.goBack = this.goBack.bind(this);
		this.onPressedCell = this.onPressedCell.bind(this);
		this.pushScreen = this.pushScreen.bind(this);
		this.showMessager = this.showMessager.bind(this);
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
		let selected;
		for (let i of this.state.cells){
			if (i.key == key){
				selected = i;
				break;
			}
		}

		// Custom logic
		if (selected.key == "rushOrder"){
			this.rushOrder();
			return;
		}

		// Default types
		switch (selected.type) {
			case "message":
				this.showMessager(selected.message)
				break;
			case "options":
				this.pushScreen(selected.options)
				break;
			default:

		}
	}
	pushScreen(passingOptions){
		console.log('333', passingOptions);
		this.props.navigator.push({
			screen: 'CustomerServiceListView',
			animated: true,
			navigatorStyle: {navBarHidden: true},
			passProps: {
				options: passingOptions
			}
		});
	}
	showMessager(message){
		const {uid, version} = GetUserInfo();
		const oid = '1234';

		Intercom.registerIdentifiedUser({ userId: uid });
		Intercom.updateUser({
		    user_id: uid,
		    custom_attributes: {
		        version: version,
						oid: oid,
		    },
		});
		Intercom.displayMessageComposerWithInitialMessage(message);
	}

	rushOrder(){
		const orderPlacedTime = 1246149390;
		const diffMinutes = (Math.round((new Date()).getTime() / 1000) - orderPlacedTime) / 60;
		console.log(diffMinutes);
		if (diffMinutes <= 40){
			alert('您的订单正在准备中，请耐心等待');
		}
		else if (diffMinutes >= 40 && diffMinutes <= 60){
			alert('您的订单正在配送中，请耐心等待');
		}
		else if (diffMinutes >= 60){
			this.showMessager("你好，我想催单");
		}
	}

	renderCells(item) {
		return (
			<Cell cellStyle={styles.cellStyle} title={item.title} cellKey={item.key} icon={item.icon} onPressedCell={this.onPressedCell} />
		)
	}
  render() {
    return (
      <View style={styles.container} >
        <Header goBack={this.goBack}/>
				<View style={{width: width, height: width * 0.35}}>
					<Image style={{flex: 1}} source={{uri: 'https://www.mcdonalds.com/content/dam/usa/documents/mcdelivery/mcdelivery_new11.jpg'}}/>
				</View>
				<View style={{marginTop: 18, marginBottom: 18, backgroundColor: "#EDF3FB"}}>
					<Text style={{color: 'grey', textAlign: 'center', fontWeight: '600', fontSize: 12}}>- 选择问题 -</Text>
				</View>

				<FlatList
					style={{marginTop: 6, backgroundColor: '#f3f3f3', borderTopWidth: 0.7, borderColor: '#CCCCD3',}}
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

module.exports = CustomerService;
