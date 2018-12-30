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

import { GetUserInfo } from '../../Modules/Database';
import Intercom from 'react-native-intercom';

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
		let selected;
		for (let i of this.state.cells){
			if (i.key == key){
				selected = i;
				break;
			}
		}
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
	pushScreen(options){

		this.props.navigator.push({
			screen: 'CustomerServiceListView',
			animated: true,
			navigatorStyle: {navBarHidden: true},
			passProps: {
				options: options
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

	renderCells(item) {
		return (
			<Cell cellStyle={styles.cellStyle} title={item.title} cellKey={item.key} icon={item.icon} onPressedCell={this.onPressedCell} />
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
