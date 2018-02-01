import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';
import SboxHistoryImg from "./SboxHistoryImg";

class imgListView extends Component {

  shouldComponentUpdate(nextProps, nextState){
		if(nextProps.items_ls != this.props.items_ls){
			return true;
		}
    else {
      return false;
    }
	}

	render() {
    var items_ls = this.props.items_ls;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(items_ls);

		return (
      <ListView
        ref={(lv) => { this.props.onMapped(lv) }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        enableEmptySections
        dataSource={dataSource}
        renderRow={({index, sku_id, focus, sku_image}) => {
          return (
            <SboxHistoryImg
              onSelected={() => this.props.onSelected(index, sku_id)}
              key = {sku_id}
              {...{itemIndex: index, sku_id, focus, image: sku_image}}
            />
          )
        }}
      />
		)
	}
}



export default imgListView;
