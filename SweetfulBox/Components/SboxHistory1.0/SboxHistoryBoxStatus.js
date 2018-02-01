import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView
} from 'react-native';
import Moment from "moment";

class BoxStatus extends Component {

  shouldComponentUpdate(nextProps, nextState){
		if(nextProps != this.props){
			return true;
		}
    else{
			return false;
		}
	}

  _boxStatusChinese(status) {
    switch(status) {
      case 0:
        res = "联系客服";
        color = "#e74136";
        break;
      case 10:
        res = "已确认";
        color = "#ff7685";
        break;
      case 20:
        res = "打包中";
        color = "#c88061";
        break;
      case 30:
        res = "配送中";
        color = "#74b2e0";
        break;
      case 40:
        res = "已送达";
        color = "#7fcba2";
        break;
      case 50:
        res = "已完成";
        color = "#7fcba2";
        break;
      default:
        res = "";
        break;
    }
    return {res: res, color: color};
  }

	render() {
    var boxes_ls = this.props.boxes_ls;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var dataSource = ds.cloneWithRows(boxes_ls);
    const createdTime = Moment(this.props.created * 1000).format('MMM DD, YYYY, hh:mm');

		return (
      <ListView
        style={{marginBottom: 5}}
        showsHorizontalScrollIndicator={false}
        enableEmptySections
        dataSource={dataSource}
        renderRow={({obid, trace, created}) => {
          return (
            <View style={styles.container}>
              <View style={{flex: 0.2, justifyContent: "center"}}>
                <Text style={[styles.status,
                              {fontFamily:'FZZhunYuan-M02S',
                               color: this._boxStatusChinese(trace.status).color}]}
                      allowFontScaling={false}>
                      {this._boxStatusChinese(trace.status).res}
                </Text>
              </View>
              <View style={{flex: 0.3, justifyContent: "center"}}>
                <Text style={[styles.text, {fontFamily:'FZZhunYuan-M02S'}]}
                      allowFontScaling={false}>  订单号: #{this.props.obid}</Text>
              </View>
              <View style={{flex: 0.5, justifyContent: "center"}}>
                <Text style={[styles.date, {fontFamily:'FZZhunYuan-M02S'}]}
                      allowFontScaling={false}>{createdTime}</Text>
              </View>
            </View>
          )
        }}
      />
		)
	}
}

const viewHeight = Dimensions.get('window').height;
const statusHeight = viewHeight * 0.05;

const styles = StyleSheet.create({
	status: {
    textAlign: "left",
    fontSize: 16,
    color: "#FF7583",
    fontWeight: "500"
	},
  text: {
    textAlign: "left",
    fontSize: 12, color: "#6D6E71",
    fontWeight: "500"
  },
  date: {
    textAlign: "right",
    fontSize: 12, color: "#6D6E71",
    fontWeight: "500"
  },
  container: {
    height: statusHeight,
    marginLeft: 17,
    marginRight: 10,
    marginTop: 0,
    justifyContent: "space-between",
    flexDirection: "row"
  }
})



export default BoxStatus;
