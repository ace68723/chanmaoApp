'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
	ListView,
	StyleSheet,
  View,
} from 'react-native';

import SboxHistoryAction from '../../Actions/SboxHistoryAction';
import SboxHistoryStore from '../../Stores/SboxHistoryStore';
import SboxHistoryFlatlist from './SboxHistoryFlatlist';

const { height, width } = Dimensions.get('window');

export default class HistoryViewController extends Component {
  constructor() {
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
    console.log(state)
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
        {this._renderHistoryView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewController:{
    flex:1,
  }
});
