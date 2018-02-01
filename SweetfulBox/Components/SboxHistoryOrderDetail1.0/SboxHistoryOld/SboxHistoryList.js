/* @flow */

import React, { Component } from 'react';
import {
  ListView,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import SboxHistoryListCard from './SboxHistoryListCard/SboxHistoryListCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f4f4f4',
  },
});

export default class SboxHistoryList extends Component {
  constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows([])
		}
		this.setSource = this.setSource.bind(this);
	}


  componentWillReceiveProps(nextProps){
    this.setSource(nextProps.orderHistory, nextProps.orderHistory);
  }


	/**
	 * 保存states和dataSource
	 * @param {Array} items array of items in the state
	 * @param {Array} itemsDatasource array of items in the dataSource
	 * @param {Object} otherState optional info of the items
	 */
	setSource(items, itemsDatasource, otherState) {
		this.setState({
			items,
			dataSource: this.state.dataSource.cloneWithRows(itemsDatasource),
			...otherState
		})
	}

  _renderRow({obid, delifee, total, boxes, created}) {
    return(
      <SboxHistoryListCard {...{obid, delifee, total, boxes, created}} />
    )
  }

  render() {
  		return (
  			<ListView
  				enableEmptySections
          style={styles.container}
  				dataSource={this.state.dataSource}
  				renderRow={this._renderRow}
  			/>
  			);
  	}
}
