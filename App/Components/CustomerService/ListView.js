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
    this.goBack = this.goBack.bind(this);
		this.onPressedCell = this.onPressedCell.bind(this);
		this.openUrl = this.openUrl.bind(this);

		this.initPageData();
  }
	initPageData(){
		if (!this.props.fromSettings){
			const finishedStatus = [40, 5, 90, ];
			const orderStatus = this.props.order.order_status;
		}
		// console.log(this.props.order);
		// order_created rr_url order_oid
		this.state = {
			cells: this.props.options
		}
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
		if (selected.key == "paymentRelatedPlacedOrder"){
			this.props.navigator.push({
				screen: 'CmEatHistory',
				animated: true,
	      navigatorStyle: {
	        navBarHidden: true
	      }
			});
			return;
		}

		switch (selected.type) {
			case "message":
				this.showMessager(selected.message)
				break;
			case "options":
				this.pushScreen(selected.options)
				break;
			case "url":
				this.openUrl(selected.url)
				break;
			case "alert":
				alert(selected.alert);
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
				options: options,
				order: this.props.order
			}
		});
	}
	showMessager(message){
		const {uid, version} = GetUserInfo();
		Intercom.registerIdentifiedUser({ userId: uid });
		if (this.props.fromSettings){
			Intercom.updateUser({
					user_id: uid,
					custom_attributes: {
							version: version,
					},
			});
		}
		else{
			const oid = this.props.order.order_oid;
			Intercom.updateUser({
					user_id: uid,
					custom_attributes: {
							version: version,
							order_id: oid,
							contact_name: this.props.order.user_name,
							phone_number: this.props.order.user_tel,
							address: this.props.order.user_address,
							order_status: this.props.order.order_status,
					},
			});
		}
		Intercom.displayMessageComposerWithInitialMessage(message);
	}
	openUrl(url){
		this.props.navigator.showModal({
			screen: 'AdView',
			animated: true,
			navigatorStyle: {navBarHidden: true},
			passProps: {url: url,},
		})
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
