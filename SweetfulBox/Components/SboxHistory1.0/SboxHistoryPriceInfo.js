import React, { Component } from 'react';
import {
  AppRegistry,
  Clipboard,
  Alert,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableOpacity
} from 'react-native';

class OrderInfo extends Component {
  constructor() {
    super();
    this._handleServicesBtn = this._handleServicesBtn.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState){
		if(nextProps != this.props){
			return true
		}
    else{
			return false
		}
	}
  _handleServicesBtn(){
     Clipboard.setString('chanmaoweixin');
     Alert.alert(
            '已复制',
            '馋猫公众号: chanmaoweixin',
            [
              {text: 'OK', onPress: () => {}},
            ]
          )
  }
	render() {
    const viewHeight = Dimensions.get('window').height;

    const buttonHeight = viewHeight * 0.06;
    const priceHeight = viewHeight * 0.07;
		return (
      <View>
        <View style={{flex: 0.12, flexDirection: "row", height: priceHeight}}>
          <View style={{flex: 1, justifyContent:'center'}}>
            <Text style={{textAlign:'center',
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily:'FZZhunYuan-M02S'}}
                  allowFontScaling={false}>运费: ${this.props.delifee}</Text>
          </View>

          <View style={{flex: 1, justifyContent:'center'}}>
            <Text style={{textAlign:'center',
                          fontSize: 16,
                          fontWeight: "500",
                          fontFamily:'FZZhunYuan-M02S'}}
                  allowFontScaling={false}>总价: ${this.props.total}</Text>
          </View>
        </View>

        <View style={{height: 1, borderWidth: 0.6, borderColor: "#D5D5D5"}}/>

        <View style={[styles.button, {height: buttonHeight}]}>
          <TouchableOpacity style={{flex: 1, justifyContent:'center'}}
                            onPress={this.props.goToSboxHistoryOrderDetail.bind(null,this.props.item)}>
            <Text style={{textAlign:'center',
                          fontSize: 13,
                          color: "#6D6E71",
                          fontWeight: "500",
                          fontFamily:'FZZhunYuan-M02S'}}
                  allowFontScaling={false}>详情</Text>
          </TouchableOpacity>

          <View style={{width: 1, borderWidth: 0.4,
            borderColor: "#D5D5D5"}}/>

          <TouchableOpacity onPress={this._handleServicesBtn}
                  style={{flex: 1, justifyContent:'center'}}>
            <Text style={{textAlign:'center',
                          fontSize: 13,
                          color: "#6D6E71",
                          fontWeight: "500",
                          fontFamily:'FZZhunYuan-M02S'}}
                  allowFontScaling={false}>客服</Text>
          </TouchableOpacity>
        </View>
      </View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
    backgroundColor: "white",
    margin: 10,
    marginBottom: 7,
    marginTop: 5,
	},
  shadowIOS: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.25
  },
  shadowAndroid: {
    elevation: 3
  },
  button: {
    backgroundColor: "#f4f4f4",
    flexDirection:'row'
	}
})



export default OrderInfo;