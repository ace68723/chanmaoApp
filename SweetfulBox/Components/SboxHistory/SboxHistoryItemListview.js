import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity
} from 'react-native';
import Moment from "moment";

class itemList extends Component {

  shouldComponentUpdate(nextProps, nextState){
		if(nextProps.items_ls != this.props.items_ls){
			return true;
		}
    else{
			return false;
		}
	}

	render() {
    var items_ls = this.props.items_ls;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    var dataSource = ds.cloneWithRows(items_ls);
    //

		return (
      <ListView
        style={{marginLeft: 17, marginRight: 10, marginTop: 20}}
        enableEmptySections
        scrollEnabled={false}
        dataSource={dataSource}
        renderRow={({focus, sku_id, index, sku_fullname, sku_price, sku_quantity}) => {
          return (
            <TouchableOpacity style={{marginBottom: 20, flexDirection: "row", justifyContent: "space-between"}}
              onPress={() => this.props.onSelected(index, sku_id)}>
              <Text style={[{fontSize: 13,
                            fontWeight: "400",
                            fontFamily:'FZZhunYuan-M02S'},
                            focus && {color: "#FF7583"}]}
                    allowFontScaling={false}>
                    {sku_fullname} x {sku_quantity}
              </Text>
              <Text style={[{fontSize: 13,
                            fontWeight: "400",
                            fontFamily:'FZZhunYuan-M02S'},
                            focus && {color: "#FF7583"}]}
                    allowFontScaling={false}>
                    ${parseFloat(sku_price * sku_quantity).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
		)
	}
}



export default itemList;
