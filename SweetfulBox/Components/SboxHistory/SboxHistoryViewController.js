'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
	ListView,
	StyleSheet,
	Text,
  View,
} from 'react-native';

import SboxHistoryAction from '../../Actions/SboxHistoryAction';
import SboxHistoryStore from '../../Stores/SboxHistoryStore';
import SboxHistoryFlatlist from './SboxHistoryFlatlist';

const { height, width } = Dimensions.get('window');
const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;
const navigationHeight = viewHeight * (212/2208) - 12;

export default class HistoryViewController extends Component {
  constructor() {
		console.log("starttttt");
    super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = Object.assign({},SboxHistoryStore.getState(),{
					dataSource: ds.cloneWithRows([]),
					items: [],
					refreshing: false,
    })
    this._onChange = this._onChange.bind(this);
		this.setSource = this.setSource.bind(this);
    this._goToSboxHistoryOrderDetail = this._goToSboxHistoryOrderDetail.bind(this);
  }
	componentDidMount() {
		console.log("didmount");
    SboxHistoryStore.addChangeListener(this._onChange);
		SboxHistoryAction.init();
	}
  componentWillUnmount() {
    SboxHistoryStore.removeChangeListener(this._onChange);
  }

	setSource(items, itemsDatasource, otherState) {
		this.setState({
			items,
			dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
			...otherState
		})
	}
  _goToSboxHistoryOrderDetail (orderDetail) {
		console.log(orderDetail);
    this.props.navigator.push({
      screen: 'SboxHistoryOrderDetail',
      navigatorStyle: {navBarHidden: true},
      passProps: {orderDetail:orderDetail},
    })
  }
	_onRefresh() {
		this.setState({refreshing: true});
		SboxHistoryAction.init();
	}

  _onChange() {
    const state = Object.assign({},SboxHistoryStore.getState());
    this.setState(state);
  }
  _renderHistoryView() {
		// if(this.state.items.length === 0 ) return;
    return(
      <SboxHistoryFlatlist
				onRefresh={() => this._onRefresh()}
				{...{items: this.state.items,
             refreshing: this.state.refreshing,
             goToSboxHistoryOrderDetail: this._goToSboxHistoryOrderDetail
           }}
			/>
    )
  }
  render() {
    return(
      <View style={styles.viewController}>
				<View style={[styles.navigation, {height: navigationHeight}]}>
			    	<View style={styles.back}>
			    	</View>
			    	<View style={styles.title}>
			       		<Text style={ {textAlign:'center', fontSize:20, fontWeight: '700'} }>历史订单</Text>
			    	</View>
			    	<View style={{flex:1}}>
            </View>
			  </View>
				<View style={styles.separator}></View>
        {this._renderHistoryView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
		marginTop: 12,
  },
  navigation: {
    flexDirection:'row'
  },
  back: {
    flex: 1,
    justifyContent:'center',
  },
  title: {
    flex:1,
    backgroundColor: 'white',
    justifyContent:'center',
    // backgroundColor: "blue",
  },
  separator: {
		height: 1,
		borderWidth: 0.6,
		borderColor: "#D5D5D5"
	},
});
