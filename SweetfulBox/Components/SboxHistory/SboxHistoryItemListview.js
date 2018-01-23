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
        renderRow={({focus, pbid, itemIndex, fullname, price, amount}) => {
          return (
            <TouchableOpacity style={{marginBottom: 20, flexDirection: "row", justifyContent: "space-between"}}
              onPress={() => this.props.onSelected(itemIndex, pbid)}>
              <Text style={[{fontSize: 13,
                            fontWeight: "400",
                            fontFamily:'FZZhunYuan-M02S'},
                            focus && {color: "#FF7583"}]}
                    allowFontScaling={false}>
                    {fullname} x {amount}
              </Text>
              <Text style={[{fontSize: 13,
                            fontWeight: "400",
                            fontFamily:'FZZhunYuan-M02S'},
                            focus && {color: "#FF7583"}]}
                    allowFontScaling={false}>
                    ${parseFloat(price * amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
		)
	}
}



export default itemList;
